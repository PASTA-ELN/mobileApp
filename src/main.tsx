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


export default function(){
  const loggedIn = useAppSelector(state => state.Login.loggedIn);

  if(loggedIn){
    return (
      <View className='w-full h-full'>
        <NativeRouter>
          <Header />
          <Routes>
            <Route path="/"                   Component={Home} />
            <Route path="/camera"             Component={Camera} />
            <Route path="/config"             Component={Config} />
            <Route path="/data/:dataType"     Component={Table} />
            <Route path="/data/:dataType/:id" Component={Data} />
          </Routes>
        </NativeRouter>
      </View>
    )
  }
  return (
    <Login />
  )
}
