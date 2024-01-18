import React from 'react'
import { Alert, Text, View } from 'react-native'
import { useNavigate } from 'react-router-native'

import CameraComponent from 'components/CameraComponent'
import { getDocumentFromId, getDocumentFromQRCode } from 'utils/DBInteractions'
import { BarCodeScannerResult } from 'expo-barcode-scanner'

//
// Component
//
export default function() {
  //
  // Hook calls
  //
  const navigate = useNavigate();

  //
  // Functions
  //
  async function handlebarcodeScanned(data: BarCodeScannerResult, retry: () => void){
    try {
      const id = await getDocumentFromQRCode(data.data);
      const document = await getDocumentFromId(id);
      const type = document["-type"][0];

      if (document) {
        Alert.alert(
          'Found Document', 
          `Document: ${id}`,
          [{ 
            text: 'Cancel',
            onPress: () => retry(),
            style: 'cancel'
          },{
            text: 'open',
            onPress: () => navigate(`/data/${id}?type=${type}`),
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
    }
    catch(e) { 
      console.log(e);
    }
  }

  //
  // Render
  //
  return (
    <CameraComponent 
      handleBarcodeScanned={handlebarcodeScanned}
    />
  )
}
