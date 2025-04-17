import { Construct } from 'constructs';
import * as url from 'url';
import { HttpApi } from '../../core/http-api.js';
import { HttpIamAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class StoryApi extends HttpApi {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      defaultAuthorizer: new HttpIamAuthorizer(),
      apiName: 'StoryApi',
      runtime: Runtime.PYTHON_3_12,
      handler: 'story_api.main.handler',
      handlerFilePath: url.fileURLToPath(
        new URL(
          '../../../../../../dist/packages/story_api/bundle',
          import.meta.url,
        ),
      ),
    });
  }
}
