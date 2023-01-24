import { Credential, CredentialWithConfigName } from "./Interactions";

export type InitialState = {
  login: LoginState,
};

export type LoginState = {
  loggedIn: boolean;
  usedConfigName?: string;
  allCredentials: CredentialWithConfigName[];
}
