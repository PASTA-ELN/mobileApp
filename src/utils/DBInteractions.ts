import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios, { type AxiosResponse } from 'axios'

import { type Credentials } from 'types/Credentials'
import { checkDataHierarchy, saveDataHierarchy } from 'utils/localInteractions'

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

    if(!checkDataHierarchy(response.data)){
      return Promise.reject('Invalid dataHierarchy');
    }

    saveDataHierarchy(response.data);
    global.axios = instance;
    return Promise.resolve();
  }
  catch (err) {
    return Promise.reject(err);
  }
}

export async function getDocumentFromQRCode(Code: string): Promise<string> {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    const response = await global.axios.get(`_design/viewIdentify/_view/viewQR`);

    console.log(response.data);

    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    const docs = response.data.rows
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

export async function getDocumentFromId(id: string): Promise<Record<string, any>> {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    const response = await global.axios.get(id);

    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    return Promise.resolve(response.data);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

export async function getDataForType(type: string): Promise<any[]> {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    const response = await global.axios.get(`_design/viewDocType/_view/${type}`);

    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    return Promise.resolve(response.data.rows);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

//-------------------------------------------------------------------------------------------------
// Edit documents
//-------------------------------------------------------------------------------------------------
/**
 * Adds a Qr Code to a document in the database
 * if no qrCodes array exists, it will be created
 * @param id - id of the document
 * @param qrCode - string value of the Qr Code
 * @returns a promise that resolves to the documents new rev string when the Qr Code is added
 */
export async function addQrCodeToDocument(id: string, qrCode: string): Promise<string> {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    if(await hasQrCode(qrCode)){
      const doc = await getDocumentFromQRCode(qrCode);
      return Promise.reject(`QR Code already exists for ${doc}`);
    }

    const response = await global.axios.get(id);

    if(response.status !== 200){
      return Promise.reject(response.statusText);
    }

    const doc = response.data;

    if(!doc.qrCode)
      doc.qrCode = [];

    doc.qrCode.push(qrCode);

    const response2 = await global.axios.put(id, doc);

    if(response2.status !== 201){
      return Promise.reject(response2.statusText);
    }

    return Promise.resolve(response2.data.rev);
  }
  catch (err) {
    return Promise.reject(err);
  }
}
export async function hasQrCode(code: string) {
  try {
    if(!global.axios){
      return Promise.reject('no server connection');
    }

    const response = await global.axios.get(`_design/viewIdentify/_view/viewQR`)

    if(response.status !== 200)
      return Promise.reject(response.statusText);

    const docs = response.data.rows
      .map((row:any) => {
        if(row['key'] === code){
          return row['id'];
        }
        return null;
      })
      .filter((id:any) => id !== null);

    return Promise.resolve(docs.length > 0);
  }
  catch (err) {
    return Promise.reject(err);
  }
}
export async function removeQrCodeFromDocument(id: string, qrCode: string): Promise<string> {
  try {
    if(!global.axios)
      return Promise.reject('no server connection');

    const response = await global.axios.get(id);

    if(response.status !== 200)
      return Promise.reject(response.statusText);

    const doc = response.data;

    if(!doc.qrCode)
      return Promise.reject('document has no qrCodes');

    doc.qrCode = doc.qrCode.filter((code: string) => code !== qrCode);

    const response2 = await global.axios.put(id, doc);

    if(response2.status !== 201)
      return Promise.reject(response2.statusText);

    return Promise.resolve(response2.data.rev);
  }
  catch (err) {
    return Promise.reject(err);
  }
}
export async function updateQRCodes(id: string, qrCodes: string[]): Promise<string> {
  try {
    if(!global.axios)
      return Promise.reject('no server connection');

    const response = await global.axios.get(id);

    if(response.status !== 200)
      return Promise.reject(response.statusText);

    const doc = response.data;
    doc.qrCode = qrCodes;

    const response2 = await global.axios.put(id, doc);

    if(response2.status !== 201)
      return Promise.reject(response2.statusText);

    return Promise.resolve(response2.data.rev);
  }
  catch (err) {
    return Promise.reject(err);
  }
}

//-------------------------------------------------------------------------------------------------
// Credentials
//-------------------------------------------------------------------------------------------------
/**
 * tries to connect to the database with the given credentials
 * @param credentials 
 * @returns 
 * - resolves to void if the credentials are valid
 * - rejects with a string if the credentials are invalid
 */
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
