/**
 * @file Functions that do interaction with asyncStorage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CredentialWithConfigName } from './types/Interactions';

/**
 * save Credentials to asyncstorage
 */
export async function saveCredentials(newCredentials: CredentialWithConfigName[]){
  return new Promise<void>(async function(resolve, reject){
    return AsyncStorage.setItem('allCredentials', JSON.stringify(newCredentials));
  })
}

export async function newLogin(config: CredentialWithConfigName){
  return new Promise<void>(async function(resolve, reject){
    return Promise.all([
      () => AsyncStorage.setItem('lastLogin', JSON.stringify(config.configname)),
      () => {
        AsyncStorage.getItem('allCredentials')
          .then(res => {
            const items = JSON.parse(res!);
            items.push(config);
            AsyncStorage.setItem('allCredentials', JSON.stringify(items));
          });
      }
    ])
  })
}

/**
 * load Credentials from asyncstorage
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
