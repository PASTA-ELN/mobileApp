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
import { ConfigProps } from '../types/routes';

type Props = ConfigProps & {
  allCredentials: CredentialWithConfigName[];
  username?: string;
  configName?: string;
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
    this.setState({ recent: JSON.parse(tmp!).configName });
  }

  relogin(value: string | number | boolean | ValueType[] | null): void {
    throw new Error('Method not implemented.');
  }

  addCreds(){
    
  }

  //toggle method for DarkMode switch
  toggleSwitch = async () => {
    Alert.alert('Warning','WIP')
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
  adjust() {
    //alert('still in alpha\nwork in progress');
    throw new Error('test12345');
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
            <TouchableOpacity style={configStyle.middle}>
              <View style={redIcon}>
                <Ent name='cross' size={25} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>Remove Database</Text>
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
            <View style={configStyle.middle}>
              <View style={orangeIcon}>
                <Ent name='light-bulb' size={18} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>Dark mode (requires reload) (WIP)</Text>
                <View style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 10 }}>
                  <Switch
                    value={this.state.darkMode}
                    onValueChange={this.toggleSwitch}
                  />
                </View>
              </View>
            </View>
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
            <TouchableOpacity style={configStyle.middle} onPress={() => this.adjust()}>
              <View style={configStyle.iconFrame}>
                <Ent name='check' size={21} color='#ffffff' style={misc.centered} />
              </View>
              <View style={configStyle.inner}>
                <Text style={configStyle.text}>???(WIP)</Text>
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
  const allCredentials = state.configuration.allCredentials;
  const username = state.login.usedConfig?.username;
  const configName = state.login.usedConfigName;
  return { allCredentials: allCredentials, username: username, configName: configName }
}

export default connect(mapStateToProps)(Config);
