import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const adress = 'Prof. Dr. Med'
  const userName = 'Max Mustermann'
  const role = 'Schulleiter'
  const mail = 'max.mustermann@bestegrundschule.de'
  const phoneNumber = '0176 12345678'
  const birthDate = '01.11.1478'

  let itemList = []
  let items = [{text: 'Deutsch', id: 1}, {text: 'Erdkunde', id: 2}, {text: 'Arbeitsblätter zur Beschäftigung', id: 3}, {text: 'Hippopotomonstrosesquippedaliophobie', id: 4}, {text: 'Hip', id: 5},{text: 'Hip', id: 6},{text: 'Hip', id: 7},{text: 'Hip', id: 8},{text: 'Hip', id: 9},{text: 'Hip', id: 10},]
  
  items.forEach((item) => {
    itemList.push(
      <TouchableOpacity style={styles.fakeButton} key={item.id} onPress={() => {alert(item.id)}}>
        <View style={styles.fakeButtonText}>
            <Text style={styles.subCaptionTextWhite} numberOfLines={1}>
              {item.text}
            </Text>
        </View>
        <View style={styles.fakeButtonImage}>
          <Image source={require('../../assets/favicon.png')}/>
        </View>
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.captionContainer}>
        <Text style={styles.subCaptionText}>{adress} {userName}</Text>
      </View>
      
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Rolle:</Text>  
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{role}</Text>
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>E-Mail:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{mail}</Text>
          </View>
        </View><View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Telefonnummer:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.userDetails}>
          <View style={styles.column1}>
            <Text style={styles.text}>Geburtsdatum:</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.text}>{birthDate}</Text>
          </View>
        </View>
        <View
          style={styles.line}
        />
        <ScrollView>
        <View style={styles.centerItems}>
          <Text style={styles.subCaptionTextLentAndReserved}>
            Ausgeliehen
          </Text>
              {itemList}
        </View>
        <View
          style={styles.line}
        />
        <View style={styles.centerItems}>
          <Text style={styles.subCaptionTextLentAndReserved}>
            Reserviert
          </Text>
              {itemList}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 20,
  },
  subCaptionTextLentAndReserved: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
  },
  text: {

  },
  line: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fakeButton: {
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    marginVertical: 5,
    paddingVertical: 15,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#3EB489',
  },
  fakeButtonText: {
    alignItems: 'flex-start',
    width: '80%',
  },
  fakeButtonImage: {
    alignItems: 'flex-end',
    width: '20%',
  },
  subCaptionTextWhite: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});