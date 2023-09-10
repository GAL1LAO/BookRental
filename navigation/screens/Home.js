import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
// import { TextInput } from "react-native-web";

import SearchBar from "react-native-dynamic-search-bar";
import React, { useState } from "react";

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
  const [data, setData] = useState([
    { text: "Deutsch", id: 1 },
    { text: "Erdkunde", id: 2 },
    { text: "Arbeitsblätter zur Beschäftigung", id: 3 },
    { text: "Hippopotomonstrosesquippedaliophobie", id: 4 },
    { text: "Hip", id: 5 },
    { text: "Hip", id: 6 },
    { text: "Hip", id: 7 },
    { text: "Hip", id: 8 },
    { text: "Hip", id: 9 },
    { text: "Hip", id: 10 },
  ]);
  const [oldData, setOldData] = useState([
    { text: "Deutsch", id: 1 },
    { text: "Erdkunde", id: 2 },
    { text: "Arbeitsblätter zur Beschäftigung", id: 3 },
    { text: "Hippopotomonstrosesquippedaliophobie", id: 4 },
    { text: "Hip", id: 5 },
    { text: "Hip", id: 6 },
    { text: "Hip", id: 7 },
    { text: "Hip", id: 8 },
    { text: "Hip", id: 9 },
    { text: "Hip", id: 10 },
  ]);

  // const [fetchDate, setFetchDate] = useState([]);

  // const url = 'http://'+ process.env.localIP +':3000'
    
  // useEffect(() => {
  //       fetch(url + '/items')
  //       .then(response => response.json()) 
  //         .then(serverResponse => {
  //           console.log(serverResponse)
  //           result = serverResponse
  //         })
  //       // .then((response) => {
  //       //   // Assuming the API response is an array of objects containing "type" and "user_short"
  //       //   setFetchDate(response.fetchDate);
  //       // })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //       });
  //   }, []);

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
          alert(item.id);
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
      <SearchBar
        placeholder="Search here"
        onPress={() => alert("onPress")}
        onChangeText={(text) => onSearch(text)} //console.log(text)}
        style={styles.searchBox}
      />
      <TouchableOpacity  style={styles.filterBar}>
        <View style={styles.filterBarText}>
        <Text>Filter auswählen</Text>
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
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
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
  }

  // subCaptionTextLentAndReserved: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 15,
  // },
});
