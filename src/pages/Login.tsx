/**
 * @file Login page
 * props: loggedIn callback function upon success
 */
import React, { Component } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';

import LoginForm from '../components/LoginForm';
import { CredentialWithConfigName } from '../types/Interactions';
import { dispatch } from '../store';
import { login } from '../store/reducer/Login';
import { loginStyle } from '../style/pages/login';

type Props = {}
type State = {}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  submit = async (credential: CredentialWithConfigName) => {
    const res = await dispatch(login(credential)).unwrap();

    if(res !== 'success'){
      Toast.show({
        type: 'error',
        text1: 'warning',
        text2: res
      })
    }
  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: 'white', height: '100%' }} >
          <View style={{height: '95%'}}>
            <LoginForm submit={this.submit} />
          </View>
          <Text style={loginStyle.versionText}>Version {global.version}</Text>
          <Toast/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
