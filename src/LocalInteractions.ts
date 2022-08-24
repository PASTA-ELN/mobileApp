/**
 * @file Functions that do interaction with asyncStorage
 * - Location of loggedIn flag
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CredentialWithConfigName } from './types/Interactions';

/**
 * save Credentials to asyncstorage
 */
export async function saveCredentials(newCredentials: CredentialWithConfigName){
  return new Promise<void>(async function(resolve, reject){
    const credentialString = await AsyncStorage.getItem('allCredentials');
    if(credentialString === null){
      reject('nothing found');
      return;
    }
    const credentials: CredentialWithConfigName[] = JSON.parse(credentialString);
    credentials.push(newCredentials);
    await AsyncStorage.setItem('allCredentials', JSON.stringify(credentials));
    await AsyncStorage.setItem('lastLogin', newCredentials.configName);
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
