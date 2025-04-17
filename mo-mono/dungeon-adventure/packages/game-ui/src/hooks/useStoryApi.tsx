import { useContext } from 'react';
import { StoryApiContext } from '../components/StoryApiProvider';
import { StoryApiOptionsProxy } from '../generated/story-api/options-proxy.gen';

export const useStoryApi = (): StoryApiOptionsProxy => {
  const optionsProxy = useContext(StoryApiContext);

  if (!optionsProxy) {
    throw new Error('useStoryApi must be used within a StoryApiProvider');
  }

  return optionsProxy;
};
