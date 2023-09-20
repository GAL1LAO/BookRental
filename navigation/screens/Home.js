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
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

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
  const url = "http://" + process.env.localIP + ":3000";

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
        const response = await fetch(url + "/itemsList");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data
        const fetchData = await response.json();
        console.log("server response: ", fetchData);

        // Create the 'books' array with 'name' and 'ID' properties
        const books = fetchData.map((book) => ({
          ID: book.ID,
          type: book.type,
          name: book.name,
          user_short: book.user_short,
        }));

        // Set 'data' once with the 'books' array
        setData(books);
        setOldData(books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAsync();
  }, []);

  // // console.log("result")
  console.log(fetchData);
  // // console.log("------")
  // // console.log("fetchData")
  // console.log(fetchDate)
  console.log("------" + data);

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

  console.log("data " + data);

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
            {item.name}
          </Text>
        </View>
        <View style={styles.fakeButtonImage}>
          {/* Conditionally render the icon with red color if user_short is not empty */}
          <Ionicons
            style={[
              styles.inputIcon,
              item.user_short ? { color: "red" } : null,
            ]}
            size={50}
            name={item.type === "Book" ? "book-sharp" : "cube"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const onSearch = (text) => {
    if (text == "") {
      setData(oldData);
    } else {
      let tempList = data.filter((item) => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempList);
    }
  };
  const [filterOption, setFilterOption] = useState("All"); // Initialize with "All" as the default filter

  const filterData = () => {
    console.log("filtering data");
    switch (filterOption) {
      case "Only Books":
        setData(oldData.filter((item) => item.type === "Book"));
        break;
      case "Only Boxes":
        setData(oldData.filter((item) => item.type !== "Book"));
        break;
      case "Not Borrowed":
        setData(oldData.filter((item) => !item.user_short));
        break;
      case "Borrowed":
        setData(oldData.filter((item) => item.user_short));
        break;
      default:
        setData(oldData); // Default option, show all data
        break;
    }
  };

  useEffect(() => {
    filterData();
  }, [filterOption]);
  
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "All", value: "All" },
      { label: "Only Books", value: "Only Books" },
      { label: "Only Boxes", value: "Only Boxes" },
      { label: "Not Borrowed", value: "Not Borrowed" },
      { label: "Borrowed", value: "Borrowed" },
    ]);
  
  


  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={{ width: "100%" }}
          placeholder="Suche"
          onChangeText={(text) => onSearch(text)}
        />
      </View>
      <DropDownPicker 
        containerStyle={styles.filter}
        style={{borderColor: "#ccc"}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        // defaultValue={filterOption}
        // containerStyle={{ height: 40 }}
        // style={{ backgroundColor: "#fafafa" }}
        // itemStyle={{
        //   justifyContent: "flex-start",
        // }}
        // dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeValue={(item) => {setFilterOption(item);}}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()}
        style={[styles.flatList, {zIndex: 0}]}
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
  subCaptionTextWhite: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  flatList: {
    width: "100%",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
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
  filter: {
    marginVertical: 10,
    width: "90%",
    borderColor: "#ccc",
  },
  inputIcon: {
    padding: 10,
    size: "1000%",
    color: "#FFFFFF",
  },

  // subCaptionTextLentAndReserved: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 15,
  // },
});
