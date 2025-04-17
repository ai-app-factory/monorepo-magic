import { TrpcApis } from '../components/TrpcClients';

export const useGameApi = () => TrpcApis.GameApi.useTRPC();
