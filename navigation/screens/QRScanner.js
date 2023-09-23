import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GreenButton from '../lib/Button';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const serverUrl = 'http://'+ process.env.localIP +':3000'

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    //make API call to DB
    
    //if successful, navigate to success screen
    //else navigate to error screen

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="w-full h-full"
      />

      {scanned && <GreenButton title={'Scannen'} onPress={() => setScanned(false)} />}
    </View>
  );
}
