import {
  AppRouter as GameApiAppRouter,
  Context as GameApiContext,
} from ':dungeon-adventure/game-api-backend';
import { createTrpcClientProvider } from './TrpcProvider';
export default {
  GameApi: createTrpcClientProvider<GameApiAppRouter, GameApiContext>(),
};
