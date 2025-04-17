import { StoryApi } from '../generated/story-api/client.gen';
import { StoryApiClientContext } from '../components/StoryApiProvider';
import { useContext } from 'react';

export const useStoryApiClient = (): StoryApi => {
  const client = useContext(StoryApiClientContext);

  if (!client) {
    throw new Error('useStoryApiClient must be used within a StoryApiProvider');
  }

  return client;
};
