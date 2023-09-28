import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { UserContext } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GreenButton from '../lib/Button';

export default function ProfileScreen({navigation}) {
  const serverUrl = 'http://'+ process.env.localIP +':3000'

  const {userToken} = React.useContext(UserContext)

  let itemList = []

  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);


  const getItems = async () => {
    try {
      console.log("fetching data?????????");
      const response = await fetch(serverUrl + '/itemsForUser', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
        "short": userToken,
        })
      })
      const json = await response.json();
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
  
  
  items.forEach((item) => {
    itemList.push(
      <GreenButton key={item.ID} title={item.name} onPress={() => {
        navigation.navigate("ReturnType", { itemId: item.ID });
      }} icon={<Ionicons
        style={[
          item.user_short ? { color: "red" } : null,
        ]}
        size={50}
        name={item.type === "Book" ? "book-sharp" : "cube"}
      />}/>
    )
  })

  return (
    <View className="p-2">
      {isLoading ? (
        <ActivityIndicator/>
      ) : ( 
      <ScrollView>
        <View >
          {itemList}
        </View>
      </ScrollView>
      )}
    </View>
  );
}
