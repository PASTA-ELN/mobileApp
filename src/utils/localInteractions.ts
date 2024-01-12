import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto'
import { Credentials, CredentialsConfig } from "types/Credentials";

//-------------------------------------------------------------------------------------------------
// Keys
//-------------------------------------------------------------------------------------------------
let dataHierarchyKey : string;
let dataTypesKey     : string;
let credentialsKey   : string;
let autologinKey     : string;

(function initKeys() {
  Promise.all([
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_dataHierarchy').then(key => dataHierarchyKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_dataTypes').then(key => dataTypesKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_credentials').then(key => credentialsKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_autologin').then(key => autologinKey = key),
  ])
  .then(initialize)
  .catch(err => {
    console.error('Error initializing keys', err)
    process.exit(1);
  });
})();

//-------------------------------------------------------------------------------------------------
// Init Local Storage
//-------------------------------------------------------------------------------------------------
async function initialize(){
  if(await AsyncStorage.getItem(dataHierarchyKey)) {
    return;
  }

  await AsyncStorage.setItem(dataHierarchyKey, JSON.stringify({}));
  await AsyncStorage.setItem(dataTypesKey, JSON.stringify([]));
  await AsyncStorage.setItem(credentialsKey, JSON.stringify({}));
  await AsyncStorage.setItem(autologinKey, JSON.stringify(true));
}

//-------------------------------------------------------------------------------------------------
// Data Hierarchy
//-------------------------------------------------------------------------------------------------
export function checkDataHierarchy(dataHierarchy: any) {
  const dataTypes = Object.keys(dataHierarchy)
    .filter(key => !key.startsWith('_') && !key.startsWith('x'));

  if(dataTypes.length === 0) {
    return false;
  }
  setDataTypes(dataTypes);
  return true;
}
export async function saveDataHierarchy(dataHierarchy: any) {
  return AsyncStorage.setItem(dataHierarchyKey, JSON.stringify(dataHierarchy));
}
export async function getDataHierarchy(): Promise<Record<string, unknown>|null> {
  const data = await AsyncStorage.getItem(dataHierarchyKey);

  if(data) {
    return JSON.parse(data);
  }
  return null;
}

//-------------------------------------------------------------------------------------------------
// Data Types
//-------------------------------------------------------------------------------------------------
function setDataTypes(dataTypes: string[]) {
  return AsyncStorage.setItem(dataTypesKey, JSON.stringify(dataTypes));
}
export async function getDataTypes(): Promise<string[]|null> {
  const data = await AsyncStorage.getItem(dataTypesKey);

  if(data) {
    return JSON.parse(data);
  }
  return null;
}

//-------------------------------------------------------------------------------------------------
// Saved Credentials
//-------------------------------------------------------------------------------------------------
/**
 * Add new Credential config to the saved credentials
 * @param config
 */
export async function saveCredentials(config: CredentialsConfig) {
  const data = await loadCredentials();

  if(!data) {
    AsyncStorage.setItem(credentialsKey, JSON.stringify({ [config.configName]: config.credentials }));
  } 
  else {
    data[config.configName] = config.credentials;
    AsyncStorage.setItem(credentialsKey, JSON.stringify(data));
  }
}
/**
 * Get the credentials for a given config name
 * @param configName
 * @returns
 * - Credentials if found
 * - null if not found
 */
export async function getCredentials(configName: string): Promise<Credentials|null> {
  const data = await loadCredentials();

  if(!data) {
    return null
  }

  if(data[configName]) {
    return data[configName];
  }

  return null;
}
/**
 * Get all saved credentials
 * @returns
 * - Record<string, Credentials> if found
 * - null if not found
 */
export async function loadCredentials(): Promise<Record<string, Credentials>|null> {
  const data = await AsyncStorage.getItem(credentialsKey);

  if(data) {
    return JSON.parse(data);
  }
  return null;
}

//-------------------------------------------------------------------------------------------------
// Autologin
//-------------------------------------------------------------------------------------------------
/**
 * sets the autologin value
 * @param autologin
 */
export async function saveAutologin(autologin: boolean) {
  return AsyncStorage.setItem('autologin', JSON.stringify(autologin));
}
/**
 * Get the autologin value
 * @returns
 * - true if autologin is enabled
 * - false if autologin is disabled
 */
export async function loadAutologin(): Promise<boolean> {
  const data = await AsyncStorage.getItem('autologin');

  if(data) {
    return JSON.parse(data);
  }
  return false;
}
/**
 * sets a config name for autologin
 * @param configName
 */
export async function setAutologinConfigName(configName: string) {
  return AsyncStorage.setItem('autologinConfigName', JSON.stringify(configName));
}
/**
 * Get the config name for autologin
 * @returns
 * - string if config name is set
 * - null if config name is not set or autologin is disabled
 */
export async function getAutologinConfigName(): Promise<string|null> {
  const data = await AsyncStorage.getItem('autologinConfigName');

  if(data) {
    return JSON.parse(data);
  }
  return null;
}
