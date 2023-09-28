import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';
import { captureRef } from 'react-native-view-shot';

export default function QRGeneratorScreen({ navigation, route }) {
  const { itemId } = route.params;
  const qrRef = useRef(null);

  const printQRCode = async () => {
    try {
      // Capture the QR code as an image
      const uri = await captureRef(qrRef, {
        format: 'png',
        quality: 1,
      });

      // Print the captured image
      await Print.printAsync({
        uri
      });
    } catch (error) {
      console.error("Failed to print QR code:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.qrText}>QR Code</Text>
      <View ref={qrRef}>
        <QRCode id="qr-gen" value={itemId.toString()} />
      </View>
      <TouchableOpacity style={styles.button} onPress={printQRCode}>
        <Text style={styles.save}>drucken</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    borderRadius:30,
    padding:15,
    position: 'absolute',
    bottom: 0,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    backgroundColor:"#273746"
  },

  qrText: {
    top: -20,
    color: '#000',
    fontSize:18,
    fontWeight: 'bold'
  },

  save: {
    color: '#fff',
    fontSize:16,
    textTransform: 'capitalize'
 }
})
