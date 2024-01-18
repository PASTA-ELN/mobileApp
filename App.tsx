import 'expo-dev-client'
import './app'

import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants';
import { Provider as ReduxProvider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { encode, decode } from 'base-64';

import { store } from 'store';
import Main from 'src/main';

//
// Global variables
//
global.version = Constants.expoConfig?.version || '0.0.0';
global.build = Constants.expoConfig?.extra?.build || '0';
global.env = Constants.expoConfig?.extra?.env || 'development';

//
// BASE64 polyfill for axios
//
if (!global.btoa) {
  global.btoa = encode;
  }

  if (!global.atob) {
  global.atob = decode;
  }

//
// Component
//
export default function App() {
  //
  // Render
  //
  return (
    <ReduxProvider store={store}>
      <RootSiblingParent>
        <SafeAreaView className='pt-10 dark bg-gray-900'>
          <Main />
          <StatusBar style="light" />
        </SafeAreaView>
      </RootSiblingParent>
    </ReduxProvider>
  );
}
