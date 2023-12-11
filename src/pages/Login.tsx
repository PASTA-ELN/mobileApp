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
      <View>
        <View>
          <LoginForm submit={(credentials) => dispatch(login(credentials))} />
        </View>
        <Text>Version {global.version}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}