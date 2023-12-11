import React from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { CredentialsConfig } from 'types/Credentials';

type IProps = {
  submit: (credentials: CredentialsConfig) => void;
}

export default function(props: IProps) {

  /**
   * References to the input fields
   */
  const usernameInput = React.useRef<TextInput>(null!);
  const passwordInput = React.useRef<TextInput>(null!);
  const serverInput   = React.useRef<TextInput>(null!);
  const databaseInput = React.useRef<TextInput>(null!);
  const configInput   = React.useRef<TextInput>(null!);

  /**
   * State for the input fields
   */
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [database, setDatabase] = React.useState<string>('');
  const [server,   setServer]   = React.useState<string>('');
  const [config,   setConfig]   = React.useState<string>('');

  /**
   * Misc State
   */
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [scanQR,       setScanQR]       = React.useState<boolean>(false);
  const [useNow,       setUseNow]       = React.useState<boolean>(false);

  /**
   * functions
   */
  function submit() {
    props.submit({
      configName: config,
      credentials: {
        username,
        password,
        database,
        server,
      }
    })
  }

  if(scanQR){
    return (
      <View>
        <Text>Scan QR</Text>
        <TouchableOpacity onPress={() => setScanQR(false)}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text>PASTA</Text>
        <TouchableOpacity onPress={() => setScanQR(true)}>
          <Text>Scan QR</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setUsername}
        onSubmitEditing={() => passwordInput.current.focus()}
        placeholderTextColor='grey'
        placeholder='Username'
        ref={usernameInput}
        style={{}}
        value={username}
      />
      <View style={{ flexDirection: 'row'}}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setPassword}
          onSubmitEditing={() => databaseInput.current.focus()}
          placeholderTextColor='grey'
          placeholder='Password'
          ref={passwordInput}
          secureTextEntry={!showPassword}
          style={{}}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text>Show</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setDatabase}
        onSubmitEditing={() => serverInput.current.focus()}
        placeholderTextColor='grey'
        placeholder='Database'
        ref={databaseInput}
        style={{}}
        value={database}
      />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setServer}
        onSubmitEditing={() => configInput.current.focus()}
        placeholderTextColor='grey'
        placeholder='Server'
        ref={serverInput}
        style={{}}
        value={server}
      />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setConfig}
        onSubmitEditing={() => {}}
        placeholderTextColor='grey'
        placeholder='Config'
        ref={configInput}
        style={{}}
        value={config}
      />
      <View>
        <CheckBox 
          isChecked={useNow}
          onClick={() => setUseNow(!useNow)}
          style={{}}
        />
        <Text>Use Now</Text>
        <View style={{}}>
          <Button
            onPress={submit}
            title='Login'
          />
        </View>
      </View>
    </View>
  )
}