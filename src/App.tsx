/**
 * @file MAIN file
 */
import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { NativeRouter as Router, Route, Routes } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Camera from './pages/Camera';
import Config from './pages/Config';
import Data from './pages/Data';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import Header from './components/Header';
import { appStyle } from './style/app';
import { InitialState } from './types/store';

type Props = {
  isLoggedIn: boolean;
}
type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    //next line for testing if nothing is saved
    //AsyncStorage.multiRemove(['dataTypes','lastLogin','allCredentials']);
    this.init();
  }

  /** Get data types from AsyncStorage
   * separate function since it has to be async-await
  */
  async init() {
    //TODO dispatch relogin
  }

  /************************************************************************************************
   * The Render Method                                                                            *
   ************************************************************************************************/
  render() {
    //if not logged in;
    if (this.props.isLoggedIn === false)
      return (<Login />);

    //if logged in
    return (
      <SafeAreaView style={appStyle.main}>
        <StatusBar barStyle={'light-content'} />
        <Router>
          <View style={{ flex: 0.3 }}>
            <Header />
            <View style={{ height: '100%' }}>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home />}/>
                  <Route path='camera' element={<Camera />}/>
                  <Route path='config'  element={<Config />}/>
                  <Route path='data/:id' element={<Data  />}/>
                  <Route path='table/:type' element={<Table  />}/>
                </Route>
              </Routes>
            </View>
          </View>
        </Router>
      </SafeAreaView>
    )
  }
}

//connect this component to the redux store
function mapStateToProps(state: InitialState){
  const isLoggedIn = state.login.loggedIn;
  return { isLoggedIn: isLoggedIn };
}
export default connect(mapStateToProps)(App);
