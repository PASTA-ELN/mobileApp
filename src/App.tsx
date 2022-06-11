/**
 * @file MAIN file
 */
import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { NativeRouter as Router, Route, Switch } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

import Camera from './pages/Camera';
import Config from './pages/Config';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import { dispatch } from './store';
import { logIn, logOut } from './store/reducer/Login';
import { appStyle } from './style/app';
import { CredentialWithConfigName } from './types/Interactions';
import { InitialState } from './types/store';
import Data from './pages/Data';
import type { CameraProps, ConfigProps, DataProps, TableProps } from './types/routes';

type Props = {
  isLoggedIn: boolean;
}

type State = {
  dataTypes: string[];
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataTypes: []
    }
  }

  componentDidMount() {
    //next line for testing if nothing is saved
    //AsyncStorage.multiRemove(['dataTypes','lastLogin','allCredentials']);
    this.init();
    crashlytics().log('App mounted');
  }

  /** Get data types from AsyncStorage
   * separate function since it has to be async-await
  */
  async init() {
    var dataTypes = await AsyncStorage.getItem('dataTypes');
    if (dataTypes){
      this.setState({ dataTypes: JSON.parse(dataTypes) });
    }

    var _lastLogin = await AsyncStorage.getItem('lastLogin');
    var lastLogin = _lastLogin != null ? JSON.parse(_lastLogin) : null;

    var _allCredentials = await AsyncStorage.getItem('allCredentials');
    var allCredentials: CredentialWithConfigName[] = _allCredentials != null ? JSON.parse(_allCredentials) : null;

    if (lastLogin === null || allCredentials === null){
      dispatch(logOut());
    } else {
      allCredentials.forEach((element) => {
        if(element.configName === lastLogin){
          dispatch(logIn(element));
        }
      })
    }
  }

  /*********************
   * The Render Method *
   *********************/  
  render() {
    //if not logged in;
    if (this.props.isLoggedIn === false)
      return (<Login/>);

    //if logged in
    return (
      <SafeAreaView style={appStyle.main}>
        <StatusBar barStyle={'light-content'} />
        <Router>
          <View style={{ flex: 0.3 }}>
            <Header />
            <View style={{ height: '100%' }}>
              <Switch>
                <Route exact path='/'      render={(props)              => <Home   {...props}/>}/>
                <Route path='/camera'      render={(props: CameraProps) => <Camera {...props}/>}/>
                <Route path='/config'      render={(props: ConfigProps) => <Config {...props}/>}/>
                <Route path='/data/:id'    render={(props: DataProps)   => <Data   {...props}/>}/>
                <Route path='/table/:type' render={(props: TableProps)  => <Table  {...props}/>}/>
              </Switch>
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
