import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default function LoginScreen() {
    const serverUrl = 'http://'+ process.env.localIP +':3000'
    const [short, setShort] = useState('');
    const [password, setPassword] = useState('')
    async function login(){
        if(!password ||password === null){
            Alert.alert("Passwort leer.","Bitte geben sie ein Passwort ein.")
            return
        }
        if(!short ||short === null){
            Alert.alert("Benutzername leer.","Bitte geben sie ihren Benutzernamen ein.")
            return
        }
        let result
        await fetch(serverUrl + '/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ 
                "short": short,
                "password": password
            })
          })
          .then(response => response.json()) 
          .then(serverResponse => {
            console.log(serverResponse)
            result = serverResponse
        })
        if(result === null || result.length === 0){
            Alert.alert("Login fehlgeschlagen","Falscher Benutzername oder falsches Passwort.")
            return
        }else{
            //TODO: log in and keep logged in
            Alert.alert("Login erfolgreich")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Benutzername"
                    underlineColorAndroid="transparent"
                    onChangeText={short =>setShort(short)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons style={styles.inputIcon} name="lock-closed" size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    underlineColorAndroid="transparent"
                    onChangeText={password =>setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.fakeButton} onPress={async ()=>await login()}>
                <Text style={styles.subCaptionTextWhite}>
                    Einloggen
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
});