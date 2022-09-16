export type Credential = {
  username: string;
  password: string;
  database: string;
  server: string;
}

export type CredentialWithConfigName = {
  configname: string;
  credentials: Credential
}
