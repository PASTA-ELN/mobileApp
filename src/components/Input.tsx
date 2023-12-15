import React from 'react';
import { View, TextInput } from 'react-native';

type IProps = {
  onSubmit: () => void;
  onTextChange: (text: string) => void;
  placeholder?: string;
  type?: 'text' | 'password'
  value: string;
}
function input(props: IProps, ref: React.Ref<TextInput>) {

  const [hideText, setHideText] = React.useState<boolean>(props.type === 'password');

  return (
    <View
      className='p-2 bg-gray-800 w-full h-fit rounded-lg mb-2'
    >
      <TextInput 
        autoCapitalize='none'
        autoCorrect={false}
        className='text-zinc-300 text-[18px]'
        onChangeText={props.onTextChange}
        onSubmitEditing={props.onSubmit}
        placeholder={props.placeholder}
        placeholderTextColor='rgb(82,82,91)'
        ref={ref}
        secureTextEntry={hideText}
        value={props.value}
      />
    </View>
  )
}

export default React.forwardRef(input);