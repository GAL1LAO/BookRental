import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserDetailScreen({ route }) {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('')
    const [title, setTitle] = useState('');
    const [mailAddress, setMailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('')     
    const [role, setRole] = useState('')
    const [day, setDay] = useState('')    
    const [month, setMonth] = useState('')    
    const [year, setYear] = useState('')   
    let { short } = route.params;
    const [isLoading, setLoading] = useState(true);
    const url = 'http://' + process.env.localIP + ':3000';
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
      const birthDate = dayjs(json[0].birthDate)
      setFirstName(json[0].firstName.toString())
      setLastName(json[0].lastName.toString())
      setTitle(json[0].title.toString())
      setMailAddress(json[0].mailAddress)
      setPhoneNumber(json[0].phoneNumber)
      setYear("" + birthDate.year())
      setMonth("" + birthDate.month()+1)
      setDay("" + birthDate.date())
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

  useEffect(() => {
    filterData()
  }, [filterOption])
  

  async function editUser(){
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
    console.log(userData.birthDate)
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
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Administrator", value: "adm" },
    { label: "Benutzer", value: "use" },
  ]);

  return (
    <View style={styles.container}> 
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.filter}>
                  <DropDownPicker 
                  style={{borderColor: "#ccc"}}
                  open={open}
                  value={role}
                  items={items}
                  placeholder="Filter auswählen"
                  setOpen={setOpen}
                  setValue={setRole}
                  setItems={setItems}
                  onChangeValue={(item) => {setRole(item);}}
                  />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Anrede:</Text>  
                </View>
                <View style={styles.column2}>
                  <TextInput style={styles.input} value={title} onChangeText={title=>{setTitle(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Vorname:</Text>  
                </View>
                <View style={styles.column2}>
                <TextInput style={styles.input} value={firstName} onChangeText={title=>{setFirstName(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Nachname:</Text>  
                </View>
                <View style={styles.column2}>
                <TextInput style={styles.input} value={lastName} onChangeText={lastName=>{setLastName(lastName)}}/>
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
                <TextInput style={styles.input} value={mailAddress} onChangeText={title=>{setMailAddress(title)}}/>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.column1}>
                  <Text style={styles.text}>Telephonnummer</Text>
                </View>
                <View style={styles.column2}>
                <TextInput style={styles.input} value={phoneNumber} onChangeText={title=>{setPhoneNumber(title)}}/>
                </View>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.fakeButtonGreen} type='submit' onPress={async() => await editUser()}>
                  <Text style={styles.subCaptionTextWhite}>
                      Bestätigen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fakeButtonRed} onPress={() => {navigation.navigate('Item Administration')}}>
                  <Text style={styles.subCaptionTextWhite}>
                      Abbrechen
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingTop: 10,
    marginRight:5,
    marginLeft: -5
  },
  column2: {
    width: '63%',
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
      paddingLeft: 0,
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
    marginBottom: 10,
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
