
export type Credentials = {
  username: string,
  password: string,
  database: string,
  server:   string
}
export type CredentialsConfig = {
  credentials: Credentials,
  configName: string
}
