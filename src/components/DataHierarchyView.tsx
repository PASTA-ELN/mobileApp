import React from 'react'
import { useDataHierarchy } from 'hooks/localstorage'
import { Text, View } from 'react-native'

type IProps = {

}
export default function(props: IProps){

  const dataHierarchy = useDataHierarchy()

  console.log(dataHierarchy);

  return (
    <View >
      <Text>TODO</Text>
    </View>
  )
}
