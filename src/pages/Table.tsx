/**
 * @file Page that shows the table
 */
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-native';

import { db } from '../DBInteractions';
import { misc, tableStyle } from '../style';

type Props = {
  params: Params;
  navigate: NavigateFunction;
};

type State = {
  table: {value: string[], id: string}[];
  docLabel: string;
  showData: string;
  headings: [
    {name: string},
    {name: string},
    {name: string}
  ];
  coloums: [
    'sort-amount-up'|'sort-amount-down'|'bars',
    'sort-amount-up'|'sort-amount-down'|'bars',
    'sort-amount-up'|'sort-amount-down'|'bars'
  ];
  fileEnding: string;
  goBack: boolean;
} 

class Table extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      table: [],
      docLabel: '...Loading',
      showData: '',
      headings: [{ name: '1' }, { name: '2' }, { name: '3' }],
      coloums: ['bars', 'bars', 'bars'],
      fileEnding: '',
      goBack: false
    };
  }
  
  async componentDidMount() {
    const docLabel = this.props.params.type![0].toUpperCase() + this.props.params.type!.slice(1) + 's';
    //get headings for table
    var headings: typeof this.state.headings = [{name:'1'},{name:'2'},{name:'3'}];
    await db?.get('/-ontology-')
      .then((response) => {
        headings = response.data[this.props.params.type!].map((item: {name:string}) => {
          if (item.name)
            return { name: item.name[0].toUpperCase() + item.name.slice(1) };
          return { name: '' };
        });
      })
      .catch((error) => {
        Alert.alert('Error',error);
      });
    //get data for table
    var data:{id:string, value:string[]}[] = [];
    await db?.get('_design/viewDocType/_view/' + this.props.params.type)
      .then(response => {
        data = response.data.rows;
      })
      .catch((error) => {
        data = [{id: 'error', value:['Error']}];
        Alert.alert('Error occured!', error.message, [
          {
            text: 'dismiss',
            onPress: () => this.setState({ goBack: true })
          }
        ])
      });

    //single setState for only one reload
    this.setState({
      table: data,
      docLabel: docLabel,
      headings: headings
    });
  }

  toggleSortDirection(sortingColoum: number) {
    var newCols: typeof this.state.coloums = ['bars', 'bars', 'bars'];
    if (this.state.coloums[sortingColoum] !== 'sort-amount-down') {
      newCols[sortingColoum] = 'sort-amount-down';
      this.setState({ coloums: newCols });
      this.state.table.sort(function (a, b) {
        return a.value[sortingColoum].toUpperCase() > b.value[sortingColoum].toUpperCase() ? 1 : -1;
      });
    } else {
      newCols[sortingColoum] = 'sort-amount-up';
      this.setState({ coloums: newCols });
      this.state.table.sort(function (a, b) {
        return a.value[sortingColoum].toUpperCase() < b.value[sortingColoum].toUpperCase() ? 1 : -1;
      })
    }
  }

  /*********************
   * The render method *
   *********************/
  render() {
    //if waiting for data from DB
    if (!this.state.table[0])
      return (<Text>Loading ... </Text>);

    //if error occured while getting data from db
    if (this.state.table[0].value[0] == 'Error')
      return (<Text>Error...</Text>)

    //creating Table rows
    const styles = [tableStyle.row, tableStyle.row1]
    const rows = this.state.table.map((item, index) => {
      return (
        <TouchableOpacity style={styles[index % 2]} key={'touch_'+index+Math.random()} onPress={() => this.props.navigate(`/data/${item.id}`)}>
          {item.value.slice(0, 3).map((subitem:string) => {
            if (subitem)
              return (
                <View key={'view_'+index+Math.random()} style={tableStyle.cell}>
                  <Text key={'text_'+index+Math.random()}>{subitem.length > 32 ? subitem.slice(subitem.length - 32) : subitem}</Text>
                </View>
              )
            return (
              <View key={'empty' + Math.random()} style={tableStyle.cell} >
                <Text key={'text_'+index+Math.random()}>empty</Text>
              </View>)
          })}
        </TouchableOpacity>
      );
    });

    //Main HTML structure
    return (
      <View style={tableStyle.container}>
        <Text style={misc.heading}>{this.state.docLabel}</Text>
        <View style={tableStyle.header}>
          <View style={tableStyle.heading}>
            <TouchableOpacity onPress={() => this.toggleSortDirection(0)} style={tableStyle.sorter}>
              <View>
                <Text style={tableStyle.headingText}>{this.state.headings[0].name}</Text>
                <FontAwesome5 name={this.state.coloums[0]} size={20} style={tableStyle.sortIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tableStyle.heading}>
            <TouchableOpacity onPress={() => this.toggleSortDirection(1)} style={tableStyle.sorter}>
              <View>
                <Text style={tableStyle.headingText}>{this.state.headings[1].name}</Text>
                <FontAwesome5 name={this.state.coloums[1]} size={20} style={tableStyle.sortIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tableStyle.heading}>
            <TouchableOpacity onPress={() => this.toggleSortDirection(2)} style={tableStyle.sorter}>
              <View>
                <Text style={tableStyle.headingText}>{this.state.headings[2].name}</Text>
                <FontAwesome5 name={this.state.coloums[2]} size={20} style={tableStyle.sortIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={true} alwaysBounceVertical={false} style={tableStyle.container}>
          <View style={tableStyle.outer}>
            {rows}
          </View>
        </ScrollView>
      </View>
    )
  }
}

//wrapper to get access to url parms... because native router is sh!t

export default function withLocation(){
  return(
    <Table params={useParams()} navigate={useNavigate()}/>
  )
}
