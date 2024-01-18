import React from 'react'
import { Image, Text, View } from 'react-native'
import { SvgFromXml } from 'react-native-svg'

//
// Component Props
//
type IProps = {
  data: string
}
//
// Component
//
export default function(props: IProps) {
  //
  // SVG
  //
  if(props.data.startsWith('<?xml'))
    //TODO there seems to be some padding because the aspect is not 1:1 
    return (
      <SvgFromXml xml={props.data} width="100%"/>
    )
  //
  // Image URI
  //
  if(props.data.startsWith('data:image')){
    //
    // BASE64
    //
    if(props.data.split(';')[1].startsWith('base64'))
      return (
        <View className='w-full aspect-square'>
          <Image source={{uri: props.data}} className="w-full h-full"/>
        </View>
      )

    //TODO other Image URI encodings
  }
  //
  // Unsupported Image Type
  //
  return (
    <View className='w-full h-fit p-4'>
      <Text className='text-zinc-300 text-xl'>
        Unsupported Image Type
      </Text>
    </View>
  )
}
