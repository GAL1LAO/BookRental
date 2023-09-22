import { color } from '@rneui/base';
import dayjs from 'dayjs';

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const serverUrl = 'http://'+ process.env.localIP +':3000'
export default function AddUserScreen({navigation}){
    const [short, setShort] = useState('');
    const [password, setPassword] = useState('')
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('')
    const [title, setTitle] = useState('');
    const [mailAddress, setMailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [day, setDay] = useState('')    
    const [month, setMonth] = useState('')    
    const [year, setYear] = useState('')    
    const [role, setRole] = useState('')
    async function addUser(){
        const userData = {
            short : short,
            password : password,
            lastName : lastName,
            firstName : firstName,
            title : title,
            mailAddress : mailAddress,
            phoneNumber : phoneNumber,
            birthDate : dayjs(year+"-"+month+'-'+day).format('YYYY-MM-DD'),
            role : role
        }
        for(const field in userData){
            if(userData[field] == null || !userData[field]){
                alert("Alle Felder müssen befüllt sein: Folgendes Feld ist leer" + field)
                return
            }
        }
        console.log(userData)
        let result
        await fetch(serverUrl + '/addUser',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(userData)
          })
          .then(response => response.json()) 
          .then(serverResponse => {
            console.log(serverResponse)
            result = serverResponse
        })
        if(result.existingUser){
            alert("Benutzer existiert bereits")
            return
        }
        //TODO: send Email
        dispatch({type : 'Home'})//to return back at the end*/
    }
    return(
        <View style={styles.container}>
           
            <Text>Add user</Text>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Kürzel"
                    underlineColorAndroid="transparent"
                    onChangeText={short =>setShort(short)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Anrede"
                    underlineColorAndroid="transparent"
                    onChangeText={title =>setTitle(title)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Vorname"
                    underlineColorAndroid="transparent"
                    onChangeText={firstName =>setFirstName(firstName)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Nachname"
                    underlineColorAndroid="transparent"
                    onChangeText={lastName =>setLastName(lastName)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    onChangeText={mailAddress =>setMailAddress(mailAddress)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Telefonnummer"
                    underlineColorAndroid="transparent"
                    onChangeText={phoneNumber =>setPhoneNumber(phoneNumber)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Tag"
                    underlineColorAndroid="transparent"
                    onChangeText={birthDate =>setDay(birthDate)}//TODO: change to date picker
                />
                <TextInput
                style={styles.input}
                placeholder="Monat"
                underlineColorAndroid="transparent"
                onChangeText={birthDate =>setMonth(birthDate)}//TODO: change to date picker
                />
                <TextInput
                style={styles.input}
                placeholder="Jahr"
                underlineColorAndroid="transparent"
                onChangeText={birthDate =>setYear(birthDate)}//TODO: change to date picker
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Rolle"
                    underlineColorAndroid="transparent"
                    onChangeText={role =>setRole(role)} //TODOD: change to role picker
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    underlineColorAndroid="transparent"
                    secureTextEntry
                    onChangeText={password =>setPassword(password)}
                />
            </View>
            <View style={styles.buttonAlignment}>
            <TouchableOpacity style={styles.column1} type='submit' onPress={async() => await addUser()}>
                <Text style={styles.subCaptionTextWhite}>
                    Hinzufügen
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column2} onPress={() => {navigation.navigate('UserAdministration')}}>
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