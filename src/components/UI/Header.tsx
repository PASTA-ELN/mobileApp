import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigate } from 'react-router-native'

export default function() {

  //
  // Hook calls
  //
  const navigate = useNavigate();

  //
  // Render
  //
  return (
    <View className='w-full h-14 bg-gray-800 flex flex-row px-4'>
      <View className='w-1/3 h-full flex flex-row items-center'>
        <TouchableOpacity onPress={()=>navigate('/')}>
          <Ionicons name="ios-home-outline" size={32} color="rgb(59,130,246)"/>
        </TouchableOpacity>
        <View className='w-2'/>
        <TouchableOpacity onPress={()=>navigate('/camera')}>
          <Ionicons name="ios-camera-outline" size={38} color="rgb(59,130,246)" />
        </TouchableOpacity>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-center'>
        <TouchableOpacity onPress={()=>navigate('/')}>
          <Text className='text-zinc-300 text-4xl'>
            PASTA
          </Text>
        </TouchableOpacity>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-end'>
        <TouchableOpacity onPress={()=>navigate('/config')}>
          <Ionicons name="ios-settings-outline" size={32} color="rgb(59,130,246)" />
        </TouchableOpacity>
      </View>
    </View>
  )
}