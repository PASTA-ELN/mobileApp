/**
 * @file used by expo run:[ios/android]
 */
import React from 'react';
import { Provider } from 'react-redux';
import '@react-native-firebase/app';
import {decode, encode} from 'base-64'

import App from './src/App';
import { makestore } from './src/store';

/**
 * btoa and atob polyfills are broken in RN so we manually provide base64 encodeing
 */

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

/**
* functional Component to Wrap Providers around the App
* @returns App with attached Providers 
*/
export default function _App() {
  return (
    <Provider store={makestore()}>
      <App />
    </Provider>
  )
}
