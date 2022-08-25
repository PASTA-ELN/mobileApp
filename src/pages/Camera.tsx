/**
 * @file Camera page that allows scanning of qr-codes
 */
import React, { Component } from 'react';
import { Barcode } from 'vision-camera-code-scanner';
import { Navigate } from 'react-router-native';

import CameraComponent from '../components/CameraComponent';
import { getDocs } from '../DBInteractions';



type Props = {

}
type State = {
  showData?: string
}

export default class Camera extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      showData: undefined
    };
  }

  onSucess = async (barcode:Barcode) => {
    const ID = await getDocs(barcode.rawValue!);
    this.setState({showData: ID});
    return Promise.resolve();
  }

  /*********************
   * The Render Method *
   *********************/  
  render() {
    if(this.state.showData){
      return <Navigate to={`/data/${this.state.showData}`}/>
    }
    return(
      <CameraComponent size='full' onSucessCallback={this.onSucess} successMessage='open Database Entry?'/>
    )
  }
}
