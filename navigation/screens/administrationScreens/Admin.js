
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

  export default function AdminScreen({navigation}){

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.fakeButton} onPress={() => {navigation.navigate('Item Administration')}}>
            <Text style={styles.subCaptionTextWhite}>
                Itemverwaltung
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fakeButton} onPress={() => {navigation.navigate('Nutzer Administration')}}>
            <Text style={styles.subCaptionTextWhite}>
                Nutzerverwaltung
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fakeButton} onPress={() => {navigation.navigate('Schäden')}}>
            <Text style={styles.subCaptionTextWhite}>
                Schäden
            </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#246EE9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        
    },
    fakeButton: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#3EB489',
        padding: 10
    },
    fakeButtonCancel: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red',
        padding: 10
    },
    subCaptionTextWhite: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },
    inputContainer: {
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    buttonAlignment: { 
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  column1: {
    width: '50%',
    padding: 10,
    marginTop: 20,
    marginRight: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#3EB489',
        padding: 10
  },
  column2: {
    width: '50%',
    padding: 10, 
    marginTop: 20,
    marginLeft: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10
  },
});