import React from 'react'
import { Alert, Text, View } from 'react-native'

import CameraComponent from 'components/CameraComponent'
import { getDocumentFromQRCode } from 'utils/DBInteractions'

type IProps = {

}
export default function(props: IProps) {
  return (
    <CameraComponent 
      handleBarcodeScanned={async (data, retry) => {

        const document = await getDocumentFromQRCode(data.data);

        if (document) {
          Alert.alert(
            'Found Document', 
            `Document: ${document}`,
            [{ 
              text: 'Cancel',
              onPress: () => retry(),
              style: 'cancel'
            },{
              text: 'open',
              onPress: () => {},
            }]
          );
          return;
        }

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
