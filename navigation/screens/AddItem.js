import { color } from '@rneui/base';
import dayjs from 'dayjs';

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const serverUrl = 'http://'+ process.env.localIP +':3000'
export default function AddItemScreen({navigation}){
    const [type, setType] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('')
    const [damages, setDamages] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('')
    const [storageSite, setStorageSite] = useState('');
    async function addItem(){
        const itemData = {
            type : type,
            name : name,
            description : description,
            image : image,
            damages : damages,
            dateOfPurchase : dateOfPurchase,
            storageSite : storageSite,
        }
        for(const field in itemData){
            if(field != damages && (itemData[field] == null || !itemData[field])){
                alert("Alle Felder müssen befüllt sein: Folgendes Feld ist leer: " + field)
                return
            }
        }
        console.log(itemData)
        await fetch(serverUrl + '/addItem',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(itemData)
          })
          .then(response => response.json()) 
          .then(serverResponse => {
            console.log(serverResponse)
        })
        dispatch({type : 'Home'})//to return back at the end*/
    }
    return(
        <View style={styles.container}>
           
            <Text>Add item</Text>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Typ"
                    underlineColorAndroid="transparent"
                    onChangeText={type =>setType(type)} //TODO: Selection
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    underlineColorAndroid="transparent"
                    onChangeText={name =>setName(name)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Beschreibung"
                    underlineColorAndroid="transparent"
                    onChangeText={description =>setDescription(description)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Bild"
                    underlineColorAndroid="transparent"
                    onChangeText={image =>setImage(image)}//TODO: addition of real images
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Schäden"
                    underlineColorAndroid="transparent"
                    onChangeText={damages =>setDamages(damages)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Kaufsdatum"
                    underlineColorAndroid="transparent"
                    onChangeText={dateOfPurchase =>setDateOfPurchase(dateOfPurchase)}//TODO: change to date picker
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Lagerort"
                    underlineColorAndroid="transparent"
                    onChangeText={storageSite =>setStorageSite(storageSite)}
                />
            </View>
            <View style={styles.buttonAlignment}>
            <TouchableOpacity style={styles.column1} type='submit' onPress={async() => await addItem()}>
                <Text style={styles.subCaptionTextWhite}>
                    Hinzufügen
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column2} onPress={() => {navigation.navigate('Admin')}}>
                <Text style={styles.subCaptionTextWhite}>
                    Abbrechen
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
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