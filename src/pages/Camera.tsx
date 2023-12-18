import React from 'react'
import { Alert, Text, View } from 'react-native'

import CameraComponent from 'components/CameraComponent'

type IProps = {

}
export default function(props: IProps) {
  return (
    <CameraComponent 
      handleBarcodeScanned={(data, retry) => {
        Alert.alert(
          "Barcode Scanned",
          `Data: ${data.data}`,
          [
            {
              text: "Cancel",
              onPress: () => retry(),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      }}
    />
  )
}
