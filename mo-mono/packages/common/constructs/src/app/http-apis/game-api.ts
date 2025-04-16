import { Construct } from 'constructs';
import * as url from 'url';
import { HttpApi } from '../../core/http-api.js';
import { HttpIamAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class GameApi extends HttpApi {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      defaultAuthorizer: new HttpIamAuthorizer(),
      apiName: 'GameApi',
      runtime: Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      handlerFilePath: url.fileURLToPath(
        new URL(
          '../../../../../../dist/packages/game-api/backend/bundle',
          import.meta.url,
        ),
      ),
    });
  }
}
