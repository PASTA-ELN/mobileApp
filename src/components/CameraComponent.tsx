import React, { Component, useState } from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Text } from 'react-native-svg';
import { Camera, CameraDevice, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Barcode, BarcodeFormat, scanBarcodes, useScanBarcodes, } from 'vision-camera-code-scanner';

import { cameraStyle, SCREEN_HEIGHT, SCREEN_WIDTH } from '../style';

type Props = {
  onSucessCallback: (data: Barcode) => Promise<void>;
  size: 'full' | 'small';
  successMessage: string;
}

export default function CameraComponent({
  onSucessCallback,
  size,
  successMessage
}: Props) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [torch, setTorch] = useState<'off'|'on'>();
  const [lock, setLock] = useState(false);
  const [barcode, setBarcode] = useState<Barcode>();
  const devices = useCameraDevices();
  const device = devices.back;


  const frameProcessor = useFrameProcessor((frame) => {
      'worklet';
      const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
      runOnJS(setBarcode)(detectedBarcodes[0]);
    }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  
  const toggleTorch = () => {
    if(torch === 'on'){
      setTorch('off');
    } else {
      setTorch('on');
    }
  }

  if(barcode && !lock){
    setLock(true);
    Alert.alert(
      successMessage,
      `Read: ${barcode.displayValue}`,
      [
        {
          text: 'OK',
          onPress:() => {
            setLock(false);
            onSucessCallback(barcode);
          }
        }
      ]);
  }
  
  const camera = size === 'full'? {
    height: SCREEN_HEIGHT
  }:{
    height: SCREEN_WIDTH,
    marginBottom: 'auto',
    marginTop: 'auto'
  };
    
  return device != null && hasPermission ?
  (
    <View>
      <Camera 
        device={device}
        isActive={true}
        style={camera}
        torch={torch}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      <TouchableOpacity
          style={cameraStyle.torch}
          onPress={() => toggleTorch()}>
          <Image
            style={cameraStyle.torchIcon}
            source={require('../public/torch.png')}
          />
        </TouchableOpacity>
    </View>
  ) : 
  <Text>Error</Text>
}