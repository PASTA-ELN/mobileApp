import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Section from 'components/UI/Section'

//
// Component Props
//
type IProps = {
  codes: string[];
  onClose: () => void;
  onSubmit: (codes: string[]) => void;
}

//
// Component
//
export default function(props: IProps) {

  //
  // State
  //
  const [codes, setCodes] = React.useState<string[]>(props.codes);

  //
  // Vars
  //
  const items = codes.map((code, index) => {
    return (
      <Section key={`EDIT_QR_${index}`}>
        <View className='w-full h-fit flex flex-row items-center justify-between p-4'>
          <Text className='text-zinc-300 text-xl'>{code}</Text>
          <TouchableOpacity onPress={() => removeCode(code)}>
            <Ionicons style={{ color: 'rgb(59,130,246)' }} name='trash-bin' size={30}/>
          </TouchableOpacity>
        </View>
      </Section>
    )
  })

  //
  // Functions
  //
  function removeCode(code: string){
    const newCodes = codes.filter(c => c !== code);
    setCodes(newCodes);
  }
  function close(){
    if(codes.length !== props.codes.length){
      props.onSubmit(codes);
    }
    props.onClose();
  }

  //
  // Render
  //
  return (
    <View className='w-full h-full p-4'>
      <View className='w-full h-fit pb-4 flex flex-row items-center justify-between'>
        <View className='w-10' />
        <Text className='text-zinc-300 text-2xl underline'>Edit QR Codes</Text>
        <TouchableOpacity onPress={close}>
          <Ionicons style={{ color: 'rgb(59,130,246)' }} name='close-sharp' size={40}/>
        </TouchableOpacity>
      </View>
      <View className='w-full h-fit'>
        {items}
      </View>
    </View>
  )
}
