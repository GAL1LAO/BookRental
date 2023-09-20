import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

export default function DetailScreen({ route }) {
  let { itemId } = route.params;
  const code = 'askjdakufiuawd' //TODO: add to db
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = 'http://' + process.env.localIP + ':3000';
  
  const getItems = async () => {
    try {
      const response = await fetch(url + '/itemById',  { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
          "id": itemId,
        })
      })
      const json = await response.json();
      console.log(json)
      setData(json[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItems()
  }, [])

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
      <View style={styles.container}>
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{data.type} {data.name}</Text>
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
          <Text style={styles.text}>{data.description}</Text>
          </View>
          <View
            style={styles.line}
          />
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Anschaffungsdatum:</Text>  
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{dayjs(data.dateOfPurchase).format('DD.MM.YYYY')}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Aufbewahrungsort:</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{data.storageSite}</Text>
            </View>
          </View><View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Ausgeliehen von:</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{data.title} {data.firstName} {data.lastName}</Text>
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
              <Text style={styles.text}>{data.damages}</Text>
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
      </View>)}
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
