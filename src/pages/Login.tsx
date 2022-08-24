/**
 * @file Login page
 * props: loggedIn callback function upon success
 */
import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import LoginForm from '../components/LoginForm';
import { CredentialWithConfigName } from '../types/Interactions';
import { initDB, testCredentials } from '../DBInteractions'
import Toast from 'react-native-toast-message';
import { dispatch } from '../store';
import { logIn } from '../store/reducer/Login';

type Props = {}
type State = {}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  submit = async (credential: CredentialWithConfigName) => {
    let res = await testCredentials(credential);
    if(res === 'success'){
      await initDB(credential.credential);
      dispatch(logIn(credential));
      return Promise.resolve();
    }
    console.log(res);
    Toast.show({
      type: 'error',
      text1: 'warning',
      text2: res
    })
  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: 'white', height: '100%' }} >
          <LoginForm submit={this.submit}/>
          <Toast/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
