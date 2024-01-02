import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'

type IProps = {
  children: React.ReactNode;
  onPress: () => void;
  variant: 'button'
} | {
  children: React.ReactNode;
  endContent: React.ReactNode;
  variant: 'switch'
}
export default function(props: IProps){

  if(props.variant === 'switch')
    return (
      <View className='p-2 pr-4 flex flex-row items-center justify-between'>
        <View className='flex flex-row items-center'>
          {props.children}
        </View>
        {props.endContent}
      </View>
    )

  return (
    <TouchableOpacity className='p-2 pr-4 flex flex-row items-center justify-between' onPress={props.onPress}>
      <View className='flex flex-row items-center'>
        {props.children}
      </View>
      <Icon name='chevron-forward-sharp' size={26} color='rgb(161,161,170)'/>
    </TouchableOpacity>
  )
}
