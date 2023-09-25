import dayjs from 'dayjs';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const serverUrl = 'http://'+ process.env.localIP +':3000'
export default function AddItemScreen({navigation}){
    const [type, setType] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [damages, setDamages] = useState('');
    const [storageSite, setStorageSite] = useState('');
    const [day, setDay] = useState('')    
    const [month, setMonth] = useState('')    
    const [year, setYear] = useState('')   

    const [filterOption, setFilterOption] = useState("All"); // Initialize with "All" as the default filter

    const filterData = () => {
      switch (filterOption) {
        case "Kiste":
            setType("Kiste");
          break;
        case "Buch":
            setType("Buch");

      }
    };
  
    useEffect(() => {
      filterData();
    }, [filterOption]);
    
      const [open, setOpen] = useState(false);
      const [items, setItems] = useState([
        { label: "Kiste", value: "Kiste" },
        { label: "Buch", value: "Buch" },
      ]);

    async function addItem(){
        const itemData = {
            type : type,
            name : name,
            description : description,
            damages : damages,
            dateOfPurchase : dayjs(year+"-"+month+'-'+day).format('YYYY-MM-DD'),
            storageSite : storageSite,
        }
        for(const field in itemData){
            if(field != 'damages' && (itemData[field] == null || !itemData[field])){
                alert("Alle Felder müssen befüllt sein: Folgendes Feld ist leer: " + field)
                return
            }
        }
        itemData.dateOfPurchase = dayjs(itemData.dateOfPurchase).format('YYYY-DD-MM')
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
        <ScrollView>
          <View style={styles.filter}>
            <DropDownPicker 
            style={{borderColor: "#ccc"}}
            open={open}
            value={type}
            items={items}
            placeholder="Filter auswählen"
            setOpen={setOpen}
            setValue={setType}
            setItems={setItems}
            onChangeValue={(item) => {setType(item);}}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.column1}>
              <Text style={styles.text}>Name:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.input} value={name} onChangeText={name=>{setName(name)}}/>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.column1}>
              <Text style={styles.text}>Beschreibung:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.input} value={description} onChangeText={description=>{setDescription(description)}}/>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.column1}>
              <Text style={styles.text}>Anschaffungsdatum:</Text>  
            </View>
            <View style={styles.column2}>
              <View style={styles.containerForDate}>
              <TextInput
                style={styles.input}
                placeholder="Tag"
                underlineColorAndroid="transparent"
                value = {day}
                onChangeText={day =>setDay(day)}//TODO: change to date picker
              />
              <TextInput
                style={styles.input}
                placeholder="Monat"
                underlineColorAndroid="transparent"
                value={month}
                onChangeText={month =>setMonth(month)}//TODO: change to date picker
              />
              <TextInput
                style={styles.input}
                placeholder="Jahr"
                underlineColorAndroid="transparent"
                value={year}
                onChangeText={year =>setYear(year)}//TODO: change to date picker
              />
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.column1}>
              <Text style={styles.text}>Lagerort</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.input} value={storageSite} onChangeText={storageSite=>{setStorageSite(storageSite)}}/>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.column1}>
              <Text style={styles.text}>Schäden</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.input} multiline={true} value={damages} onChangeText={damages=>{setDamages(damages)}}/>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={ styles.fakeButtonGreen} type='submit' onPress={async() => await addItem()}>
              <Text style={styles.subCaptionTextWhite}>
                Hinzufügen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.fakeButtonRed} onPress={() => {navigation.navigate('Item Administration')}}>
              <Text style={styles.subCaptionTextWhite}>
                  Abbrechen
              </Text>
            </TouchableOpacity>
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
      marginLeft: -5
    },
    column2: {
      width: '63%',
      marginRight:5
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