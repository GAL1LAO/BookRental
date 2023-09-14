import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../../App';

export default function ProfileScreen() {
  const serverUrl = 'http://'+ process.env.localIP +':3000'

  const {userToken, title, lastName, firstName, role, mailAddress, phoneNumber, birthDate} = React.useContext(UserContext)

  let itemList = []
  let reservedItemList = []

  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);


  const getItems = async () => {
    try {
      const response = await fetch(serverUrl + '/itemsForUser', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
        "short": userToken,
        })
      })
      console.log(response)
      const json = await response.json();
      console.log(json)
      setItems(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems()
  }, [])
  
  

  console.log(items)

  items.forEach((item) => {
    itemList.push(
      <TouchableOpacity style={styles.fakeButton} key={item.ID} onPress={() => {alert(item.ID)}}>
        <View style={styles.fakeButtonText}>
            <Text style={styles.subCaptionTextWhite} numberOfLines={1}>
              {item.name}
            </Text>
        </View>
        <View style={styles.fakeButtonImage}>
          <Image source={require('../../assets/favicon.png')}/>
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.captionContainer}>
        <Text style={styles.subCaptionText}>{title} {firstName} {lastName}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator/>
      ) : ( 
      <ScrollView>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Rolle:</Text>  
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{role}</Text>
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>E-Mail:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{mailAddress}</Text>
          </View>
        </View><View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Telefonnummer:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Geburtsdatum:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{birthDate}</Text>
          </View>
        </View>
        <View
          style={styles.line}
        />
      
        <View style={styles.centerItems}>
          <Text style={styles.subCaptionTextLentAndReserved}>
            Ausgeliehen
          </Text>
              {itemList}
        </View>
        <View
          style={styles.line}
        />
        <View style={styles.centerItems}>
          <Text style={styles.subCaptionTextLentAndReserved}>
            Reserviert
          </Text>
              {reservedItemList}
        </View>
      </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: '40%',
    paddingLeft: 10,
    paddingTop: 10,
  },
  column2: {
    width: '60%',
    paddingLeft: 10,
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
    fontSize: 20,
  },
  subCaptionTextLentAndReserved: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
  },
  text: {

  },
  line: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fakeButton: {
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    marginVertical: 5,
    paddingVertical: 15,
    width: '90%',
    backgroundColor: '#3EB489',
  },
  fakeButtonText: {
    alignItems: 'flex-start',
    width: '80%',
  },
  fakeButtonImage: {
    alignItems: 'flex-end',
    width: '20%',
  },
  subCaptionTextWhite: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});
