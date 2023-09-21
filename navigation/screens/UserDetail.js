import { StyleSheet, Text, TextInput, View, Alert, ScrollView, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

export default function UserDetailScreen({ route }) {
  let { short } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = 'http://' + process.env.localIP + ':3000';
  
  const getUser = async () => {
    try {
      console.log("fetching data???????");
      const response = await fetch(url + '/userByShort',  { 
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
          "short": short,
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
    getUser()
  }, [])

  return (
    <View style={styles.container}> 
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
      <View >
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{data.title} {data.firstName} {data.lastName}</Text>
        </View>
        <ScrollView>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Geburtsdatum:</Text>  
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{dayjs(data.birthDate).format('DD.MM.YYYY')}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Email Adresse:</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{data.mailAddress}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Telephonnummer</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{data.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            <View style={styles.column1}>
              <Text style={styles.text}>Rolle</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.text}>{data.role}</Text>
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
        width: '50%',
        paddingLeft: 10,
        paddingTop: 10,
      },
      column2: {
        width: '50%',
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
      },
      row2: {

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
      text: {
        
      },
    });  
