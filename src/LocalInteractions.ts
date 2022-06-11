/**
 * @file Functions that do interaction with asyncStorage
 * - Location of loggedIn flag
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CredentialWithConfigName } from './types/Interactions';

/**
 * save Credentials to asyncstorage
 */
export async function saveCredentials(credentials: CredentialWithConfigName[]){
  return new Promise<void>(function(resolve, reject){
    AsyncStorage.setItem('allCredentials', JSON.stringify(credentials))
    .then(() => { resolve ();}, (res) => reject(res));
  })
}

/**
 * load Credentials to asyncstorage
 */
export async function loadCredentials(){
  return new Promise<CredentialWithConfigName[]>(function(resolve, reject){
    AsyncStorage.getItem('allCredentials')
    .then((res) => {
      if(res === null){
        reject('could not find anything');
        return;
      }
      const tmp = JSON.parse(res) as CredentialWithConfigName[];
      resolve(tmp);
    })
  });
}
