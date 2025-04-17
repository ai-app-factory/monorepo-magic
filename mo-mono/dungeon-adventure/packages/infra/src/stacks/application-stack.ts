import {
  GameApi,
  GameUI,
  StoryApi,
  UserIdentity,
} from ':dungeon-adventure/common-constructs';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const userIdentity = new UserIdentity(this, 'UserIdentity');
    const gameApi = new GameApi(this, 'GameApi');
    const storyApi = new StoryApi(this, 'StoryApi');

    // grant our authenticated role access to invoke our APIs
    [storyApi, gameApi].forEach((api) =>
      api.grantInvokeAccess(userIdentity.identityPool.authenticatedRole),
    );

    // Ensure this is instantiated last so our runtime-config.json can be automatically configured
    new GameUI(this, 'GameUI');
  }
}
