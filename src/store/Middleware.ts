import axios from 'axios';
import type { Dispatch } from 'redux';
import type { Middleware, PayloadAction } from "@reduxjs/toolkit";

import { initDB } from '../DBInteractions';
import { addCredentials } from './reducer/Configuration'
import type { InitialState } from '../types/store';
import type  { CredentialWithConfigName } from '../types/Interactions';

type LoginMiddlewareType = Middleware<
  {},
  InitialState,
  Dispatch<PayloadAction<CredentialWithConfigName>>
>

/**
 * Login Middleware to test Users Credentials
 * @param api store API to get getState and dispatch Methods
 */
export const loginMiddleware: LoginMiddlewareType = api => 
  next => 
    (action:PayloadAction<CredentialWithConfigName>) => {
      testCredentials(action.payload)
        .then((value) => {     //test Credentials Resolved
          initDB(action.payload.credential)
            .then((value) => {    //initDB Resolved
              api.dispatch(addCredentials(action.payload));  //save Credentials to the Async store and Configuration Slice
              return next(action);
            }, (reason) => {      //initDB rejected
              return;
            })
            .catch((error) => {
            })
        }, (reason) => {       //test Credentials Rejected
          return;
        })
        .catch((err) => {
        })
}

/** 
 * function to test credentials before adding them 
 */
async function testCredentials(credentials: CredentialWithConfigName): Promise<string> {
  return new Promise<string>(async function (resolve, reject) {
    if (!credentials) 
      return;
    await axios.get(
      'http://' + credentials.credential.server + ':5984/' + credentials.credential.database + '/-ontology-',
      {
        auth: {
          username: credentials.credential.username,
          password: credentials.credential.password,
        },
        timeout: 2000
      }
    ).then(
      (res) => { 
        if(res.status === 200){
          resolve('success')
        } else {
          reject(res);
        }
      }
    ).catch(
      (error) => {
        if (error.response) {
          // The request was made and the server responded with a status code 
          // that falls out of the range of 2xx
          console.log(JSON.stringify(error.response.data));
          console.log(JSON.stringify(error.response.status));
          console.log(JSON.stringify(error.response.headers));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(JSON.stringify(error.request));
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error' + JSON.stringify(error.message));
        }
        reject(error);
      }
    );
  });
}
