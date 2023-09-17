import { StyleSheet, Text, TextInput, View, Alert, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default function DetailScreen({ route }) {
  const itemType = 'Prof. Dr. Med'
  const itemName = 'Max Mustermann'
  const role = 'Schulleiter'
  const mail = 'max.mustermann@bestegrundschule.de'
  const phoneNumber = '0176 12345678'
  const birthDate = '01.11.1478' 
  

  let { itemId } = route.params;

  const [fetchData, setFetchData] = useState([]); // Use a different state variable name
  const [data, setData] = useState([]);
  const url = 'http://' + process.env.localIP + ':3000';
  
  useEffect(() => {
    const fetchDataAsync = async () => {
    console.log("fetching data");
    // fetch(url + '/items')
    //   .then(response => response.json())
    //   .then(serverResponse => {
    //     console.log("server response: ", serverResponse);
    //     // Update the state with the fetched data
    //     setFetchData(serverResponse); // Use setFetchData to update the state
    //   })
    try {
      // Fetch the book data
      const response = await fetch(url + '/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response data
      const fetchData = await response.json();
      console.log("server response: ", fetchData);

      // Set 'data' once with the 'books' array
      setData(fetchData);
      console.log("data: ", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchDataAsync();
  }, []);
//   console.log("data: ", data);
//   const selectedItem = data.find(item => item.ID === itemId);
//   console.log("selectedItem: ", selectedItem);  

  // You can now use 'itemId' in your component
  // For example, to display it in a Text component:
  return (
    <View style={styles.container}>
      <Text>Item ID: {itemId}</Text>
      {/* Other details of the item can be displayed here */}
      
      <View style={styles.captionContainer}>
        <Text style={styles.subCaptionText}>{itemType} {itemName}</Text>
      </View>
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
            <Text style={styles.text}>{mail}</Text>
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
      </ScrollView>
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
    });  
