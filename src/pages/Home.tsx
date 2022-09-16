/**
 * @file Homepage, default starting page
 */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Link, Navigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { homeStyle } from '../style/index';

type Props = {}

type State = {
  dataTypes: string[];
  sortDirection: 'sort-amount-up' | 'sort-amount-down';
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataTypes: [],
      sortDirection: 'sort-amount-up'
    };
  }
  
  componentDidMount() {
    this.getDataTypes();
  }

  /**Extract the dataTypes from the AsyncStorage */
  async getDataTypes() {
    var dataTypes = await AsyncStorage.getItem('dataTypes');
    this.setState({ dataTypes: JSON.parse(dataTypes!) });
  }

  /**toggle Sorting up or down */
  toggleSortDirection() {
    if (this.state.sortDirection === 'sort-amount-up') {
      this.setState({ sortDirection: 'sort-amount-down' });
      this.state.dataTypes.sort(function (a, b) {
        return a > b ? 1 : -1;
      });
    } else {
      this.setState({ sortDirection: 'sort-amount-up' });
      this.state.dataTypes.sort(function (a, b) {
        return a < b ? 1 : -1;
      })
    }
  }

  /**Render method*/
  render() {
    //if data is not fully loaded: prevent crash
    if (!this.state.dataTypes)
      return (<View/>);

    return <Navigate to='/data/m-006c9a52d74d3e248ed8216266a2cccf'/>

    const iconColor = '#000000';
    
    const aList = this.state.dataTypes.map(i => {
      return (
        <Link to={'/table/' + i} key={i}>
          <View style={homeStyle.inner}>
            <Text style={homeStyle.text}>{'  ' + i + 's'}</Text>
            <AntDesign name='edit' size={20} style={homeStyle.icon} color={iconColor} />
          </View>
        </Link>
      )
    });
    return (
      <View style={homeStyle.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={homeStyle.heading} >Contents</Text>
          <TouchableWithoutFeedback onPress={() => this.toggleSortDirection()}>
            <FontAwesome5 name={this.state.sortDirection} size={30} style={homeStyle.directionIcon} />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView showsVerticalScrollIndicator={true} alwaysBounceVertical={false} >
          {aList}
        </ScrollView>
      </View>
    )
  }
}
