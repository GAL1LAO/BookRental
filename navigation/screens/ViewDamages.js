import { color } from "@rneui/base";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ViewDamageScreen({ navigation }) {
//   const data = [
//     {
//       Itemname: "Item 1",
//       Schaeden: "Damage 1",
//       GemeldeteZeit: "Time 1",
//       Gemeldet: "Reported 1",
//     },
//     {
//       Itemname: "Item 2",
//       Schaeden: "Damage 2",
//       GemeldeteZeit: "Time 2",
//       Gemeldet: "Reported 2",
//     },
//     // Add more data items as needed
//   ];
const [data, setData] = useState([]);
const serverUrl = "http://" + process.env.localIP + ":3000";
  useEffect(() => {
    const fetchDataAsync = async () => {
      console.log("fetching data");
      try {
        // Fetch the book data
        const response = await fetch(serverUrl + "/damagesList");
        console.log("response: ", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data
        const fetchData = await response.json();
        console.log("server response: ", fetchData);

        // Create the 'books' array with 'name' and 'ID' properties
        const items = fetchData.map((item) => ({
          name: item.name,
          damage : item.damage,
          dataOfDamage: item.dataOfDamage,
          itemDescription: item.itemDescription,
          ID: item.ID,
        }));

        // Set 'data' once with the 'books' array
        setData(fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAsync();
  }, []);
  console.log(data);

  const renderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.damageDate}</Text>
      <Text style={styles.tableCell}>{item.itemName}</Text>
      <Text style={styles.tableCell}>{item.damageDescription}</Text>
      {/* <Text style={styles.tableCell}>{item.itemDescription}</Text> */}
    </View>
  );
  

  return (
    <View style={styles.container}>
      

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Gemeldete Zeit</Text>
        <Text style={styles.columnHeader}>Itemname</Text>
        <Text style={styles.columnHeader}>Schäden</Text>
        {/* <Text style={styles.columnHeader}>Gemeldet</Text> */}
      </View>

      {/* Table Data */}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString() }
        style={styles.tableData}
      />
      <TouchableOpacity
        style={styles.fakeButton}
        onPress={() => {
          navigation.navigate("Admin");
        }}
      >
        <Text style={styles.subCaptionTextWhite}>Zurück zur Übersicht</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        //backgroundColor: '#246EE9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
      },
      fakeButton: {
        marginBottom: 20,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#3EB489',
        padding: 10,
      },
      subCaptionTextWhite: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#3EB389',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '100%',
        
      },
      columnHeader: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
      },
      tableData: {
        width: '100%',
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
        padding: 10,
      },
      tableCell: {
        flex: 1,
        color: 'black',
      },
    });