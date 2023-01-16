/**
 * @file used by expo run:[ios/android]
 */
import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { decode, encode } from 'base-64';
import type { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { expo } from './app.json';
import 'expo-dev-client';
import 'react-native-reanimated'

import App from './src/App';
import { makestore } from './src/store';

/**
 * btoa and atob polyfills are broken in RN so we manually provide base64 encoding
 */
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

global.version = expo.version;


type Props = InitialProps & {};
type State = {}

/**
* Component to Wrap Providers around the App
* @returns App with attached Providers 
*/
export default class _App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  render(): React.ReactNode {
    return (
      <ReduxProvider store={makestore()}>
          <App />
      </ReduxProvider>
    )
  }
}
