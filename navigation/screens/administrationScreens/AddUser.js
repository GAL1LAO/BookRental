import { color } from '@rneui/base';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const serverUrl = 'http://'+ process.env.localIP +':3000'
export default function AddUserScreen({navigation}){
    const [short, setShort] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('')
    const [title, setTitle] = useState('');
    const [mailAddress, setMailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [day, setDay] = useState('')    
    const [month, setMonth] = useState('')    
    const [year, setYear] = useState('')    
    const [role, setRole] = useState('')

    const [filterOption, setFilterOption] = useState("All"); // Initialize with "All" as the default filter

    const filterData = () => {
      switch (filterOption) {
        case "adm":
            setRole("adm");
          break;
        case "use":
            setRole("use");

      }
    };
  
    useEffect(() => {
      filterData();
    }, [filterOption]);
    
      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(null);
      const [items, setItems] = useState([
        { label: "Administrator", value: "adm" },
        { label: "Benutzer", value: "use" },
      ]);
    async function addUser(){
        const userData = {
            short : short,
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
        navigation.navigate('Nutzer Administration')//to return back to userAdmin
    }
    return(
    <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.filter}>
                  <DropDownPicker 
                  style={{borderColor: "#ccc"}}
                  open={open}
                  value={role}
                  items={items}
                  placeholder="Rolle auswählen"
                  setOpen={setOpen}
                  setValue={setRole}
                  setItems={setItems}
                  onChangeValue={(item) => {setRole(item);}}
                  />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Kürzel:</Text>  
                </View>
                <View style={styles.column2}>
                  <TextInput placeholder='Kürzel' style={styles.input} value={short} onChangeText={short=>{setShort(short)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Anrede:</Text>  
                </View>
                <View style={styles.column2}>
                  <TextInput placeholder = 'Anrede' style={styles.input} value={title} onChangeText={title=>{setTitle(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Vorname:</Text>  
                </View>
                <View style={styles.column2}>
                <TextInput placeholder='Vorname' style={styles.input} value={firstName} onChangeText={title=>{setFirstName(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Nachname:</Text>  
                </View>
                <View style={styles.column2}>
                <TextInput placeholder='Nachname' style={styles.input} value={lastName} onChangeText={lastName=>{setLastName(lastName)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Geburtsdatum:</Text>  
                </View>
                <View style={styles.column2}>
                  <View style={styles.containerForDate}>
                  <TextInput
                      style={styles.inputDate}
                      placeholder="Tag"
                      underlineColorAndroid="transparent"
                      value = {day}
                      onChangeText={birthDate =>setDay(birthDate)}//TODO: change to date picker
                    />
                    <TextInput
                      style={styles.inputDate}
                      placeholder="Monat"
                      underlineColorAndroid="transparent"
                      value={month}
                      onChangeText={birthDate =>setMonth(birthDate)}//TODO: change to date picker
                    />
                    <TextInput
                      style={styles.inputDate}
                      placeholder="Jahr"
                      underlineColorAndroid="transparent"
                      value={year}
                      onChangeText={birthDate =>setYear(birthDate)}//TODO: change to date picker
                    />
                </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Email Adresse:</Text>
                </View>
                <View style={styles.column2}>
                <TextInput placeholder = "Email Adresse" style={styles.input} value={mailAddress} onChangeText={title=>{setMailAddress(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Telefonnummer</Text>
                </View>
                <View style={styles.column2}>
                <TextInput placeholder='Telefonnummer' style={styles.input} value={phoneNumber} onChangeText={title=>{setPhoneNumber(title)}}/>
                </View>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.fakeButtonGreen} type='submit' onPress={async() => await addUser()}>
                  <Text style={styles.subCaptionTextWhite}>
                      Bestätigen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fakeButtonRed} onPress={() => {navigation.navigate('Nutzer Administration')}}>
                  <Text style={styles.subCaptionTextWhite}>
                      Abbrechen
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#246EE9',
      paddingHorizontal: '5%',
      paddingTop: '5%'
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
      width: '100%',
      justifyContent: 'center'
    },
    fakeButtonGreen: {
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#3EB489',
      width: '50%',
      paddingLeft: 10,
      paddingTop: 10,
      marginRight:5,
    },
    fakeButtonRed: {
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'red',
      width: '50%',
      paddingLeft: 10,
      paddingTop: 10,
  
    },
    column1: {
      width: '37%',
      marginRight:5,
      marginLeft: -5,
    },
    column2: {
      width: '63%',
      marginRight:5,
    },
    titelAndText: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingTop: 10,
      alignItems: 'flex-start'
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
    },
    inputDate: {
      width: '33%',
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      color: '#424242',
    },
    input: {
      flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        color: '#424242',
    },
    inputContainer: {
      marginBottom: 10,
      borderRadius: 10,
      paddingLeft: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
    },
    containerForDate: {
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
    },
    filter: {
      zIndex: 1, 
      elevation: 2,
      marginVertical: 10,
      width: '100%',
    },
  });  