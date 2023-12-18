import React from 'react'
import { Text, View } from 'react-native'

import { useLocalCredentials } from 'hooks/credentials'
import UserComponent from 'components/UserComponent'

type IProps = {

}
export default function(props: IProps) {

  const localCredentials = useLocalCredentials();
  const credentialsKeys = Object.keys(localCredentials);

  if (credentialsKeys.length === 0) {
    return <View></View>
  }
  
  const usedCredentials = {
    configName: 'default',
    credentials: localCredentials['default']
  };

  return (
    <View className='w-full h-full p-4 flex flex-col items-center justify-start'>
      <View className='w-full h-fit mb-4'>
        <Text className='text-zinc-300 text-4xl font-semibold'>Settings</Text>
      </View>
      <UserComponent usedCredentials={usedCredentials} />
    </View>
  )
}
