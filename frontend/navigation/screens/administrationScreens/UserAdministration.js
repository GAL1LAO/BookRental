import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, FlatList, RefreshControl, ActivityIndicator, ScrollView } from "react-native"
const serverUrl = 'http://'+ process.env.localIP +':3000'

export default function UserAdministrationScreen({navigation}){
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let userList=[]

    const fetchDataAsync = async () => {
        console.log("fetching data");
        try {
          // Fetch the book data
          const response = await fetch(serverUrl + "/users");
          console.log("response: ", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          // Parse the response data
          const dataJson = await response.json();
          setData(dataJson)
          console.log("server response: ", dataJson);
  
          // Create the 'users' array with 'name' and 'ID' properties
          /*const users = dataJson.map((user) => ({
            short: user.short,
            title: user.title,
            firstName: user.firstName,
            lastName: user.lastName,
          }));
  
          // Set 'data' once with the 'books' array
          setData(users);*/
        } catch (error) {
          console.error("Error fetching data:", error);
        }finally{
            setLoading(false)
        }
      };  

    useEffect(() => {
        fetchDataAsync();
      }, []);
      console.log(data)
    data.forEach((user) => {
    userList.push(
        <TouchableOpacity style={styles.fakeButton} key={user.short} onPress={() => {
            navigation.navigate("User Detail", { short: user.short });
        }}>
        <View style={styles.fakeButtonText}>
            <Text style={styles.subCaptionTextWhite} numberOfLines={1}>
                {user.title} {user.firstName} {user.lastName}
            </Text>
        </View>
        </TouchableOpacity>
    )
    })

    return(
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator/>
        ) : (
        <View>
          <View style={styles.centerItems}>
            <TouchableOpacity style={[styles.fakeButtonAdd, {marginTop: 20, alignItems: 'center'}]} onPress={() => {navigation.navigate('Add User')}}>
              <Text style={styles.subCaptionTextWhite}>
                  Benutzer hinzufügen
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.line}
          />
          <View style={styles.centerItems}>
            <Text style={styles.subCaptionText}>
                Benutzer
            </Text>
            {userList}
          </View>
        </View>
        )}
      </ScrollView>

    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#246EE9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        
    },
    fakeButtonAdd: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 5,
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#3EB489',
        padding: 10
    },
    fakeButtonCancel: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red',
        padding: 10
    },
    subCaptionText: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 15
    },
    inputContainer: {
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    buttonAlignment: { 
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  column1: {
    width: '50%',
    padding: 10,
    marginTop: 20,
    marginRight: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#3EB489',
        padding: 10
  },
  column2: {
    width: '50%',
    padding: 10, 
    marginTop: 20,
    marginLeft: 10,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10
  },
  flatList: {
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centerItems: {
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
  line: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});