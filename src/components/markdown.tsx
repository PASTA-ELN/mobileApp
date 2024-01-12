import React from 'react'
import { Image, Text, View } from 'react-native'

//
// Component Props
//
type IProps = {
  children: string;
  variables?: Record<string, string|number>;
}
//
// Component
//
export default function(props: IProps) {
  //
  // hook calls
  //
  const id = React.useId();

  //
  // Makeshift Markdown Parser
  //
  const items = props.children.split('\n').map((item, index) => {
    item = item.trim();

    //
    // HTML Images
    //
    if(item.startsWith('<img')){
      //
      // Get src and style from img props
      //
      const src = item.split('src="')[1].split('"')[0];
      const style = item.split('style="')[1].split('"')[0]; //TODO parse style

      //
      // Render native Image
      //
      return (
        <Image
          key={`${id}_md_${index}`}
          source={{uri: src}}
          style={{
            
          }}
        />
      )
    }

    //
    // Markdown Images
    //
    if(item.startsWith('![')){
      //
      // Get src from brackets
      //
      const src = item.split('(')[1].split(')')[0];

      //
      // Render native Image
      //
      return (
        <Image
          key={`${id}_md_${index}`}
          source={{uri: src}}
        />
      )
    }

    //
    // Save variables depending on markdown symbols
    //
    const isHeader          = item.startsWith('#');
    const isSubHeader       = item.startsWith('##');
    const isSubSubHeader    = item.startsWith('###');
    const isSubSubSubHeader = item.startsWith('####');
    const isUnderlined      = isHeader || isSubHeader;
    const isListItem        = item.startsWith('-');
    const fontSize = 
      isHeader          ? 24:
      isSubHeader       ? 20:
      isSubSubHeader    ? 16:
      isSubSubSubHeader ? 12:
      /** Default **/     16;

    //
    // Remove markdown symbols
    //
    item = item.replace('#', '').replace('-', '').trim();

    //
    // find and replace variables
    //
    const parts = item.split('|');
    if(parts.length > 1){
      if(parts.length % 3 !== 1){
        console.error('Markdown Variable Error: Invalid number of parts');
      }
      else {
        for(let i = 0; i < parts.length; i += 3){
          const variable = parts[i + 1];
          const defaultValue = parts[i + 2];
  
          if(!props.variables || !props.variables[variable]){
            item = item.replace(`|${variable}|`, defaultValue);
          }
          else {
            item = item.replace(`|${variable}|`, props.variables[variable].toString());
          }

          item = item.replace(`${defaultValue}|`, '');
        }
      }
    }

    //
    // Split Text into bold and normal text
    //
    const line = item.split('**').map((subItem, index_2) => {
      const isBold = index_2 % 2 === 1;

      return (
        <Text
          key={`${id}_md_${index}_${index_2}`}
          className='text-zinc-200'
          style={{
            fontWeight: isBold ? 'bold': 'normal',
            fontSize
          }}
        >
          {subItem}
        </Text>
      )
    });

    return (
      <View className='w-full h-fit p-1' key={`${id}_md_${index}`}>
        <View className='flex flex-row'>
          {isListItem && <View className='w-2 h-2 bg-gray-500 rounded-full mt-2 mx-2'/>}
          {isUnderlined && <View className='w-2'/>}
          {line}
        </View>
        {isUnderlined && <View className='border-b border-gray-500'/>}
      </View>
    )
  });

  //
  // Render
  //
  return (
    <View className='w-full h-fit p-4 bg-gray-800 border-b-2 border-t-2 border-gray-600'>
      {items}
    </View>
  )
}
