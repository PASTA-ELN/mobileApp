import { type AxiosInstance } from "axios";

declare global {
  var axios: AxiosInstance|null;
}

export function setAxiosInstance(instance: AxiosInstance) {
  axios = instance
}
