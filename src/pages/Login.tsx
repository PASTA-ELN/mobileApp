import React from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'

import { getCredentials, loadAutologin } from 'utils/localInteractions';
import { useAppDispatch } from 'store';
import { login, relogin } from 'store/reducer/Login';
import LoginForm from 'components/LoginForm';

//
// Component
//
export default function() {
  //
  // State
  //
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  //
  // Hook calls
  //
  const dispatch = useAppDispatch();

/**
* >>=============================================================================<<
* ||       __        _______ _     ____ ___  __  __ _____   _____ ___            ||
* ||       \ \      / / ____| |   / ___/ _ \|  \/  | ____| |_   _/ _ \           ||
* ||        \ \ /\ / /|  _| | |  | |  | | | | |\/| |  _|     | || | | |          ||
* ||         \ V  V / | |___| |__| |__| |_| | |  | | |___    | || |_| |          ||
* ||          \_/\_/  |_____|_____\____\___/|_|  |_|_____|   |_| \___/           ||
* ||   ____    _    _     _     ____    _    ____ _  __  _   _ _____ _     _     ||
* ||  / ___|  / \  | |   | |   | __ )  / \  / ___| |/ / | | | | ____| |   | |    ||
* || | |     / _ \ | |   | |   |  _ \ / _ \| |   | ' /  | |_| |  _| | |   | |    ||
* || | |___ / ___ \| |___| |___| |_) / ___ \ |___| . \  |  _  | |___| |___| |___ ||
* ||  \____/_/   \_\_____|_____|____/_/   \_\____|_|\_\ |_| |_|_____|_____|_____|||
* ||                                                                             ||
* >>=============================================================================<<
*/
  React.useEffect(() => {
    loadAutologin()
      .then((autologin) => {
        if(!autologin){
          setIsLoading(false);
          return;
        }
        getCredentials('default')
        .then((config) => {
          if(config){
            dispatch(relogin(config))
            .then(() => setIsLoading(false));
          }
          else {
            setIsLoading(false);
          }
        });
      });
  }, []);

  //
  // Render empty view if loading
  //
  if(isLoading){
    //TODO: Add loading screen
    return (
      <View />
    )
  }

  //
  // Render login form
  //
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
