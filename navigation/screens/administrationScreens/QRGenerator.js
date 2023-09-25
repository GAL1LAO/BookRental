import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity  } from 'react-native';
import QRCode from 'react-native-qrcode-svg';


export default function QRGeneratorScreen({navigation, route}){
  const { itemId } = route.params;
  console.log()

  return (
  <View style={styles.container}>
    <Text style={styles.qrText}>QR Code</Text>
  <QRCode 
      id="qr-gen"
      value={itemId.toString()}
  />
  <TouchableOpacity 
      style={styles.button}
      onPress={() => { console.log('print')}}>
    <Text style={styles.save}>Save to Gallery</Text>
  </TouchableOpacity>
  </View>
  )
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
