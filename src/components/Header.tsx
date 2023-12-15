import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'react-router-native'

type IProps = {

}

export default function(props: IProps) {

  return (
    <View className='w-full h-12 bg-gray-700 flex flex-row'>
      <View className='w-1/3 h-full flex flex-row items-center px-2'>
        <Link to="/">
          <Ionicons name="ios-home-outline" size={32} color="rgb(212,212,216)"/>
        </Link>
        <View className='w-2'/>
        <Link to="/camera">
          <Ionicons name="ios-camera-outline" size={38} color="rgb(212,212,216)" />
        </Link>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-center'>
        <Text className='text-zinc-300 text-4xl'>
          PASTA
        </Text>
      </View>
      <View className='w-1/3 h-full flex flex-row items-center justify-end px-2'>
        <Link to="/config">
          <Ionicons name="ios-settings-outline" size={32} color="rgb(212,212,216)" />
        </Link>
      </View>
    </View>
  )
}