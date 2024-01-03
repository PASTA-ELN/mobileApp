import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'react-router-native'

export default function() {

  //
  // Render
  //
  return (
    <View className='w-full h-14 bg-gray-800 flex flex-row px-4'>
      <View className='w-1/3 h-full flex flex-row items-center'>
        <Link to="/" underlayColor="rgba(255,255,255,0.1)">
          <Ionicons name="ios-home-outline" size={32} color="rgb(212,212,216)"/>
        </Link>
        <View className='w-2'/>
        <Link to="/camera" underlayColor="rgba(255,255,255,0.1)">
          <Ionicons name="ios-camera-outline" size={38} color="rgb(212,212,216)" />
        </Link>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-center'>
        <Link to="/" underlayColor="rgba(255,255,255,0.1)">
          <Text className='text-zinc-300 text-4xl'>
            PASTA
          </Text>
        </Link>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-end'>
        <Link to="/config" underlayColor="rgba(255,255,255,0.1)">
          <Ionicons name="ios-settings-outline" size={32} color="rgb(212,212,216)" />
        </Link>
      </View>
    </View>
  )
}