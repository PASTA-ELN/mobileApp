import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto'
import { Credentials } from "types/Credentials";

//-------------------------------------------------------------------------------------------------
// Keys
//-------------------------------------------------------------------------------------------------
let ontologyKey   : string;
let dataTypesKey  : string;
let credentialsKey: string;

(function initKeys() {
  Promise.all([
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_ontology').then(key => ontologyKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_dataTypes').then(key => dataTypesKey = key),
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, 'key_credentials').then(key => credentialsKey = key),
  ])
  .then(() => console.log('Keys initialized'))
  .catch(err => {
    console.error('Error initializing keys', err)
    process.exit(1);
  });
})();

//-------------------------------------------------------------------------------------------------
// Ontology
//-------------------------------------------------------------------------------------------------
export function checkOntology(ontology: any) {
  const dataTypes = Object.keys(ontology)
    .filter(key => !key.startsWith('_') && !key.startsWith('x'));

  if(dataTypes.length === 0) {
    return false;
  }
  setDataTypes(dataTypes);
  return true;
}
export async function saveOntology(ontology: any) {
  return AsyncStorage.setItem(ontologyKey, JSON.stringify(ontology));
}
export async function loadOntology(): Promise<Record<string, unknown>|null> {
  const data = await AsyncStorage.getItem(ontologyKey);

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
export async function saveCredentials( credentials: Credentials) {
  return AsyncStorage.setItem(credentialsKey, JSON.stringify(credentials));
}
export async function loadCredentials(): Promise<Credentials|null> {
  const data = await AsyncStorage.getItem(credentialsKey);

  if(data) {
    return JSON.parse(data);
  }
  return null;
}

