import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { StoryApi } from '../generated/story-api/client.gen';
import { StoryApiOptionsProxy } from '../generated/story-api/options-proxy.gen';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';
import { useSigV4 } from '../hooks/useSigV4';

export const StoryApiContext = createContext<StoryApiOptionsProxy | undefined>(
  undefined,
);

export const StoryApiClientContext = createContext<StoryApi | undefined>(
  undefined,
);

const useCreateStoryApiClient = (): StoryApi => {
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.httpApis.StoryApi;
  const sigv4Client = useSigV4();
  return useMemo(
    () =>
      new StoryApi({
        url: apiUrl,
        fetch: sigv4Client,
      }),
    [apiUrl, sigv4Client],
  );
};

export const StoryApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useCreateStoryApiClient();
  const optionsProxy = useMemo(
    () => new StoryApiOptionsProxy({ client }),
    [client],
  );

  return (
    <StoryApiClientContext.Provider value={client}>
      <StoryApiContext.Provider value={optionsProxy}>
        {children}
      </StoryApiContext.Provider>
    </StoryApiClientContext.Provider>
  );
};

export default StoryApiProvider;
