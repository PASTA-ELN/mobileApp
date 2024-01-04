import React from 'react';
import { BarCodeScanner, type BarCodeScannerResult } from 'expo-barcode-scanner'
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//
// Component Props
//
type IProps = {
  handleBarcodeScanned: (result: BarCodeScannerResult, retry: () => void) => void;
  bordered?: boolean;
  exit?: () => void;
}
//
// Component
//
export default function(props: IProps) {
  //
  // State
  //
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [scanned, setScanned] = React.useState<boolean>(false);

  //
  // Functions
  //
  async function getBarCodeScannerPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }
  function handleBarCodeScanned(result: BarCodeScannerResult) {
    setScanned(true);
    props.handleBarcodeScanned(result, () => setScanned(false));
  }
  //
  // Effects
  //
  React.useEffect(() => {
    getBarCodeScannerPermissions()
  }, []);
  //
  // Render loading
  //
  if (hasPermission === null) {
    return (
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-zinc-300 text-2xl'>
          Loading...
        </Text>
      </View>
    );
  }
  //
  // Render invalid permissions
  //
  if (hasPermission === false) {
    return (
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-zinc-300 text-2xl'>
          no access to camera
        </Text>
      </View>
    )
  }
  //
  // Render bordered Camera View (small)
  //
  if(props.bordered)
    return (
      <View className='w-full h-full relative'>
        <View className='w-full h-full border-8 border-gray-900 rounded-3xl absolute top-0 left-0 z-10'/>
        <View className='w-full h-full p-2'>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            className='w-full h-full'
          />
        </View>
      </View>
    )
  //
  // Render Camera View (full)
  //
  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      className='w-full h-full'
    >
      {props.exit && <TouchableOpacity onPress={props.exit} className='w-full h-fit p-4 flex flex-row items-center justify-end'>
        <View className='bg-gray-700 p-2 flex flex-row items-center justify-center rounded-xl'>
          <Text className='text-blue-500'>Exit  </Text>
          <Ionicons name="exit-sharp" size={30} color="rgb(59,130,246)"/>
        </View>
      </TouchableOpacity>}
    </BarCodeScanner>
  )
}
