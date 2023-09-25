import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

export default function UserDetailScreen({ route }) {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('')
    const [title, setTitle] = useState('');
    const [mailAddress, setMailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('')     
    const [role, setRole] = useState('')
    let { short } = route.params;
    const [isLoading, setLoading] = useState(true);
    const url = 'http://' + process.env.localIP + ':3000';
  
  const getUser = async () => {
    try {
      console.log("fetching data???????");
      const response = await fetch(url + '/userByShort',  { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
          "short": short,
        })
      })
      const json = await response.json();
      console.log(json)
      setFirstName(json[0].firstName.toString())
      setLastName(json[0].lastName.toString())
      setTitle(json[0].title.toString())
      setMailAddress(json[0].mailAddress)
      setPhoneNumber(json[0].phoneNumber)
      setBirthDate(json[0].birthDate)
      setRole(json[0].role)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser()
  }, [])

  async function editUser(){
    const userData = {
        short : short,
        lastName : lastName,
        firstName : firstName,
        title : title,
        mailAddress : mailAddress,
        phoneNumber : phoneNumber,
        birthDate : dayjs(birthDate).format('YYYY-MM-DD'),
        role : role
    }
    for(const field in userData){
        if(userData[field] == null || !userData[field]){
            alert("Alle Felder müssen befüllt sein: Folgendes Feld ist leer" + field)
            return
        }
    }
    console.log(userData)
    await fetch(url + '/editUser',{
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(userData)
      })
      .then(response => response.json()) 
      .then(serverResponse => {
        console.log(serverResponse)
    })
    await getUser()//to get updated data
}

  return (
    <View style={styles.container}> 
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <ScrollView>
            <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Anrede:</Text>  
            </View>
            <View style={styles.column2}>
              <TextInput style={styles.text} value={title} onChangeText={title=>{setTitle(title)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Vorname:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={firstName} onChangeText={title=>{setFirstName(title)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Nachname:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={lastName} onChangeText={lastName=>{setLastName(lastName)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Geburtsdatum:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={birthDate} onChangeText={title=>{setBirthDate(title)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Email Adresse:</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={mailAddress} onChangeText={title=>{setMailAddress(title)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Telephonnummer</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={phoneNumber} onChangeText={title=>{setPhoneNumber(title)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Rolle</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={role} onChangeText={title=>{setRole(title)}}/>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.column1, styles.fakeButtonGreen]} type='submit' onPress={async() => await editUser()}>
              <Text style={styles.subCaptionTextWhite}>
                  Bestätigen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.column2, styles.fakeButtonRed]} onPress={() => {navigation.navigate('Item Administration')}}>
              <Text style={styles.subCaptionTextWhite}>
                  Abbrechen
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>)}
    </View>
  ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      captionContainer: {
        paddingLeft: 20,
        paddingTop: 10,
      },
      userDetails: {
        flexDirection: 'row',
        paddingLeft: '10%',
        paddingTop: 10,
        alignItems: 'flex-start'
      },
      buttonRow: {
        flexDirection: 'row',
        paddingTop: 10,
        marginLeft:'10%',
        alignItems: 'flex-start'
      },
      fakeButtonGreen: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#3EB489',
      },
      fakeButtonRed: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'red',
      },
      column1: {
        width: '45%',
        paddingLeft: 10,
        paddingTop: 10,
        marginRight:5,
        marginLeft: -5
      },
      column2: {
        color: 'red',
        width: '45%',
        paddingLeft: 10,
        paddingTop: 10,
        marginRight:5
      },
      titelAndText: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 10,
        alignItems: 'flex-start'
      },
      row1: {
      },
      row2: {

         paddingTop: 10,
      },
      centerItems: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      captionText: {
        fontWeight: 'bold',
        fontSize: 30,
      },
      subCaptionText: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      inputIcon: {
        padding: 10, 
        color: "#000",
    },
    fakeButtonImage: {
        alignItems: 'center',
        width: '100%',
        color: "#000",
      },
      line: {
        marginHorizontal: 10,
        marginVertical: 20,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      subCaptionTextWhite: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
      }
    });  
