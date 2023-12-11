import AsyncStorage from "@react-native-async-storage/async-storage";
import { createHash } from 'node:crypto'
import { Credentials } from "types/Credentials";

//-------------------------------------------------------------------------------------------------
// Keys
//-------------------------------------------------------------------------------------------------
const ontologyKey  = createHash('sha256').update(`key_ontology_${Math.random()}`).digest('hex');
const dataTypesKey = createHash('sha256').update(`key_dataTypes_${Math.random()}`).digest('hex');
const credentialsKey = createHash('sha256').update(`key_credentials_${Math.random()}`).digest('hex');

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

