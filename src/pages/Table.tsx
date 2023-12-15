
import React from 'react'
import { Text, View } from 'react-native'
import { useParams } from 'react-router-native'

export default function() {

  const { dataType } = useParams();

  if(!dataType) 
    return <Text>Invalid data type</Text>

  return (
    <View className='w-full h-full p-4'>
      <Text className='text-zinc-300 text-xl'>
        Table for {dataType}
      </Text>
    </View>
  )
}
