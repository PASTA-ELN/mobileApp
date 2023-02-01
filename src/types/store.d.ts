import { Credential, CredentialWithConfigName } from "./Interactions";

export type InitialState = {
  login: LoginState;
  log: LogState;
};

export type LoginState = {
  loggedIn: boolean;
  usedConfigName?: string;
  allCredentials: CredentialWithConfigName[];
}


export type Log = {
  state: 'info'|'warn'|'error'|'log';
  message: string;
}

export type LogState = {
  logs: Log[];
  count: number;
}