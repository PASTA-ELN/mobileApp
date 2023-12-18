import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { type CredentialsConfig } from 'types/Credentials'

type IProps = {
  usedCredentials: CredentialsConfig
}
export default function(props: IProps) {

  return (
    <View className='w-full h-fit bg-gray-800 rounded-xl flex flex-col px-4'>
      <View className='w-full h-20 flex flex-row items-center py-2'>
        <FontAwesome name='user-circle' size={60} color='rgb(59,130,246)' />

        <View className='p-4 w-fit h-fit border-b border-gray-700'>
          <Text className='text-zinc-300 text-2xl'>
            {props.usedCredentials.credentials.username}
          </Text>
          <Text className='text-zinc-400'>
            {props.usedCredentials.credentials.database} <Text className='text-blue-500'>@</Text> {props.usedCredentials.credentials.server}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <View className='w-full h-fit p-2 flex flex-row items-center justify-between'>
          <Text className='text-zinc-400 '>
            change default config
          </Text>
          <Ionicons name='chevron-forward-sharp' size={26} color='rgb(161,161,170)'/>
        </View>
      </TouchableOpacity>
    </View>
  )
}
