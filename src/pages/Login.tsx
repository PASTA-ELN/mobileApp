/**
 * @file Login page
 * props: loggedIn callback function upon success
 */
import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import LoginForm from '../components/LoginForm';
import { dispatch } from '../store';
import { logIn } from '../store/reducer/Login';
import { CredentialWithConfigName } from '../types/Interactions';

type Props = {}
type State = {}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  submit = (credential: CredentialWithConfigName) => {
    dispatch(logIn(credential));
  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: 'white', height: '100%' }} >
          <LoginForm submit={this.submit}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
