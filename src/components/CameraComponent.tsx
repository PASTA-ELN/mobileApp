import React from 'react';
import { BarCodeScanner, type BarCodeScannerResult } from 'expo-barcode-scanner'
import { Text, View } from 'react-native';

type IProps = {
  handleBarcodeScanned: (result: BarCodeScannerResult, retry: () => void) => void;
  bordered?: boolean;
}
export default function(props: IProps) {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [scanned, setScanned] = React.useState<boolean>(false);

  async function getBarCodeScannerPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  React.useEffect(() => {
    getBarCodeScannerPermissions()
  }, []);

  function handleBarCodeScanned(result: BarCodeScannerResult) {
    setScanned(true);
    props.handleBarcodeScanned(result, () => setScanned(false));
  }

  if (hasPermission === null) {
    return (
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-zinc-300 text-2xl'>
          Loading...
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-zinc-300 text-2xl'>
          no access to camera
        </Text>
      </View>
    )
  }

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

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      className='w-full h-full'
    />
  )
}
