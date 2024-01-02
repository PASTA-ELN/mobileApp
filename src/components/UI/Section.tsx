import React from 'react'
import { View } from 'react-native'

type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){

  const childrenArray = React.Children.toArray(props.children);
  const items = childrenArray.map((child, index) => {

    const id = React.useId();

    return (
      <View className='w-full h-fit' key={`Section_${id}_container_${index}`}>
        {child}
        {index !== childrenArray.length -1 && <View className='pl-[15%]' key={`Section_${id}_line_container_${index}`}>
          <View className='w-full h-px bg-gray-700' key={`Section_${id}_line_${index}`} />
        </View>}
      </View>
    )
  });

  return (
    <View className='w-full h-fit rounded-2xl mt-4 bg-gray-800'>
      {items}
    </View>
  )
}
