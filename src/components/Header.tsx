/**
 * @file Header at the top app
 */
import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import { headerStyle } from '../style/index'

type Props = {

}

type State = {
  modalVisible: boolean;
}

export default class Header extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  /** Render method */
  render() {
    return (
      <View style={headerStyle.container}>
        <View style={{ width: '25%' }}>
          <Link to='/camera' component={TouchableWithoutFeedback}>
            <Image source={require('../public/camera.png')} style={headerStyle.imageL}></Image>
          </Link>
        </View>
        <View style={{ width: '50%' }}>
          <Link to='/' component={TouchableWithoutFeedback}>
            <Text style={headerStyle.pasta}>PASTA</Text>
          </Link>
        </View>
        <View style={{ width: '25%' }}>
          <Link to='/config' component={TouchableWithoutFeedback}>
            <Image source={require('../public/gear.png')} style={headerStyle.imageR}></Image>
          </Link>
        </View>
      </View>
    )
  }
}
