/**
 * @file Data of the document is shown
 */
import React, { Component } from 'react';
import { Button, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { db } from '../DBInteractions';
import Ion from 'react-native-vector-icons/Ionicons';
import Fa from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import Dialog from 'react-native-dialog';
import { Params, useParams, useNavigate, NavigateFunction } from 'react-router-native';

import CameraComponent from '../components/CameraComponent';
import Details from '../components/Details';
import { dataStyle, mainColor } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  params: Params;
  navigate: NavigateFunction;
}

type State = {
  data: any;
  fileEnding: string;
  goBackText: string;
  docType: string;
  path: string;
  scanQR: boolean;
  showDetails?: string;
  showAttachments: boolean;
  showIssues: boolean;
  dialogValue: string;
  openAlert: boolean;
  switchValue: boolean;
}

class Data extends Component<Props, State> {
  skipKeys = ['_id', '_rev', 'branch', 'client'];

  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      fileEnding: '',
      goBackText: '',
      docType: '',
      path: '',
      scanQR: false,
      showAttachments: false,
      showIssues: false,
      //dialogBox attributes
      dialogValue: '',
      openAlert: false,
      switchValue: false
    };
  }

  componentDidMount() {
    //docID have a letter, a '-' and 32 number-letters
    this.fetchData(this.props.params.id!)
      .then(res => {
        //@ts-ignore -_-
        this.setState(res);
      })
      .catch((error) => { Alert.alert('Error', error) });
  }

  async fetchData(id: string){
    return new Promise(async function(resolve, reject){
      setTimeout(()=>reject('timeout'), 10000);
      const res = await db?.get(id);
      if(!res){
        reject('failed to fetch data');
        return;
      }
      const fileNameSplit: string[] = res.data['name'].split('.');
        if (!('attachment' in Object.keys(res.data))) {
          res.data['attachment'] = {}
        }
        const docType = res.data['-type'][0];
        resolve({ 
          data: res.data,
          path: '/' + id + '/',
          fileEnding: fileNameSplit[fileNameSplit.length-1],
          goBackText: docType.substring(0,1).toUpperCase() + docType.substring(1)+'s',
          docType: docType
        });
    })
  }

  postQRUpdate = (newQRCode: string) => {
    if (!this.state.data['qrCode']) {
      this.state.data['qrCode'] = [];
    } else if (this.state.data['qrCode'].constructor != [].constructor) {
      const tmp = this.state.data['qrCode'];
      this.state.data['qrCode'] = [tmp];
    }
    this.state.data['qrCode'].push(newQRCode);
    db?.put(this.state.path, this.state.data).then((res) => {
      console.log('Update successful with ...');
      this.setState({ scanQR: false })
    }).catch((error) => {
      console.log('updateQR: Error encountered: ' + this.state.path);
      Alert.alert('Error', error);
    });
  }

  //store issues as empty attachments
  //open true
  addIssue = async (newIssue: string, open: boolean) => {
    if (!this.state.data['issues']) {
      this.state.data['issues'] = [];
    }
    const date = new Date();
    this.state.data['issues'].push({ value: newIssue, user: '', date: date, open: open, comment: '' });
    db?.put(this.state.path, this.state.data).then((res) => {
      this.setState({ openAlert: false, dialogValue: '' })
    }).catch((error) => {
      console.log('addIssue: Error encountered: ' + this.state.path);
      console.log(error);
    });
  }

  showQR = () => {
    return (
      <View style={dataStyle.container}>
        <CameraComponent
          size='small'
          onSucessCallback={async (data) => this.postQRUpdate(data.rawValue!)}
          successMessage=''
        />
        <Button title='cancel' onPress={() => this.setState({ scanQR: false })} />
      </View>
    )
  }

  toggleSwitch() {
    this.setState({ switchValue: !this.state.switchValue });
  }
  post() {
    if (this.state.dialogValue == '')
      this.setState({ dialogValue: '', switchValue: false, openAlert: false });

    this.addIssue(this.state.dialogValue, this.state.switchValue);
    this.setState({ dialogValue: '', switchValue: false, openAlert: false });
  }

  openAlert = () => {
    return (
      <Dialog.Container visible={this.state.openAlert}>
        <Dialog.Title>add new issue</Dialog.Title>
        <Dialog.Switch label='open (very important) ?' value={this.state.switchValue} onChange={() => this.toggleSwitch()} />
        <Dialog.Input
          value={this.state.dialogValue}
          onChangeText={(value) => this.setState({ dialogValue: value })}
        />
        <Dialog.Button label='cancel' onPress={() => this.setState({ openAlert: false })} />
        <Dialog.Button label='post' onPress={() => this.post()} />
      </Dialog.Container>
    )
  }

  /** convert key-value pairs into nice list
   * @returns <View>LIST<View>
  */
  renderData = () => {
    var image;    
    if ('image' in this.state.data) {
      if (this.state.data['image'].substring(0, 14) == 'data:image/jpg') {
        image = <Image source={{ uri: this.state.data['image'] }} style={dataStyle.image} />;
      } else if (this.state.data['image'].substring(0, 4) == '<?xm') {
        image = <SvgXml xml={this.state.data['image']} width='100%' style={dataStyle.svg}/>
      }
    } else {
      image = null;
    }

    //TODO ontology.map
    /* Render document into key:value pair; skip items that should be skiped   */
    const listPairs = Object.keys(this.state.data).map((key, index) => {
      if (this.skipKeys.indexOf(key) > -1)
        return null;


      //different method for displaying images
      if (key == 'image' || key == '-client' || key == '-branch' || key == '-user')
        return null

      //markdown content
      if (key == 'content' && this.state.fileEnding === 'md')
        return null;

      if (key == 'issues') {
        const values = Object.keys(this.state.data['issues']).map((key) => {
          const textColor = this.state.data['issues'][key].open ? 'red' : 'black';
          return <Text key={'list' + key} style={{ color: textColor }}>{this.state.data['issues'][key].value}</Text>
        })
        return (
          <TouchableOpacity key={'list' + key + 'C'} style={dataStyle.basicEntry} onPress={() => this.setState({ showDetails: 'issues' })}>
            {values}
          </TouchableOpacity>
        )
      }

      //attachments
      if(key == '-attachment'){
        AsyncStorage.getItem('ontology').then(res => {
          if(this.state.docType === undefined)
            return;
          const docType = JSON.parse(res!)[this.state.docType];
          console.log(Object.keys(docType));
        })
        return;
      }

      //JSON objects
      if (typeof this.state.data[key].constructor === 'object') {
        var tmp = Object.keys(this.state.data[key]).map((key1) => {
          return key1 + ':' + this.state.data[key][key1];
        });
        if (!tmp[0]) return null;
        tmp = tmp.length > 128 ? tmp.slice(0, 128) : tmp;
        return (
          <View key={'list' + key + 'C'} style={dataStyle.basicEntry}>
            <Text key={'list' + key}>{key + ':' + tmp}</Text>
          </View>
        );
      }

      //Empty Arrays
      if (Array.isArray(this.state.data[key])){
        if(!this.state.data[key]){
          return null
        }
        this.state.data[key].forEach((element:any) => {
          
        })
      }

      //everything else
      return (
        <View key={'list' + key + 'C'} style={dataStyle.basicEntry}>
          <Text key={'list' + key}>{key + ': ' + this.state.data[key]}</Text>
        </View>
      );
    });
    return (
      <View>
        {image}
        {listPairs}
      </View>
    )
  }

  /*********************
   * The Render Method *
   *********************/
  render() {
    if (!this.state.data)
      return <Text>Loading...</Text>

    if (this.state.scanQR)
      return this.showQR();

    if (this.state.showDetails) {
      return (
        <Details name={this.state.showDetails} goBack={() => this.setState({ showDetails: '' })} />
      )
    }
    if (this.state.showAttachments){

    }
    if (this.state.showIssues){
      
    }

    return (
      <View style={dataStyle.container}>
        {this.openAlert()}
        <View style={dataStyle.header}>
          <View style={dataStyle.leftContainer}>
            <TouchableOpacity style={dataStyle.backButtonContainer} onPress={() => this.props.navigate(-1)}>
              <Ion style={dataStyle.backIcon} name='ios-arrow-back-sharp' size={30} color={mainColor}/>
              <Text style={dataStyle.goBackText}>{this.state.goBackText}</Text>
            </TouchableOpacity>
          </View>
          <View style={dataStyle.rightContainer}>
            <TouchableOpacity style={dataStyle.ButtonContainer} onPress={() => this.setState({ openAlert: true })}>
              <Fa style={dataStyle.icon} name='comment-o' size={20} />
              <Text style={dataStyle.text}>add issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dataStyle.ButtonContainer} onPress={() => this.setState({ scanQR: true })}>
              <Ant style={dataStyle.icon} name='qrcode' size={20} />
              <Text style={dataStyle.text}>add QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView alwaysBounceVertical={false} style={dataStyle.dataField}>
          {this.renderData()}
        </ScrollView>
      </View>
    )
  }
}

export default function withRouter(){
  return(
    <Data params={useParams()} navigate={useNavigate()}/>
  )
}
