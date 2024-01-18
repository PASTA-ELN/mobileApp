import React from 'react'
import { View } from 'react-native'

//
// Component Props
//
type IProps = {
  children: React.ReactNode;
}
//
// Component
//
export default function(props: IProps){
  //
  // Vars
  //
  const childrenArray = React.Children.toArray(props.children);
  const items = childrenArray.map((child, index) => {
    const id = React.useId();
    //
    // Render
    //
    return (
      <View className='w-full h-fit' key={`Section_${id}_container_${index}`}>
        {child}
        {index !== childrenArray.length -1 && <View className='pl-[15%]' key={`Section_${id}_line_container_${index}`}>
          <View className='w-full h-px bg-gray-700' key={`Section_${id}_line_${index}`} />
        </View>}
      </View>
    )
  });
  //
  // Render
  //
  return (
    <View className='w-full h-fit rounded-xl mt-4 bg-gray-800'>
      {items}
    </View>
  )
}
