import { StyleSheet } from "react-native";

import { SCREEN_HEIGHT } from "../consts";

/****************************
 * Stylesheet for Camera.js *
 ****************************/
 export const cameraStyle = StyleSheet.create({
  torch: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    left: 40,
    bottom: 40,
    borderColor: 'white',
    borderRadius: 50
  },
  torchIcon: {
    marginBottom: 'auto',
    marginTop: 'auto',
    height: '80%',
    width: 50,
    resizeMode: 'contain'
  },
  camera: {
    height: SCREEN_HEIGHT * 0.90
  }
});