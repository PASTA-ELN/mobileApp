import React, { Component } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { cameraStyle, SCREEN_HEIGHT, SCREEN_WIDTH } from '../style';

type Props = {
  onSucessCallback: (data: string) => Promise<void>;
  size: 'full' | 'small';
  successMessage: string;
}

type State = {
  reactivate: boolean;
  torch: "torch" | "on" | "off" | "auto";
  result: string;
  success: boolean;
}

export default class CameraComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reactivate: true,
      torch: 'off',
      result: '',
      success: false
    }
  }

  /**
   * togling between flashMode 0 (off) and torch (on)
   */
  toggleTorch() {
    if (this.state.torch === 'off') {
      this.setState({ torch: 'torch' });
    } else {
      this.setState({ torch: 'off' });
    }
  }

  /**
   * gets called by QR-Code reader when QR-Code is detected
   */

  render() {
    const _height = this.props.size === 'small' ? SCREEN_WIDTH : SCREEN_HEIGHT;
    return (
      <View>
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