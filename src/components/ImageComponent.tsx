import React from 'react'
import { Text, View } from 'react-native'
import {} from 'react-native-svg'

type IProps = {
  data: string
}
export default function(props: IProps) {

  console.log(props.data.slice(0, 100))

  /** SVG */
  if(props.data.startsWith(''))
    return (
      <View>

      </View>
    )
  return (
    <View>

    </View>
  )
}
