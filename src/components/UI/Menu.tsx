import React from 'react'
import { TouchableOpacity, View } from 'react-native'

//
// Component Props
//
type IProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement[];
}

//
// Component
//
export default function(props: IProps) {

  //
  // if not open, return empty view
  //
  if(!props.open)
    return <View/>;

  //
  // add line between each child
  //

  const items = props.children.map((child, index) => {
    return (
      <React.Fragment key={`Menu-${index}`}>
        <View className='p-2'>
          {child}
        </View>
        {index !== props.children.length -1 && <View className='border-b border-gray-700'/>}
      </React.Fragment>
    )
  });
  
  //
  // render
  //
  return (
    <TouchableOpacity 
      onPress={props.onClose}
      className='absolute w-screen h-screen z-10 flex items-center'
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
    >
      <View className='w-[80%] h-fit mx-[10%] mt-[50] bg-gray-800 rounded-3xl'>
        {items}
      </View>
    </TouchableOpacity>
  )
}
