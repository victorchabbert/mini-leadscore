export interface GlobalOptions {
  headers?: {
    [key: string]: string;
  };
}

export interface TokenOptions {
  apiPath?: string;
  apiBase?: string;

  loginPath?: string;
  loginRedirect?: string;
  loginReturnUrlStorageKey?: string;

  logoutPath?: string;
  validateTokenPath?: string;

  globalOptions?: GlobalOptions;
}

export interface AuthData {
  token: string;
  expiry: string;
  firebaseToken?: string;
}

export interface LoginData {
  username: string;
  password: string;
  client?: string;
}
