import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import { useAppSelector } from 'store';
import Header from 'components/UI/Header';

import Camera from 'pages/Camera';
import Config from 'pages/Config';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Table from 'pages/Table';
import Data from 'pages/Data';

import 'react-native-url-polyfill/auto';
import Info from 'pages/Info';

//
// Component
//
export default function(){
  //
  // State
  //
  const loggedIn = useAppSelector(state => state.Login.loggedIn);

  //
  // Render App
  //
  if(loggedIn){
    return (
      <View className='w-full h-full'>
        <NativeRouter>
          <Header />
          <Routes>
            <Route path="/"                   Component={Home}   />
            <Route path="/camera"             Component={Camera} />
            <Route path="/config"             Component={Config} />
            <Route path="/table/:dataType"    Component={Table}  />
            <Route path="/data/:id"           Component={Data}   />
            <Route path="/info"               Component={Info}   />
          </Routes>
        </NativeRouter>
      </View>
    )
  }
  //
  // Render Login Screen
  //
  return (
    <Login />
  )
}
