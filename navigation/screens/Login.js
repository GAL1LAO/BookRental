import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React, {useState} from 'react';

export default function LoginScreen() {
    const serverUrl = 'http://'+ process.env.localIP +':3000'
    const [short, setShort] = useState('');
    const [password, setPassword] = useState('')
    async function login(){
        if(!password ||password === null){
            Alert.alert("password empty","Please enter your password")
            return
        }
        if(!short ||short === null){
            Alert.alert("short empty","Please enter your short")
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
            Alert.alert("Login unsuccessfull","The combination of short and password are not correct, please try again!")
            return
        }else{
            //TODO: log in and keep logged in
            Alert.alert("login succesfull","You have sucessfully been logged in")
        }
    }

    return (
        <View style={styles.container}>
        <Text>Login</Text>
        <TextInput defaultValue='short' onChangeText={short =>setShort(short)}/>
        <TextInput defaultValue='password' onChangeText={password =>setPassword(password)}/>
        <Button title='Login' onPress={async ()=>await login()}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});