import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//
// Component Props
//
type IProps = {
  value: string;
  title: string;
  onSubmit: () => void; // called if data changed
  onclose: () => void;  // called every time the user presses the close button
}
//
// Component
//
export default function(props: IProps) {
  //
  // State
  //
  const [text, setText] = React.useState(props.value);

  //
  // Functions
  //
  function handlePress() {
    if(text !== props.value)
      props.onSubmit();
    props.onclose();
  }

  //
  // Render
  //
  return (
    <View className='w-full h-full p-4'>
      <View className='w-full h-fit pb-4 flex flex-row items-center justify-between'>
        <View className='w-10' />
        <Text className='text-zinc-300 text-2xl underline'>{props.title}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons style={{ color: 'rgb(59,130,246)' }} name='close-sharp' size={40}/>
        </TouchableOpacity>
      </View>
      <Text>
        {text}
      </Text>
    </View>
  )
}
