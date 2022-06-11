/**
 * @file used by expo start
 */
import React from 'react';
import { Provider } from 'react-redux';
import '@react-native-firebase/app';

import App from './src/App';
import { makestore } from './src/store';

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
 