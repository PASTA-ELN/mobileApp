import React from 'react'
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import MUIIcon from '@expo/vector-icons/MaterialCommunityIcons'
import IOIcon from '@expo/vector-icons/Ionicons'

import { useAutologinState, useLocalCredentials } from 'hooks/credentials'
import UserComponent from 'components/UserComponent'
import Section from 'components/UI/Section'
import Item from 'components/UI/Item'
import { useDataHierarchy } from 'hooks/localstorage'
import { useNavigate } from 'react-router-native'

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
  //
  // Hook calls
  //
  const localCredentials = useLocalCredentials();
  const credentialsKeys = Object.keys(localCredentials);
  const dataHierarchy = useDataHierarchy();
  const navigate = useNavigate();

  //
  // Vars
  //
  if (credentialsKeys.length === 0) {
    return <View></View>
  }
  const usedCredentials = {
    configName: 'default',
    credentials: localCredentials['default']
  };

  //
  // Show Data Hierarchy
  //
  if(showDataHierarchy){
    const items = Object.entries(dataHierarchy).map(([key, value], index) => {
      return (
        //TODO replace with collapsible component
        <View key={index} className='w-full h-fit flex flex-row items-center justify-start'>
          <Text className='text-zinc-300'>{key}</Text>
        </View>
      )
    });

    return (
      <View className='p-4'>
        <View className='w-full h-fit flex flex-row items-center'>
          <View className='w-[30]'/>
          <Text className='text-zinc-300 text-2xl mx-auto'>Data Hierarchy</Text>
          <TouchableOpacity onPress={() => setShowDataHierarchy(false)}>
            <IOIcon name='close-sharp' size={26} color='rgb(212,212,216)'/>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {items}
        </ScrollView>
      </View>
    )
  }

  //
  // Show Add Config
  //
  if(showAddConfig){
    return (
      <View></View>
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
        <Item variant='button' onPress={() => {}}>
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
    </View>
  )
}
