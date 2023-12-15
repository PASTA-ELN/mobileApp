import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios, { type AxiosResponse } from 'axios'

import { type Credentials } from 'types/Credentials'
import { checkOntology, saveOntology } from 'utils/localInteractions'

//-------------------------------------------------------------------------------------------------
// Database
//-------------------------------------------------------------------------------------------------
export async function initDB(credentials: Credentials) {
  try {
    if(global.axios){
      return;
    }

    const instance = Axios.create({
      baseURL: `http://${credentials.server}:5984/${credentials.database}`,
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      timeout: 5000,
    });

    const response = await instance.get('/-dataHierarchy-');
    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    if(!checkOntology(response.data)){
      return Promise.reject('Invalid dataHierarchy');
    }

    saveOntology(response.data);
    global.axios = instance;
    return Promise.resolve();
  }
  catch (err) {
    return Promise.reject(err);
  }
}

export async function getDocumentFromQRCode(Code: string) {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    var docs;
    const response = await global.axios.get(`_design/viewIdentify/_view/viewQR`)

    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    docs = response.data.rows
      .map((row:any) => {
        if(row['key'] === Code){
          return row['id'];
        }
        return null;
      })
      .filter((id:any) => id !== null);

    if(docs.length === 0)
      return Promise.reject('QR code not found');
    
    if(docs.length > 1)
      return Promise.reject('multiple documents found');
    
    return Promise.resolve(docs[0]);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

//-------------------------------------------------------------------------------------------------
// Credentials
//-------------------------------------------------------------------------------------------------
export async function checkCredentials(credentials: Credentials) {
  try {
    const response = await Axios.get(
      `http://${credentials.server}:5984/${credentials.database}/-dataHierarchy-`, {
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      timeout: 2000,
    });
    return Promise.resolve()
  }
  catch (err: any) {
    console.error(err);
    if(!err.response)
      return Promise.reject('no server connection');

    const status = err.response.status;

    if(status === 401)
      return Promise.reject('invalid username/password');

    if(status === 404)
      return Promise.reject('database not found');

    return Promise.reject('internal server error')
  }
}