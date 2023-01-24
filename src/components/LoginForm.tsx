import React, { Component, createRef } from 'react';
import { Button, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';
import { Barcode } from 'vision-camera-code-scanner';

import { LoginFormStyle } from '../style';
import { CredentialWithConfigName } from '../types/Interactions';
import CameraComponent from './CameraComponent';

type Props = {
  submit: (credentials: CredentialWithConfigName) => void;
  buttonText?: string;
}
type State = {
  useNow:       boolean;
  hidePassword: boolean;
  scanQR:       boolean;
  configname:   string;
  username:     string;
  password:     string;
  server:       string;
  database:     string;
}

// TODO feedback bei falschem qr Code

export default class LoginForm extends Component<Props, State> {
  usernameInput = createRef<TextInput>()
  passwordInput = createRef<TextInput>()
  serverInput   = createRef<TextInput>()
  DatabaseInput = createRef<TextInput>()
  configInput   = createRef<TextInput>()
  
  constructor(props: Props){
    super(props);
    this.state={
      useNow:       true,
      hidePassword: true,
      scanQR:       false,
      configname:   'default',
      username:     '',
      password:     '',
      server  :     '',
      database:     ''
    }
  }

  changeUsername   = (value: string) => {this.setState({username: value})}
  changePassword   = (value: string) => {this.setState({password: value})}
  changeServer     = (value: string) => {this.setState({server: value})}
  changeDatabase   = (value: string) => {this.setState({database: value})}
  changeConfigname = (value: string) => {this.setState({configname: value})}
  check            = ()              => {this.setState({useNow: !this.state.useNow})}
  submit           = ()              => {
    const credential: CredentialWithConfigName = {
      configname: this.state.configname,
      credentials: {
        username: this.state.username,
        password: this.state.password,
        server  : this.state.server,
        database: this.state.database
      }
    }
    this.props.submit(credential);
  }
  togglePassword = () => {
    this.setState({hidePassword: !this.state.hidePassword})
  }
  /**callback for scanning QR code */
  QRcallback = async (data: Barcode) => {
    var credentials: CredentialWithConfigName = JSON.parse(data.rawValue!);
    if (credentials.credentials.server.indexOf(':') > -1)
      credentials.credentials.server = credentials.credentials.server.slice(0, credentials.credentials.server.length - 5)
    if (credentials.credentials.server.slice(0, 3) == 'htt')
      credentials.credentials.server = credentials.credentials.server.slice(7);
    this.setState({
      configname: credentials.configname,
      username: credentials.credentials.username,
      password: credentials.credentials.password,
      server:   credentials.credentials.server,
      database: credentials.credentials.database,
      scanQR: false
    })
    return Promise.resolve();
  }

  render() {
    if(this.state.scanQR)
      return (
        <TouchableOpacity style={LoginFormStyle.cameraWrapper} onPress={() => this.setState({scanQR: false})}>
          <CameraComponent onSucessCallback={this.QRcallback} successMessage='' size='small'/>
        </TouchableOpacity>
      )
    return (
      <View style={LoginFormStyle.outer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={LoginFormStyle.pasta}> PASTA </Text>
          <TouchableOpacity onPress={() => this.setState({ scanQR: true })}>
            <Image style={LoginFormStyle.qr} source={require('../public/qr.png')} />
          </TouchableOpacity>
        </View>
        <TextInput 
          autoCapitalize='none' 
          autoCorrect={false} 
          onChangeText={this.changeUsername}
          onSubmitEditing={this.passwordInput.current?.focus}
          placeholderTextColor='grey' 
          placeholder='username' 
          ref={this.usernameInput}
          style={LoginFormStyle.input}
          value={this.state.username}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput 
            style={LoginFormStyle.password}
            placeholderTextColor='grey' 
            placeholder='password' 
            onChangeText={this.changePassword}
            onSubmitEditing={this.serverInput.current?.focus}
            autoCapitalize='none' 
            autoCorrect={false} 
            ref={this.passwordInput}
            secureTextEntry={this.state.hidePassword}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.togglePassword} style={LoginFormStyle.eye}>
            <Icon name={this.state.hidePassword ? 'eye' : 'eye-with-line'} size={30} color='#000000' />
          </TouchableOpacity>
        </View>
        <TextInput 
          autoCapitalize='none' 
          autoCorrect={false} 
          onChangeText={this.changeServer}
          onSubmitEditing={this.DatabaseInput.current?.focus}
          placeholderTextColor='grey' 
          placeholder='database' 
          ref={this.serverInput}
          style={LoginFormStyle.input}
          value={this.state.server}
        />
        <TextInput 
          autoCapitalize='none' 
          autoCorrect={false}
          onChangeText={this.changeDatabase}
          onSubmitEditing={this.configInput.current?.focus}
          placeholder='server' 
          placeholderTextColor='grey' 
          ref={this.DatabaseInput}
          style={LoginFormStyle.input}
          value={this.state.database}
        />
        <TextInput 
          autoCapitalize='none' 
          autoCorrect={false} 
          onChangeText={this.changeConfigname}
          onSubmitEditing={() => {Keyboard.dismiss(); this.submit()}} 
          placeholderTextColor='grey' 
          placeholder='configuration name' 
          ref={this.configInput}
          style={LoginFormStyle.input}
          value={this.state.configname}
        />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <CheckBox
            isChecked={this.state.useNow}
            onClick={this.check}
            style={LoginFormStyle.checkbox}
          />
          <Text style={LoginFormStyle.checkboxText}>use now</Text>
          <View style={LoginFormStyle.button}>
            <Button 
              onPress={this.submit}
              title={this.props.buttonText || 'login'} 
            />
          </View>
        </View>
      </View>
    )
  }
}
