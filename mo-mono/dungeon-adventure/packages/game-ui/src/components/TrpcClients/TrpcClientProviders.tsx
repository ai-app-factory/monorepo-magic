import TrpcApis from './TrpcApis';
import { useRuntimeConfig } from '../../hooks/useRuntimeConfig';
import { FC, PropsWithChildren } from 'react';

const TrpcClientProviders: FC<PropsWithChildren> = ({ children }) => {
  const runtimeConfig = useRuntimeConfig();
  return (
    <TrpcApis.GameApi.Provider apiUrl={runtimeConfig.httpApis.GameApi}>
      {children}
    </TrpcApis.GameApi.Provider>
  );
};

export default TrpcClientProviders;
