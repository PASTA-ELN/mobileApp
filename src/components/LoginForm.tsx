import React from 'react'
import { Alert, Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Toast } from 'utils/toast'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { type BarCodeScannerResult } from 'expo-barcode-scanner'

import Input from './Input'
import CameraComponent from './CameraComponent'
import { type CredentialsConfig } from 'types/Credentials'

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
  const [config,   setConfig]   = React.useState<string>('default');

  /**
   * Misc State
   */
  const [scanQR, setScanQR] = React.useState<boolean>(false);

  /**
   * functions
   */
  function submit() {
    if(!username || !password || !database || !server || !config){
      Toast.error('Please fill out all fields');
      return;
    }
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

  function handleBarcodeScanned(result: BarCodeScannerResult, retry: () => void): void {
    try {
      const { credentials, configname } = JSON.parse(result.data);
      Alert.alert(
        'QR-Code scanned', 
        `Do you want to use this configuration?\n\n${credentials.database} on ${credentials.server}`, 
        [
          {
            text: 'Cancel',
            onPress: retry,
            style: 'cancel'
          },
          {
            text: 'Use',
            onPress: () => {
              setUsername(credentials.username);
              setPassword(credentials.password);
              setDatabase(credentials.database);
              setServer(credentials.server);
              setConfig(configname);
              setScanQR(false);
            }
          }
        ], 
        { cancelable: false }
      );
    } catch (error) {
      Toast.error('Invalid QR-Code');
      retry();
    }
  }

  if(scanQR){
    return (
      <View className='w-full h-full flex flex-col p-2 items-center justify-center'>
        <View className='w-full h-2/3 flex flex-col bg-gray-900 rounded-3xl p-2'>
          <View className='w-full h-[90%] bg-gray-800 rounded-3xl'>
            <CameraComponent 
              handleBarcodeScanned={handleBarcodeScanned}
              bordered
            />
          </View>
          <Button title='Cancel' onPress={() => setScanQR(false)}/>
        </View>
      </View>
    )
  }

  return (
    <View className='w-3/4 h-fit bg-gray-900 text-zinc-200 rounded-3xl px-2 pt-4 pb-2'>
      <View className='w-full h-1/8 flex flex-row items-center justify-center'>
        <Image source={require('assets/adaptive-icon.png')} className='w-20 h-20'/>
        <Text className='text-zinc-200 text-[50px]'>PASTA</Text>
      </View>
      <View className='w-full h-1/8 px-4'>
        <View className='h-[1px] bg-gray-800 my-4'/>
        <TouchableOpacity onPress={() => setScanQR(true)}>
          <View className='w-full flex flex-row items-center justify-evenly'>
            <Text className=' text-zinc-400'>
              scan QR-Code to log in
            </Text>
            <MaterialCommunityIcons name='qrcode-scan' size={30} color='rgb(59,130,246)' />
          </View>
        </TouchableOpacity>
        <View className='h-[1px] bg-gray-800 mt-4'/>
      </View>
      <View className='w-full h-fit p-4 flex flex-col items-center justify-center'>
        <Input
          onTextChange={setUsername}
          onSubmit={() => passwordInput.current.focus()}
          placeholder='Username'
          ref={usernameInput}
          value={username}
        />
        <Input
          onTextChange={setPassword}
          onSubmit={() => databaseInput.current.focus()}
          placeholder='Password'
          ref={passwordInput}
          type='password'
          value={password}
        />
        <Input
          onTextChange={setDatabase}
          onSubmit={() => serverInput.current.focus()}
          placeholder='Database'
          ref={databaseInput}
          value={database}
        />
        <Input
          onTextChange={setServer}
          onSubmit={() => configInput.current.focus()}
          placeholder='Server'
          ref={serverInput}
          value={server}
        />
        <Input
          onTextChange={setConfig}
          onSubmit={() => {}}
          placeholder='Config'
          ref={configInput}
          value={config}
        />
      </View>
      <View className='px-4'>
        <View className='h-[1px] bg-gray-800'/>
      </View>
      <View className='w-full h-1/8 flex flex-row items-center justify-end p-4'>
        <Button
          onPress={submit}
          title='Login'
        />
      </View>
    </View>
  )
}
