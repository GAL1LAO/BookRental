import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ItemAdministrationDetailScreen({ route, navigation }) {
    const [type, setType] = useState('');
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [storageSite, setStorageSite] = useState('');
    const [day, setDay] = useState('')    
    const [month, setMonth] = useState('')    
    const [year, setYear] = useState('')   
    let { itemId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const url = 'http://' + process.env.localIP + ':3000';
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      { label: "Kiste", value: "Chest" },
      { label: "Buch", value: "Book" },
    ]);
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
      setStorageSite(json[0].storageSite)
      const date = dayjs(json[0].dateOfPurchase)
      setYear(""+date.year())
      setMonth(""+(date.month()+1))
      setDay(""+date.date())
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
        dateOfPurchase : dayjs(year+"-"+month+'-'+day).format('YYYY-MM-DD'),
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
    alert("Erfolgreich aktualisiert")
}

async function deleteItem(){
    await fetch(url + '/deleteItem',{ 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
            'id' : itemId
        })
      })
      .then(response => console.log(response)) 
    navigation.navigate('Item Administration')
}

  return (
    <View style={styles.container}> 
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
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
          <View style={styles.buttonRow}>
            <TouchableOpacity style={ styles.fakeButtonGreen} type='submit' onPress={async() => await editUser()}>
              <Text style={styles.subCaptionTextWhite}>
                Bestätigen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.fakeButtonRed1} onPress={() => {navigation.navigate('Item Administration')}}>
              <Text style={styles.subCaptionTextWhite}>
                  Abbrechen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.fakeButtonRed2} onPress={async() => await deleteItem() }>
              <Text style={styles.subCaptionTextWhite}>
                  Löschen
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  ); 
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
    width: '33%',
    paddingLeft: 10,
    paddingTop: 10,
    marginRight:5,
  },
  fakeButtonRed1: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    width: '33%',
    paddingLeft: 10,
    paddingTop: 10,
    marginRight:5,
  },
  fakeButtonRed2: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    width: '33%',
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