import {
  GameApi,
  GameUI,
  StoryApi,
  UserIdentity,
} from ':dungeon-adventure/common-constructs';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ElectrodbDynamoTable } from '../constructs/electrodb-table.js';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const userIdentity = new UserIdentity(this, 'UserIdentity');

    // Create a DynamoDB table for our game entity
    const electrodbTable = new ElectrodbDynamoTable(this, 'ElectrodbTable');
    const gameApi = new GameApi(this, 'GameApi');
    const storyApi = new StoryApi(this, 'StoryApi');

    gameApi.routerFunction.addEnvironment(
      'TABLE_NAME',
      electrodbTable.tableName,
    );
    electrodbTable.grantReadWriteData(gameApi.routerFunction);
    // grant our authenticated role access to invoke our APIs
    [storyApi, gameApi].forEach((api) =>
      api.grantInvokeAccess(userIdentity.identityPool.authenticatedRole),
    );

    // Ensure this is instantiated last so our runtime-config.json can be automatically configured
    new GameUI(this, 'GameUI');
  }
}
