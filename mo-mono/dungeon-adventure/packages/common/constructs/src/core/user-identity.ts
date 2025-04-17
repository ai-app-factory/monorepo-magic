import {
  IdentityPool,
  UserPoolAuthenticationProvider,
} from '@aws-cdk/aws-cognito-identitypool-alpha';
import { CfnOutput, Duration, Lazy, Stack } from 'aws-cdk-lib';
import {
  AccountRecovery,
  CfnManagedLoginBranding,
  CfnUserPoolDomain,
  FeaturePlan,
  Mfa,
  OAuthScope,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { RuntimeConfig } from './runtime-config.js';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';

const WEB_CLIENT_ID = 'WebClient';
/**
 * Creates a UserPool and Identity Pool with sane defaults configured intended for usage from a web client.
 */
export class UserIdentity extends Construct {
  public readonly region: string;
  public readonly identityPool: IdentityPool;
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;
  public readonly userPoolDomain: CfnUserPoolDomain;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.region = Stack.of(this).region;
    this.userPool = this.createUserPool();
    this.userPoolDomain = this.createUserPoolDomain(this.userPool);
    this.userPoolClient = this.createUserPoolClient(this.userPool);
    this.identityPool = this.createIdentityPool(
      this.userPool,
      this.userPoolClient,
    );
    this.createManagedLoginBranding(
      this.userPool,
      this.userPoolClient,
      this.userPoolDomain,
    );

    RuntimeConfig.ensure(this).config.cognitoProps = {
      region: Stack.of(this).region,
      identityPoolId: this.identityPool.identityPoolId,
      userPoolId: this.userPool.userPoolId,
      userPoolWebClientId: this.userPoolClient.userPoolClientId,
    };

    new CfnOutput(this, `${id}-UserPoolId`, {
      value: this.userPool.userPoolId,
    });

    new CfnOutput(this, `${id}-IdentityPoolId`, {
      value: this.identityPool.identityPoolId,
    });
  }

  private createUserPool = () =>
    new UserPool(this, 'UserPool', {
      deletionProtection: true,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: Duration.days(3),
      },
      mfa: Mfa.REQUIRED,
      featurePlan: FeaturePlan.ESSENTIALS,
      mfaSecondFactor: { sms: true, otp: true },
      signInCaseSensitive: false,
      signInAliases: { username: true, email: true },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      selfSignUpEnabled: true,
      standardAttributes: {
        phoneNumber: { required: false },
        email: { required: true },
        givenName: { required: true },
        familyName: { required: true },
      },
      autoVerify: {
        email: true,
        phone: true,
      },
      keepOriginal: {
        email: true,
        phone: true,
      },
    });

  private createUserPoolDomain = (userPool: UserPool) =>
    new CfnUserPoolDomain(this, 'UserPoolDomain', {
      domain: `game-ui-${Stack.of(this).account}`,
      userPoolId: userPool.userPoolId,
      managedLoginVersion: 2,
    });

  private createUserPoolClient = (userPool: UserPool) => {
    const lazilyComputedCallbackUrls = Lazy.list({
      produce: () =>
        [
          'http://localhost:4200',
          `https://${Stack.of(this).region}.console.aws.amazon.com`,
        ].concat(
          this.findCloudFrontDistributions().map(
            (d) => `https://${d.domainName}`,
          ),
        ),
    });

    return userPool.addClient(WEB_CLIENT_ID, {
      authFlows: {
        userPassword: true,
        userSrp: true,
        user: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.PROFILE],
        callbackUrls: lazilyComputedCallbackUrls,
        logoutUrls: lazilyComputedCallbackUrls,
      },
      preventUserExistenceErrors: true,
    });
  };

  private createIdentityPool = (
    userPool: UserPool,
    userPoolClient: UserPoolClient,
  ) => {
    const identityPool = new IdentityPool(this, 'IdentityPool');

    identityPool.addUserPoolAuthentication(
      new UserPoolAuthenticationProvider({
        userPool,
        userPoolClient,
      }),
    );

    return identityPool;
  };

  private createManagedLoginBranding = (
    userPool: UserPool,
    userPoolClient: UserPoolClient,
    userPoolDomain: CfnUserPoolDomain,
  ) => {
    new CfnManagedLoginBranding(this, 'ManagedLoginBranding', {
      userPoolId: userPool.userPoolId,
      clientId: userPoolClient.userPoolClientId,
      useCognitoProvidedValues: true,
    }).node.addDependency(userPoolClient, userPool, userPoolDomain);
  };

  private findCloudFrontDistributions = (): Distribution[] =>
    Stack.of(this)
      .node.findAll()
      .filter((child) => child instanceof Distribution);
}
