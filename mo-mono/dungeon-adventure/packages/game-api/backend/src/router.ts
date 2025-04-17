import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from '@trpc/server/adapters/aws-lambda';

import { t } from './init.js';
import { APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { queryActions } from './procedures/query-actions.js';
import { saveAction } from './procedures/save-action.js';
import { queryGames } from './procedures/query-games.js';
import { saveGame } from './procedures/save-game.js';

export const router = t.router;

export const appRouter = router({
  actions: router({
    query: queryActions,
    save: saveAction,
  }),
  games: router({
    query: queryGames,
    save: saveGame,
  }),


});

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: (
    ctx: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithIAMAuthorizer>,
  ) => ctx,
});

export type AppRouter = typeof appRouter;
