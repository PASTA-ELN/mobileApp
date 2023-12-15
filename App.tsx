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

global.version = Constants.expoConfig?.version || "0.0.0";
if (!global.btoa) {
  global.btoa = encode;
  }
  
  if (!global.atob) {
  global.atob = decode;
  }

export default function App() {

  return (
    <ReduxProvider store={store}>
      <RootSiblingParent>
        <SafeAreaView className='w-screen h-screen dark bg-gray-800'>
          <Main />
          <StatusBar style="light" />
        </SafeAreaView>
      </RootSiblingParent>
    </ReduxProvider>
  );
}
