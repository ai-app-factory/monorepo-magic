export interface ICognitoProps {
  region: string;
  identityPoolId: string;
  userPoolId: string;
  userPoolWebClientId: string;
}
export type ApiUrl = string;

export interface IRuntimeConfig {
  httpApis: {
    GameApi: ApiUrl;
    StoryApi: ApiUrl;
  };
  cognitoProps: ICognitoProps;
}
