import React, { Component, createRef } from 'react';
import { Button, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

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
  configName:   string;
  username:     string;
  password:     string;
  server:       string;
  database:     string;
}

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
      configName:   'default',
      username:     'testUser',
      password:     'D3poJxAGxpeTwa',
      server  :     '134.94.32.11',
      database:     'pasta_tutorial'
    }
  }

  changeUsername   = (value: string) => {this.setState({username: value})}
  changePassword   = (value: string) => {this.setState({password: value})}
  changeServer     = (value: string) => {this.setState({server: value})}
  changeDatabase   = (value: string) => {this.setState({database: value})}
  changeConfigname = (value: string) => {this.setState({configName: value})}
  check            = ()              => {this.setState({useNow: !this.state.useNow})}
  submit           = ()              => {
    const credential: CredentialWithConfigName = {
      configName: this.state.configName,
      credential: {
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
  QRcallback = async (data: string) => {
    var credentials: CredentialWithConfigName = JSON.parse(data);
    if (credentials.credential.server.indexOf(':') > -1)
      credentials.credential.server = credentials.credential.server.slice(0, credentials.credential.server.length - 5)
    if (credentials.credential.server.slice(0, 3) == 'htt')
      credentials.credential.server = credentials.credential.server.slice(7);
    this.setState({
      configName: credentials.configName,
      username: credentials.credential.username,
      password: credentials.credential.password,
      server:   credentials.credential.server,
      database: credentials.credential.database
    })
    return Promise.resolve();
  }

  render() {
    if(this.state.scanQR)
      return <CameraComponent onSucessCallback={this.QRcallback} successMessage='' size='small'/>
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
          value={this.state.configName}
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
