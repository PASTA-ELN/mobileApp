import React from 'react'
import { useDataHierarchy } from 'hooks/localstorage'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import IOIcon from '@expo/vector-icons/Ionicons'

import Collapsible from './UI/Collapsible'
import JSONView from './JSONView'

//
// Component Props
//
type IProps = {
  onClose: () => void
}

//
// Component
//
export default function(props: IProps){
  //
  // Hook calls
  //
  const dataHierarchy = useDataHierarchy()

  const items = Object.entries(dataHierarchy).map(([key, value], index) => {

    //
    // dont render strings and numbers as collapsible
    //
    if(typeof value === 'string' || typeof value === 'number'){
      return (
        <View
          key={`DataHierarchy-${index}`}
          className='w-full h-fit flex flex-row items-center justify-between p-4 bg-gray-800 border-b border-gray-700' 
        >
          <Text className='text-zinc-300 text-xl'>{key}</Text>
          <Text className='text-zinc-300 text-sm'>{value}</Text>
        </View>
      )
    }

    //
    // render collapsible
    //
    return (
      <View 
        key={`DataHierarchy-${index}`}
        className='w-full h-fit flex flex-row items-center'  
      >
        <Collapsible title={key}>
          <JSONView value={value}/>
        </Collapsible>
      </View>
    )
  });

  //TODO remove bouncing
  // fix bottom clipping 

  //
  // Render
  //
  return (
    <View className='h-full w-full pb-10'>
        <View className='w-full h-fit flex flex-row items-center p-4'>
          <View className='w-[30]'/>
          <Text className='text-zinc-300 text-2xl mx-auto'>Data Hierarchy</Text>
          <TouchableOpacity onPress={props.onClose}>
            <IOIcon name='close-sharp' size={26} color='rgb(212,212,216)'/>
          </TouchableOpacity>
        </View>
        <ScrollView className='w-full h-fit'>
          {items}
        </ScrollView>
      </View>
  )
}
