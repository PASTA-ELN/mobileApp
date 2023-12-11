import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route } from 'react-router-native';
import Constants from 'expo-constants';

import { useAppSelector } from 'store';

import Home from 'pages/Home';
import Login from 'pages/Login';

global.version = Constants.expoConfig?.version || "0.0.0";

export default function App() {

  const loggedIn = useAppSelector(state => state.Login.loggedIn);

  if(loggedIn){
    return (
      <NativeRouter>
        <Route path="/" Component={Home} />
      </NativeRouter>
    )
  }

  return (
    <Login /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
