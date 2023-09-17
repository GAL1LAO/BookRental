import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function HomeScreen({ navigation }) {
  // const data = [
  //   { text: "Deutsch", id: 1 },
  //   { text: "Erdkunde", id: 2 },
  //   { text: "Arbeitsblätter zur Beschäftigung", id: 3 },
  //   { text: "Hippopotomonstrosesquippedaliophobie", id: 4 },
  //   { text: "Hip", id: 5 },
  //   { text: "Hip", id: 6 },
  //   { text: "Hip", id: 7 },
  //   { text: "Hip", id: 8 },
  //   { text: "Hip", id: 9 },
  //   { text: "Hip", id: 10 },
  // ];
  // const [data, setData] = useState([
  //   { text: "Deutsch", id: 1 },
  //   { text: "Erdkunde", id: 2 },
  //   { text: "Arbeitsblätter zur Beschäftigung", id: 3 },
  //   { text: "Hippopotomonstrosesquippedaliophobie", id: 4 },
  //   { text: "Hip", id: 5 },
  //   { text: "Hip", id: 6 },
  //   { text: "Hip", id: 7 },
  //   { text: "Hip", id: 8 },
  //   { text: "Hip", id: 9 },
  //   { text: "Hip", id: 10 },
  // ]);
  const [oldData, setOldData] = useState([]);

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
      const response = await fetch(url + '/itemsList');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response data
      const fetchData = await response.json();
      console.log("server response: ", fetchData);

      // Create the 'books' array with 'name' and 'ID' properties
      const books = fetchData.map(book => ({ text: book.name, id: book.ID }));

      // Set 'data' once with the 'books' array
      setData(books);
      setOldData(books);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchDataAsync();
  }, []);
  

// // console.log("result")
console.log(fetchData)
// // console.log("------")
// // console.log("fetchData")
// console.log(fetchDate)

const books = fetchData.map(book => ({
  ID : book.ID,
  type: book.type,
  name: book.name,
  user_short: book.user_short,
}));

console.log(books);

 // Initialize with an empty array

// useEffect(() => {
//   const fetchDataAsync = async () => {



  
//     // Fetch the book data and create the 'books' array with 'name' and 'ID' properties
//   const books = await fetchData.map(book => ({ text: book.name, id: book.ID }));
  
//   // Set 'data' once with the 'books' array
//   setData(books);
//   };
//   fetchDataAsync();
// }, []);

console.log(data);

// async function getItems(){
//   let result
//   await fetch(url + '/items',{
//       method: 'GET',
//     })
//     .then(response => response.json()) 
//     .then(serverResponse => {
//       console.log(serverResponse)
//       result = serverResponse
//   })
//   if(result === null || result.length === 0){
//       Alert.alert("Login fehlgeschlagen","Falscher Benutzername oder falsches Passwort.")
//       return
//   }else{
//       //TODO: log in and keep logged in
//       Alert.alert("Login erfolgreich")
//   }
// }

  // handleOnChangeText = (text) => {
  //   // ? Visible the spinner
  //   this.setState({
  //     searchText: text,
  //     spinnerVisibility: true,
  //   });

  //   // ? After you've done to implement your use-case
  //   // ? Do not forget to set false to spinner's visibility
  //   // this.setState({
  //   //   spinnerVisibility: false,
  //   // });
  // };

  // const { spinnerVisibility } = this.state;

  const renderItem = ({ item }) => (
    <View style={styles.centerItems}>
      <TouchableOpacity
        style={styles.fakeButton}
        onPress={() => {
          alert(item.id)
          navigation.navigate("Detail", { itemId: item.id });
          // Handle the button click here
          // You can use item.id or item.text to identify the clicked item
        }}
      >
        <View style={styles.fakeButtonText}>
          <Text style={styles.subCaptionTextWhite} numberOfLines={1}>
            {item.text}
          </Text>
        </View>
        <View style={styles.fakeButtonImage}>
          <Image source={require("../../assets/favicon.png")} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const onSearch = (text) => {
    if (text == "") {
      setData(oldData);
    } 
    else {
      let tempList = data.filter((item) => {
        return item.text.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput placeholder="Suche" style={styles.searchBox} clearButtonMode="always"/>
       */}

      <View  style={styles.searchBar}>
        <TextInput style={{width: '100%'}}
          placeholder="Suche"
          onChangeText={(text) => onSearch(text)}
        />
      </View>

      <TouchableOpacity  style={styles.filterBar}>
        <View style={styles.filterBarText}>
        <Text>Filter</Text>
        </View>
        <View>
          {/* <Image source={require("../../assets/favicon.png")}/> */}
        </View>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
        //showsHorizontalScrollIndicator={false}
      />
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
  centerItems: {
    flex: 1,
    alignItems: "center",
  },
  fakeButton: {
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "flex-start",
    marginVertical: 5,
    paddingVertical: 15,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#3EB489",
  },
  fakeButtonText: {
    alignItems: "flex-start",
    width: "80%",
  },
  fakeButtonImage: {
    alignItems: "flex-end",
    width: "20%",
  },
  filterBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "90%",
   
  },
  filterBarText: {
    alignItems: "flex-start",
    width: "80%",
  },
  subCaptionTextWhite: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  flatList:{
    width: "100%",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "flex-start",
    width: "90%",
   
  },

  // subCaptionTextLentAndReserved: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 15,
  // },
});
