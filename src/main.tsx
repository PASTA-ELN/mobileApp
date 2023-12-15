import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import { useAppSelector } from 'store';
import Header from 'components/Header';

import Camera from 'pages/Camera';
import Config from 'pages/Config';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Table from 'pages/Table';


export default function(){
  const loggedIn = useAppSelector(state => state.Login.loggedIn);

  if(loggedIn){
    return (
      <View className='w-full h-full'>
        <NativeRouter>
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/camera" Component={Camera} />
            <Route path="/config" Component={Config} />
            <Route path="/table/:dataType" Component={Table} />
          </Routes>
        </NativeRouter>
      </View>
    )
  }
  return (
    <Login />
  )
}
