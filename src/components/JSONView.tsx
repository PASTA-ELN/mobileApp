import React from 'react'
import { Text, View } from 'react-native'

//
// JSON type
//
type JSON = {
  [key: string]: string | number | JSON | string[] | number[] | JSON[]
}

//
// Component Props
//
type IProps = {
  value: JSON;
  className?: string;
}

//
// Component
//
export default function JSONView(props: IProps) {

  //
  // Render Items
  //
  const items = Object.entries(props.value).map(([key,value], index) => {

    //
    // Strings
    //
    if(typeof value === 'string'){
      return <Text key={`JSONView-${index}`} className="text-zinc-300">"{key}": "{value}"</Text>
    }

    //
    // Numbers
    //
    else if(typeof value === 'number'){
      return <Text key={`JSONView-${index}`} className="text-zinc-300">"{key}": {value}</Text>
    }

    //
    // Arrays
    //
    else if(Array.isArray(value)){
      if(value.length === 0)
        return <Text key={`JSONView-${index}`} className="text-zinc-300">"{key}": []</Text>
      
      const arrayItems = value.map((item, index2) => {

        if(typeof item === 'string'){
          return (
            <View key={`JSONView-${index}-${index2}`} className='flex flex-row items-center pl-2'>
              <Text className='text-zinc-300'>"{item}"</Text>
            </View>
          )
        }
        else if(typeof item === 'number'){
          return (
            <View key={`JSONView-${index}-${index2}`} className='flex flex-row items-center pl-2'>
              <Text className='text-zinc-300'>{item}</Text>
            </View>
          )
        }
        else {
          return (
            <View key={`JSONView-${index}-${index2}`} className='flex flex-row items-center'>
              <JSONView value={item} />
            </View>
          )
        }
      });

      return (
        <View key={`JSONView-${index}`} className='w-full h-fit'>
          <Text className='text-zinc-300'>"{key}": {'['}</Text>
          {arrayItems}
          <Text className='text-zinc-300'>{']'}</Text>
        </View>
      )
    }

    //
    // Objects
    //
    else {
      if(Object.keys(value).length === 0)
        return <Text key={`JSONView-${index}`} className="text-zinc-300">"{key}": {'{}'}</Text>
      return (
        <View key={`JSONView-${index}`} className='w-full h-fit'>
          <Text className='text-zinc-300'>{key}: {'{'}</Text>
          <JSONView value={value} />
          <Text className='text-zinc-300'>{'}'}</Text>
        </View>
      )
    }
  });

  //
  // Render
  //
  return (
    <View className='pl-2'>
      {items}
    </View>
  )
}
