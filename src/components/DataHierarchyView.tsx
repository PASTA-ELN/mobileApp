import React from 'react'
import { useDataHierarchy } from 'hooks/localstorage'
import { Text, View } from 'react-native'

//
// Component
//
export default function(){
  //
  // Hook calls
  //
  const dataHierarchy = useDataHierarchy()

  console.log(dataHierarchy);
  //
  // Render
  //
  return (
    <View >
      <Text>TODO</Text>
    </View>
  )
}
