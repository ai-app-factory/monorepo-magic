import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  HTTPBatchLinkOptions,
  HTTPLinkOptions,
  splitLink,
} from '@trpc/client';

import { AppRouter } from '../router.js';
import { sigv4Fetch } from './sigv4.js';

export interface GameApiClientConfig {
  readonly url: string;
}

export const createGameApiClient = (config: GameApiClientConfig) => {
  const linkOptions: HTTPLinkOptions<any> & HTTPBatchLinkOptions<any> = {
    url: config.url,
    fetch: sigv4Fetch,
  };
  return createTRPCClient<AppRouter>({
    links: [
      splitLink({
        condition(op) {
          return op.context.skipBatch === true;
        },
        true: httpLink(linkOptions),
        false: httpBatchLink(linkOptions),
      }),
    ],
  });
};
