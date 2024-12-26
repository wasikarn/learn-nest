export interface LoginResponse {
  access_token: {
    expires: Date;
    token: string;
  };
  refresh_token: {
    expires: Date;
    token: string;
  };
}
