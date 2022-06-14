import React, { Component } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-svg';
import { Camera, CameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { cameraStyle, SCREEN_HEIGHT, SCREEN_WIDTH } from '../style';

type Props = {
  onSucessCallback: (data: string) => Promise<void>;
  size: 'full' | 'small';
  successMessage: string;
}
type State = {
  device?: CameraDevice;
  isActive: boolean;
  result: string;
  success: boolean;
}

export default class CameraComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      device: undefined,
      isActive: false,
      result: '',
      success: false
    }
  }

  InitCamera = async() => {
    if(this.state.device)
      return;

    if(await Camera.getCameraPermissionStatus() !== 'authorized'){
      const permissionStatus = await Camera.requestCameraPermission();
      if(permissionStatus !== 'authorized'){
        Alert.alert('Warning','Allow access to the Camera in the Device Settings');
        return;
      }
    }

    const devices = await Camera.getAvailableCameraDevices();
    const backDevice = devices.filter(element => element.position === 'back')[0];
    this.setState({device: backDevice})
  }
  toggleTorch = () => {
    
  }
  success = () => {

  }

  /************************************************************************************************
   * React Methods                                                                                *
   ************************************************************************************************/
  componentDidMount(){
    this.InitCamera();
  }
  render() {
    if(!this.state.device){
      return <Text>Loading Camera...</Text>
    }
    const _height = this.props.size === 'small' ? SCREEN_WIDTH : SCREEN_HEIGHT;
    return (
      <View>
        <Camera 
          device={this.state.device}
          isActive={this.state.isActive}
          style={cameraStyle.camera}
        />
        <TouchableOpacity
            style={cameraStyle.torch}
            onPress={() => this.toggleTorch()}>
            <Image
              style={cameraStyle.torchIcon}
              source={require('../public/torch.png')}
            />
          </TouchableOpacity>
      </View>
    )
  }
}
