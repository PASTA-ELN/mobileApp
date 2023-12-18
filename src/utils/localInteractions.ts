import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto'
import { Credentials, CredentialsConfig } from "types/Credentials";

//-------------------------------------------------------------------------------------------------
// Keys
//-------------------------------------------------------------------------------------------------
let dataHierarchyKey : string;
let dataTypesKey     : string;
let credentialsKey   : string;

(function initKeys() {
  Promise.all([
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_dataHierarchy').then(key => dataHierarchyKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_dataTypes').then(key => dataTypesKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_credentials').then(key => credentialsKey = key),
  ])
  .catch(err => {
    console.error('Error initializing keys', err)
    process.exit(1);
  });
})();

//-------------------------------------------------------------------------------------------------
// Ontology
//-------------------------------------------------------------------------------------------------
export function checkDataHierarchy(ontology: any) {
  const dataTypes = Object.keys(ontology)
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
export async function loadCredentials(): Promise<Record<string, Credentials>|null> {
  const data = await AsyncStorage.getItem(credentialsKey);

  if(data) {
    return JSON.parse(data);
  }
  return null;
}
