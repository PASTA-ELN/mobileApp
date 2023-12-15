import React from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'

import { loadCredentials } from 'utils/localInteractions';
import { useAppDispatch } from 'store';
import { login, relogin } from 'store/reducer/Login';
import LoginForm from 'components/LoginForm';

type IProps = {

}
export default function(props: IProps) {

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    loadCredentials()
      .then((credentials) => {
        if(credentials){
          dispatch(relogin(credentials))
            .then(() => setIsLoading(false));
        }
        else {
          setIsLoading(false);
        }
      });
  }, []);

  if(isLoading){
    return (
      <View />
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='w-full h-full'>
        <View className='w-full h-full flex items-center justify-center'>
          <LoginForm submit={(credentials) => dispatch(login(credentials))} />
        </View>
        <Text className='text-zinc-600 ml-4'>
          Version {global.version}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}