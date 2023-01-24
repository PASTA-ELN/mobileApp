/**
 * @file Config page that allows change to configuration
 */
import React, { Component } from 'react';
import { Alert, View, Text, Button, Linking, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import Ent from 'react-native-vector-icons/Entypo';

import { configStyle, misc } from '../style/index';
import { connect } from 'react-redux';
import { InitialState } from '../types/store';
import { CredentialWithConfigName } from '../types/Interactions';
import { dispatch } from '../store';
import { logOut } from '../store/reducer/Login';



//TODO

// Developer Knopf 
// => hässliche Daten auch anzeigen

//Logs anzeigen lassen
//Log datei an email schicken



type Props = {
  allCredentials: CredentialWithConfigName[];
  username: string;
  configname: string;
}

type State = {
  showLogin: boolean;
  darkMode?: boolean;
  open: boolean;
  value: ValueType | ValueType[] | null;
  items: {label:string, value:string}[];
  recent: string;
}

/** CONFIG-PAGE CLASS */
class Config extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLogin: false,
      //select box properties
      open: false,
      value: '',
      items: [],
      recent: 'loading...'
    }
    this.getRecent = this.getRecent.bind(this);
  }
  componentDidMount() {
    this.getRecent();
  }

  async getRecent() {
    var tmp = await AsyncStorage.getItem('lastLogin');
    this.setState({ recent: tmp! });
  }

  relogin(value: string | number | boolean | ValueType[] | null): void {
    throw new Error('Method not implemented.');
  }

  logOut(){
    Alert.alert(
      'Warning',
      'this will delete all user data from the device and send you back to the login screen',
      [
        { text: 'cancel'},
        { text: 'proceed', onPress: () => dispatch(logOut())}
      ]
    )
  }

  addCreds(){
    
  }

  //Alert for opening help page
  createTwoButtonAlert = () =>
    Alert.alert(
      'Warning',
      'Open jugit Page of \nPasta Mobile App?',
      [{
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => Linking.openURL('https://jugit.fz-juelich.de/pasta/mobile_app/-/wikis/home')
      }]
    );

  //OnPress handler for Touchables
  adjustScreensize() {
    Alert.alert('Warning','still in alpha\nwork in progress');
  }
  adjustTextsize() {
    Alert.alert('Warning','still in alpha\nwork in progress');
  }
  error() {
    Alert.alert(
      'Warning',
      'this will throw an uncaught error, which will probably cause the app to close',
      [
        {
          text: 'abort'
        },
        {
          text: 'proceed',
          onPress: () => {throw new Error('test12345')}
        }
      ]
      )
  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    const { showLogin } = this.state;
    const greenIcon = { ...configStyle.iconFrame, backgroundColor: '#55dd33'};
    const redIcon = { ...configStyle.iconFrame, backgroundColor: '#ff4d29' };
    const orangeIcon = { ...configStyle.iconFrame, backgroundColor: '#fc8403' };
    const purpleIcon = { ...configStyle.iconFrame, backgroundColor: '#5f00cc' };
    const iconColor = '#000000';

    if (showLogin) {
      //need new login component
      return (
        <View style={configStyle.login}>
          <Button title='cancel' onPress={() => this.setState({ showLogin: false })} />
        </View>)
    }
    return (
      <View style={configStyle.container}>
        <View >
          <Text style={configStyle.heading}>Configuration</Text>
          <TouchableOpacity style={{ ...configStyle.outer , flexDirection: 'row', paddingRight: 5 }}>
            <View style={configStyle.profilePic}>
              <Text style={configStyle.profilePicText}>{this.props.username![0].toUpperCase()}</Text>
            </View>
            <View style={configStyle.profileInfo}>
              <Text style={configStyle.usernameText}>{this.props.username}</Text>
              <View style={configStyle.subText}>
                <Text style={misc.text}>a </Text>
                <Text style={misc.text}>b </Text>
              </View>
            </View>
            <Ent name='chevron-thin-right' size={30} style={configStyle.chevron} color={iconColor} />
          </TouchableOpacity>
          <View style={configStyle.outer}>
            <TouchableOpacity style={configStyle.middle} onPress={() => this.addCreds()}>
              <View style={greenIcon}>
                <Ent name='plus' size={25} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>Add Database</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={configStyle.middle} onPress={this.logOut}>
              <View style={redIcon}>
                <Ent name='cross' size={25} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>log out</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
            <View style={configStyle.middle}>
              <View style={configStyle.iconFrame}>
                <Ent name='check' size={21} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.innerBottom}>
                <Text style={configStyle.text}>Current Database</Text>
                <View style={configStyle.dropDownOuter}>
                </View>
              </View>
            </View>
          </View>
          <View style={{ ...configStyle.outer, zIndex: -1 }}>
            <TouchableOpacity style={configStyle.middle} onPress={() => this.adjustScreensize()}>
              <View style={configStyle.iconFrame}>
                <Ent name='check' size={21} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>Adjust screen size (WIP)</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={configStyle.middle} onPress={() => this.adjustTextsize()}>
              <View style={configStyle.iconFrame}>
                <Ent name='check' size={21} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>Text size (WIP)</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={configStyle.middle} onPress={() => this.error()}>
              <View style={configStyle.iconFrame}>
                <Ent name='check' size={21} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>test error</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={configStyle.middle} onPress={this.createTwoButtonAlert}>
              <View style={purpleIcon}>
                <Text style={configStyle.iconText} >?</Text>
              </View>
              <View style={configStyle.innerBottom}>
                <Text style={configStyle.text}>Help</Text>
                <Ent name='chevron-thin-right' size={20} style={configStyle.icon} color={iconColor} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state: InitialState){
  const allCredentials = state.login.allCredentials;
  const configname = state.login.usedConfigName!;

  let username: string = '';

  allCredentials.forEach(item => {
    if(item.configname === configname){
      username = item.credentials.username;
    }
  })

  return { allCredentials: allCredentials, username, configname: configname }
}

export default connect(mapStateToProps)(Config);
