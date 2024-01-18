import { type AxiosInstance } from "axios";

//
// Axios instance
// ------------------------------
// This is a global variable that can be used anywhere in the app.
// If it exists it can be used to access the DB
declare global {
  var axios: AxiosInstance|null;
}

//
// Set axios instance
// ------------------------------
// It is set in the Stores Login Reducer,
// after the user has logged in.
//
export function setAxiosInstance(instance: AxiosInstance) {
  axios = instance
}
