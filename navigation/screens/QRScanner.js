import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import GreenButton from '../lib/Button';
import { UserContext } from '../../App';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {short} = useContext(UserContext);
  const serverUrl = 'http://'+ process.env.localIP +':3000'

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('Scanned data: ', data);
    console.log("Current user: ", short);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    //make API call to DB
    fetch(serverUrl + '/lendItem', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_short: short,
        id: data,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //navigate to success screen
    })
    .catch((error) => {
      console.error('Error:', error);
      //navigate to error screen
    });
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
