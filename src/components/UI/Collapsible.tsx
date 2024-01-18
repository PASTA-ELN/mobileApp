import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import IoIcon from '@expo/vector-icons/Ionicons'

type IProps = {
  title: string,
  children: React.ReactNode
}
export default function(props: IProps) {

    //
    // state
    //
    const [collapsed, setCollapsed] = React.useState(true);

    //TODO implement collapsible component
    // Use chevron icon to indicate collapsible state
    // Use animation to collapse/expand

    //
    // Change icon depending on state
    //
    const icon = collapsed ? 'chevron-down-outline' : 'chevron-up-outline';

    //
    // Render
    //
    return (
      <View className='w-full h-fit'>
        <TouchableOpacity 
          className='w-full h-fit flex flex-row items-center justify-between p-4 bg-gray-800 border-b border-gray-700'
          onPress={() => setCollapsed(!collapsed)}
        >
          <Text className='text-xl text-zinc-300'>{props.title}</Text>
          <IoIcon name={icon} size={26} color='rgb(212,212,216)'/>
        </TouchableOpacity>
        {!collapsed && (
          <View className='w-full h-fit bg-gray-800 p-2 border-b border-gray-700'>
            {props.children}
          </View>
        )}
      </View>
    )
  }
