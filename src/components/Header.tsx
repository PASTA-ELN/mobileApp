/**
 * @file Header at the top app
 */
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Link } from 'react-router-native';
import { headerStyle } from '../style/index'

type Props = {}
type State = {}

export default class Header extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {}
  }

  /** Render method */
  render() {
    return (
      <View style={headerStyle.container}>
        <View style={{ width: '25%' }}>
          <Link to='/camera' underlayColor='none'>
            <Image source={require('../public/camera.png')} style={headerStyle.imageL}></Image>
          </Link>
        </View>
        <View style={{ width: '50%' }}>
          <Link to='/' underlayColor='none'>
            <Text style={headerStyle.pasta}>PASTA</Text>
          </Link>
        </View>
        <View style={{ width: '25%' }}>
          <Link to='/config' underlayColor='none'>
            <Image source={require('../public/gear.png')} style={headerStyle.imageR}></Image>
          </Link>
        </View>
      </View>
    )
  }
}
