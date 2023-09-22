import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

export default function ItemAdministrationDetailScreen({ route }) {
    const [type, setType] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [dateOfPurchase, setDateOfPurchase] = useState('')
    const [storageSite, setStorageSite] = useState('');
    let { itemId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const url = 'http://' + process.env.localIP + ':3000';
  
  const getUser = async () => {
    try {
      console.log("fetching data???????");
      const response = await fetch(url + '/itemById',  { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
          "id": itemId,
        })
      })
      const json = await response.json();
      console.log(json)
      setType(json[0].type.toString())
      setName(json[0].name.toString())
      setDescription(json[0].description.toString())
      setDateOfPurchase(json[0].dateOfPurchase)
      setStorageSite(json[0].storageSite)
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
    const itemData = {
        id: itemId,
        type : type,
        name : name,
        description : description,
        dateOfPurchase : dayjs(dateOfPurchase).format('YYYY-MM-DD'),
        storageSite : storageSite,
    }
    for(const field in itemData){
        if(itemData[field] == null || !itemData[field]){
            alert("Alle Felder müssen befüllt sein: Folgendes Feld ist leer" + field)
            return
        }
    }
    console.log(itemData)
    await fetch(url + '/editItem',{ 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(itemData)
      })
      .then(response => response.json()) 
      .then(serverResponse => {
        console.log(serverResponse)
    })
    await getUser()//to get updated data
}

async function deleteItem(){
    await fetch(url + '/deleteItem',{ 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
            'id' : itemId
        })
      })
      .then(response => response.json()) 
      .then(serverResponse => {
        console.log(serverResponse)
    })
    navigation.navigate('ItemAdministration')
}

  return (
    <View style={styles.container}> 
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <ScrollView>
            <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Typ:</Text>  
            </View>
            <View style={styles.column2}>
              <TextInput style={styles.text} value={type} onChangeText={type=>{setType(type)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Name:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={name} onChangeText={name=>{setName(name)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Beschreibung:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={description} onChangeText={description=>{setDescription(description)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Anschaffungsdatum:</Text>  
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={dateOfPurchase} onChangeText={dateOfPurchase=>{setDateOfPurchase(dateOfPurchase)}}/>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Lagerort</Text>
            </View>
            <View style={styles.column2}>
            <TextInput style={styles.text} value={storageSite} onChangeText={storageSite=>{setStorageSite(storageSite)}}/>
            </View>
          </View>
          <TouchableOpacity style={styles.column1} type='submit' onPress={async() => await editUser()}>
                <Text style={styles.subCaptionTextWhite}>
                    Updaten
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column2} onPress={() => {navigation.navigate('ItemAdministration')}}>
                <Text style={styles.subCaptionTextWhite}>
                    Abbrechen
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column2} onPress={async() => await deleteItem() }>
                <Text style={styles.subCaptionTextWhite}>
                    Löschen
                </Text>
            </TouchableOpacity>
        </ScrollView>)}
    </View>
  ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      captionContainer: {
        paddingLeft: 20,
        paddingTop: 10,
      },
      userDetails: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        alignItems: 'flex-start'
      },
      column1: {
        width: '50%',
        paddingLeft: 10,
        paddingTop: 10,
      },
      column2: {
        width: '50%',
        paddingLeft: 10,
        paddingTop: 10,
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
      text: {
        
      },
    });  
