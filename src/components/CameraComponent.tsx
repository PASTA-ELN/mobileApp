import React from 'react';
import { BarCodeScanner, type BarCodeScannerResult } from 'expo-barcode-scanner'
import { Alert, Text, View } from 'react-native';

type IProps = {
  onSuccess: (result: string) => void;
}
export default function(props: IProps) {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [scanned, setScanned] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  function handleBarCodeScanned(result: BarCodeScannerResult) {
    setScanned(true);
    Alert.alert(
      'Scan successful!',
      JSON.stringify(result),
      [
        { text: 'retry', onPress: () => setScanned(false) },
        { text: 'Use Now', onPress: () => props.onSuccess(result.data) },
      ]
    )
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{}}
      />
    </View>
  )
}