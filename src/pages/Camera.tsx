/**
 * @file Camera page that allows scanning of qr-codes
 */
import React, { Component } from 'react';
import CameraComponent from '../components/CameraComponent';


import { CameraProps } from '../types/routes';

type Props = CameraProps & {

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

  onSucess = async (data:string) => {
    this.setState({showData: data});
    return Promise.resolve();
  }

  /*********************
   * The Render Method *
   *********************/  
  render() {
    return(
      <CameraComponent size='full' onSucessCallback={this.onSucess} successMessage='open Database Entry?'/>
    )
  }
}
