export interface AuthTokens {
  accessToken: {
    expires: Date;
    token: string;
  };
  refreshToken: {
    expires: Date;
    token: string;
  };
}
