/**
 * @file Functions that do interaction with remote database server
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AxiosInstance, AxiosResponse } from 'axios';
import type { Credential, CredentialWithConfigName } from './types/Interactions';

export var db: AxiosInstance|undefined = undefined;

/**
 * Initialize connection to remote database server
 * - test if ontology is present and save it
 * @param credentials object of credentials
 */
export async function initDB(credentials:Credential) {
  if(db)
    return;
  return new Promise(function (resolve, reject) {
    if (!credentials) {
      reject('no credentials to initialise db');
    }
    db = axios.create({
      baseURL: 'http://' + credentials.server + ':5984/' + credentials.database,
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      timeout: 5000
    });
    db.get('/-ontology-').then((response) => {
      getOntology(response);
      resolve('success');
    }).catch((error) => {
      reject(error);
    });
  });
}

/**
 * Using database-response extract ontology
 * - save docTypes to AsyncStorage
 * @param response REST response
 */
async function getOntology(response:AxiosResponse<any>) {
  const ontology = response.data;
  AsyncStorage.setItem('ontology', JSON.stringify(ontology));
  console.log(ontology);
  const textTypes = ontology['-hierarchy-'];
  if(!textTypes){
    return;
  }
  const dataTypes = Object.keys(ontology).filter(i => (i[0] != '_' && i[0] != '-' && textTypes.indexOf(i) == -1));
  await AsyncStorage.setItem('dataTypes', JSON.stringify(dataTypes));
}

/**
 * if QRCode gets detected get doc with ID from DB
 * @param ID ID of Doc
 */
export async function getDocs(ID: string) {
  return new Promise(async function (resolve, reject) {
    var docIDs;
    const res = await db?.get('_design/viewIdentify/_view/viewQR')
    docIDs = res?.data.rows.map((row:any) => {
      if (row['key'] == ID)
        return row['id']
      return null
    }).filter((x:any) => x);
    if (docIDs.length == 0) {
      reject('couldn\'t get anything for:');
      return;
    }
    docIDs.length == 1 ? resolve(docIDs[0]) : reject('more than one entry for:');
  });
};

/** 
 * function to test credentials before adding them 
 */
export async function testCredentials(credentials: CredentialWithConfigName): Promise<string> {
  return new Promise<string>(async function (resolve, reject) {
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
          reject(res.status);
        }
      }
    ).catch(
      (error) => {
        const status = error.toJSON().status
        if(status === 401){
          resolve('invalid username/password');
          return;
        }
        if(status === 404){
          resolve('database not found');
          return;
        }
        if(status === null){
          resolve('no server connection');
          return;
        }
        resolve('internal error')
      }
    );
  });
}
