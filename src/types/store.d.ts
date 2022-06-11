import { Credential, CredentialWithConfigName } from "./Interactions";

export type InitialState = {
  login: LoginState,
  configuration: ConfigurationState
};

export type LoginState = {
  loggedIn: boolean;
  usedConfigName?: string;
  usedConfig?: Credential
}

export type ConfigurationState = {
  allCredentials: CredentialWithConfigName[];
}