/**
 * @file further details on entries in Data.js
 */
import React, { Component } from 'react';
import { Button, GestureResponderEvent, Text, View } from 'react-native';
import { detailsStyle } from '../style/index';

type Props = {
  goBack: (event: GestureResponderEvent) => void;
  name: string
}

type State = {

}

export default class Details extends Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state={};
  }


  /*********************
   * The Render Method *
   *********************/
  render(){
    return(
      <View style={detailsStyle.container}>
        <Button title='go back' onPress={this.props.goBack}/>
        <Text>loading...</Text>
      </View>
    )
  }
}