import React from 'react'
import { Alert, Switch, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import MUIIcon from '@expo/vector-icons/MaterialCommunityIcons'
import IOIcon from '@expo/vector-icons/Ionicons'

import CameraComponent from 'components/CameraComponent'
import DataHierarchyView from 'components/DataHierarchyView'
import Item from 'components/UI/Item'
import Menu from 'components/UI/Menu'
import Section from 'components/UI/Section'
import UserComponent from 'components/UserComponent'
import { useAutologinState, useCredentials, useLocalCredentials } from 'hooks/credentials'
import { CredentialsConfig } from 'types/Credentials'
import { checkCredentials } from 'utils/DBInteractions'
import { getAutologinConfigName, loadCredentials, saveCredentials } from 'utils/localInteractions'

//
// Component
//
export default function() {
  //
  // State
  //
  const [autologinState, setAutologinState] = useAutologinState();
  const [showDataHierarchy, setShowDataHierarchy] = React.useState(false);
  const [showAddConfig, setShowAddConfig] = React.useState(false);
  const [showEditDefaultConfig, setShowEditDefaultConfig] = React.useState(false);

  //
  // Hook calls
  //
  const localCredentials = useLocalCredentials();
  const credentialsKeys = Object.keys(localCredentials);
  const usedCredentials = useCredentials();
  const navigate = useNavigate();


  //
  // Vars
  //
  if (credentialsKeys.length === 0)
    return <View></View>
  
  if(usedCredentials === null)
    return <View></View>

  //
  // Show Data Hierarchy
  //
  if(showDataHierarchy){

    return (
      <DataHierarchyView onClose={() => setShowDataHierarchy(false)} />
    )
  }

  //
  // Show Add Config
  //
  if(showAddConfig){
    return (
      <CameraComponent
        exit={() => setShowAddConfig(false)}
        handleBarcodeScanned={(result) => {

          const data = JSON.parse(result.data) as CredentialsConfig;
          
          if(
            data.configName && 
            data.credentials && 
            data.credentials.username && 
            data.credentials.password &&
            data.credentials.server &&
            data.credentials.database
          ){
            Alert.alert(
              'Found Valid Credentials',
              `${data.credentials.username} on\n${data.credentials.database} @ ${data.credentials.server}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => setShowAddConfig(false),
                  style: 'cancel'
                },
                {
                  text: 'Add',
                  onPress: () => {
                    checkCredentials(data.credentials)
                    .then(() => {
                      saveCredentials(data);
                    })
                    .catch(() => {
                      Alert.alert('Invalid Credentials');
                    })
                    .finally(() => {
                      setShowAddConfig(false);
                    })
                  }
                }
              ]  
            );
          }
          else {
            Alert.alert('Invalid QR Code');
          }
        }}
      />
    )
  }
  
  //
  // Render
  //
  return (
    <View className='w-full h-full p-4 flex flex-col items-center justify-start'>
      <View className='w-full h-fit mb-4'>
        <Text className='text-zinc-300 text-4xl font-semibold'>Settings</Text>
      </View>
      <UserComponent usedCredentials={usedCredentials} />
      <Section>
        <Item variant='button' onPress={() => setShowDataHierarchy(true)}>
          <View className='bg-zinc-300 rounded-lg p-[1]'>
            <MUIIcon name='database' size={26} color='black' />
          </View>
          <Text className='text-zinc-400 text-[16px] ml-5'>View DataHierarchy</Text>
        </Item>
      </Section>
      <Section>
        <Item endContent={<Switch value={autologinState} onValueChange={setAutologinState}/>} variant="switch">
          <View className='bg-cyan-500 rounded-lg p-[2]'>
            <IOIcon name="refresh-sharp" size={24} color='white'/>
          </View>
          <Text className='text-zinc-400 text-[16px] ml-5'>auto login</Text>
        </Item>
        <Item variant='button' onPress={() => setShowAddConfig(true)}>
          <View className='bg-green-500 rounded-lg p-[1]'>
            <IOIcon name="add-sharp" size={26} color='white'/>
          </View>
          <Text className='text-zinc-400 text-[16px] ml-5'>add config</Text>
        </Item>
        <Item variant='button' onPress={() => {}}>
          <View className='bg-red-500 rounded-lg p-[1]'>
            <IOIcon name="remove-sharp" size={26} color='white'/>
            </View>
          <Text className='text-zinc-400 text-[16px] ml-5'>remove config</Text>
        </Item>
      </Section>
      <Section>
        <Item variant='button' onPress={() => navigate('/info')}>
          <View className='bg-yellow-500 rounded-lg p-[1]'>
            <IOIcon name="information-circle-outline" size={26} color='white'/>
          </View>
          <Text className='text-zinc-400 text-[16px] ml-5'>info</Text>
        </Item>
      </Section>
      <Menu 
        onClose={() => setShowEditDefaultConfig(false)}
        open={showEditDefaultConfig}
      >

      </Menu>
    </View>
  )
}
