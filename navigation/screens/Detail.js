import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export default function DetailScreen({ route }) {
  const itemType = 'KISTE'
  const itemName = 'SACHKUNDE1'
  const dateOfPurchase = '2021-01-15'
  const storageSite = 'Storage Room 1'
  const user_short = 'abcd'
  const damages = 'Torn pages' 
  const code = 'R3#pT$7vXaKq9G@U5mW*6zYfN8p2eR$1' 
  

  let { itemId } = route.params;

  const [fetchData, setFetchData] = useState([]); // Use a different state variable name
  const [data, setData] = useState([]);
  const url = 'http://' + process.env.localIP + ':3000';
  
  console.log("itemId: ", itemId);
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
   console.log("data: ", data);
   console.log("Test")
//   const selectedItem = data.find(item => item.ID === itemId);
//   console.log("selectedItem: ", selectedItem);  

  // You can now use 'itemId' in your component
  // For example, to display it in a Text component:
  return (
    <View style={styles.container}>
      <Text>Item ID: {itemId}</Text>
      {/* Other details of the item can be displayed here */}
      
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{itemType} {itemName}</Text>
      </View>
      <ScrollView>
      {/* TODO: PHOTO HINZUFÜGEN? */}
       <View style={styles.fakeButtonImage}>
       <Ionicons style={styles.inputIcon} size={50} name="cube"/>
        </View> 
        {/* <View style={styles.fakeButtonImage}>
          <Image source={require('../../assets/favicon.png')}/>
        </View>  */}
        <View style={styles.userDetails}>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
        </View>
        <View
          style={styles.line}
        />
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Anschaffungsdatum:</Text>  
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{dateOfPurchase}</Text>
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Aufbewahrungsort:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{storageSite}</Text>
          </View>
        </View><View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Ausgeliehen von:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{user_short}</Text>
          </View>
        </View>
        
        <View
          style={styles.line}
        />
        <View style={styles.titelAndText}>
          <View style={styles.row1}>
            <Text style={styles.subCaptionText}>Schaden:</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.text}>{damages}</Text>
          </View>
        </View>

        <View
          style={styles.line}
        />
        <View style={styles.titelAndText}>
          <View style={styles.row1}>
            <Text style={styles.subCaptionText}>Code für manuelle Eingabe beim Ausleihen:</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.text}>{code}</Text>
          </View>
        </View>
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
      titelAndText: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 10,
        alignItems: 'flex-start'
      },
      row1: {
        // height: '40%',
        // paddingLeft: 10,
        // paddingTop: 10,
      },
      row2: {
        // height: '60%',
        // paddingLeft: 10,
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
        size: '1000%', 
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
    });  
