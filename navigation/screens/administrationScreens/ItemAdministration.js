import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import DropDownPicker from "react-native-dropdown-picker";
  import { RefreshControl } from "react-native";
  
  export default function ItemAdministrationScreen({ navigation }) {
    const [oldData, setOldData] = useState([]);
    const [data, setData] = useState([]);
    const url = "http://" + process.env.localIP + ":3000";
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      const fetchDataAsync = async () => {
        console.log("fetching data");
        try {
          // Fetch the book data
          const response = await fetch(url + "/itemsList");
          console.log("response: ", response);
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
  
    const onRefresh = () => {
      setRefreshing(true); // Set refreshing to true to show the loading indicator
      // Fetch new data here, similar to your existing fetchDataAsync logic
      const fetchDataAsync = async () => {
        try {
          const response = await fetch(url + "/itemsList");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const fetchData = await response.json();
    
          const books = fetchData.map((book) => ({
            ID: book.ID,
            type: book.type,
            name: book.name,
            user_short: book.user_short,
          }));
    
          setData(books);
          setOldData(books);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setRefreshing(false); // Set refreshing to false to hide the loading indicator
        }
      };
    
      fetchDataAsync();
    };
    
  
    const renderItem = ({ item }) => (
      <View style={styles.centerItems}>
        <TouchableOpacity
          style={styles.fakeButton}
          onPress={() => {
            navigation.navigate("ItemAdminDetail", { itemId: item.ID });
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
         <TouchableOpacity style={styles.fakeButton} onPress={() => {navigation.navigate('AddItem')}}>
            <Text style={styles.subCaptionTextWhite}>
                Items hinzufügen
            </Text>
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            style={{ width: "100%" }}
            placeholder="Suche"
            onChangeText={(text) => onSearch(text)}
          />
        </View>
        <View style={styles.filter}>
          <DropDownPicker 
            style={{borderColor: "#ccc"}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(item) => {setFilterOption(item);}}
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.ID.toString()}
          style={styles.flatList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} // Define the onRefresh function
            />
          }
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
      zIndex: 1, 
      elevation: 2,
      marginVertical: 10,
      width: "90%",
    },
    inputIcon: {
      padding: 10,
      color: "#FFFFFF",
    },
  
  });
  