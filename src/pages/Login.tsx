/**
 * @file Login page
 * props: loggedIn callback function upon success
 */
import React, { Component } from 'react';
import { Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image, Pressable } from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Entypo';

import { dispatch } from '../store';
import { logIn } from '../store/reducer/Login';
import { loginStyle, SCREEN_HEIGHT, SCREEN_WIDTH } from '../style/index';
import { CredentialWithConfigName } from '../types/Interactions';
import CameraComponent from '../components/CameraComponent';

type Props = {

}

type State = {
  username: string;
  password: string;
  database: string;
  server: string;
  configName: string;
  isChecked: boolean;
  scanQR: boolean;
  hidePassword: boolean;
  eyeType: 'eye' | 'eye-with-line';
  marginBottom: string;
}

export default class Login extends Component<Props, State> {
  input1: TextInput | null = null;
  input2: TextInput | null = null;
  input3: TextInput | null = null;
  input4: TextInput | null = null;
  input5: TextInput | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      database: '',
      server: '',
      configName: 'default',
      isChecked: true,
      scanQR: false,
      hidePassword: true,
      eyeType: 'eye',
      marginBottom: 'auto'
    }
  }

  /**Press login key */
  submit() {
    if (this.state.username === '' || this.state.password === '' || this.state.server === '' || this.state.server === '') return
    var credentials: CredentialWithConfigName = {
      configName: this.state.configName,
      credential: {
        username: this.state.username,
        password: this.state.password,
        server: this.state.server,
        database: this.state.database
      }
    }
    dispatch(logIn(credentials));
  }

  /**Events that occur during any formular editions
   * @param value text entered
   * @param task  field in which the value was added
  */
  typing(value: string, task: Partial<keyof State>) {
    if (task === 'isChecked')
      this.setState({ isChecked: !this.state.isChecked });
    //@ts-ignore
    this.setState({ [task]: value }); //TODO find types for task and value deep in ... where the sun doesnt shine
  }

  /**Method for toggling password masking */
  togglePassword() {
    this.setState({ hidePassword: !this.state.hidePassword });
    if (this.state.eyeType === 'eye') {
      this.setState({ eyeType: 'eye-with-line' });
    } else {
      this.setState({ eyeType: 'eye' });
    }
  }

  /**Scan login credentials from QR code
   * @return React function
   */
  scanQR() {
    const item = () => {
      return (
        <View style={{ height: SCREEN_HEIGHT, zIndex: 5, marginTop: (SCREEN_HEIGHT / 2 - SCREEN_WIDTH / 2), backgroundColor: 'white' }}>
          <CameraComponent size='small' onSucessCallback={this.callback} successMessage='log in with QR ?' />
        </View>
      )
    };
    return item();
  }
  /**callback for scanning QR code */
  callback = async (data: string) => {
    var credentials = JSON.parse(data);
    const name = Object.keys(credentials)[0];
    credentials = credentials[name];
    if (credentials.server.indexOf(':') > -1)
      credentials.server = credentials.server.slice(0, credentials.server.length - 5)
    if (credentials.server.slice(0, 3) == 'htt')
      credentials.server = credentials.server.slice(7);
    this.setState({
      scanQR: false,
      username: credentials.user,
      password: credentials.password,
      server: credentials.server,
      database: credentials.database,
      configName: name
    })
    this.submit();
    return Promise.resolve();
  }

  focus() {

  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    var outer = Object.assign({ marginBottom: this.state.marginBottom }, loginStyle.outer);
    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); this.setState({ scanQR: false }); }}>
        <View style={{ backgroundColor: 'white', height: '100%' }} >
          {this.state.scanQR && this.scanQR()}
          <View style={outer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={loginStyle.pasta}> PASTA </Text>
              <TouchableOpacity onPress={() => this.setState({ scanQR: true })}>
                <Image style={loginStyle.qr} source={require('../public/qr.png')} />
              </TouchableOpacity>
            </View>
            <TextInput style={loginStyle.input} value={this.state.username}
              placeholderTextColor='grey' placeholder='username' onSubmitEditing={() => this.input2!.focus()}
              onChangeText={(v) => this.typing(v, 'username')}
              autoCapitalize='none' autoCorrect={false} ref={(input) => this.input1 = input}
            />
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={loginStyle.password} value={this.state.password}
                placeholderTextColor='grey' placeholder='password' onSubmitEditing={() => this.input3!.focus()}
                onChangeText={(v) => this.typing(v, 'password')} ref={(input) => this.input2 = input}
                autoCapitalize='none' autoCorrect={false} secureTextEntry={this.state.hidePassword}
              />
              <TouchableOpacity onPress={() => this.togglePassword()} style={loginStyle.eye}>
                <Icon name={this.state.eyeType} size={30} color='#000000' />
              </TouchableOpacity>
            </View>
            <TextInput style={loginStyle.input} value={this.state.database}
              placeholderTextColor='grey' placeholder='database' onSubmitEditing={() => this.input4!.focus()}
              onChangeText={(v) => this.typing(v, 'database')}
              autoCapitalize='none' autoCorrect={false} ref={(input) => this.input3 = input}
            />
            <TextInput style={loginStyle.input} value={this.state.server}
              placeholderTextColor='grey' placeholder='server' onSubmitEditing={() => this.input5!.focus()}
              onChangeText={(v) => this.typing(v, 'server')}
              autoCapitalize='none' autoCorrect={false} ref={(input) => this.input4 = input}
            />
            <TextInput style={loginStyle.input} value={this.state.configName}
              placeholderTextColor='grey' placeholder='configuration name' onSubmitEditing={() => {
                Keyboard.dismiss(); this.submit()
              }} onChangeText={(v) => this.typing(v, 'configName')}
              autoCapitalize='none' autoCorrect={false} ref={(input) => this.input5 = input}
            />
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <CheckBox
                style={loginStyle.checkbox}
                onClick={() => this.typing('', 'isChecked')}
                isChecked={this.state.isChecked}
              />
              <Text style={loginStyle.checkboxText}>use now</Text>
              <View style={loginStyle.button}>
                <Button style={loginStyle.button} title='login' onPress={() => this.submit()} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function Button(props: any) {
  const { onPress, title, style } = props;
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.text}>{title}</Text>
    </Pressable>
  );
}