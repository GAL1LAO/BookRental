import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const adress = 'Prof. Dr. Med'
  const userName = 'Max Mustermann'
  const role = 'Schulleiter'
  const mail = 'max.mustermann@bestegrundschule.de'
  const phoneNumber = '0176 12345678'
  const birthDate = '01.11.1478'

  return (
    <View style={styles.container}>
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>PROFIL</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  captionContainer: {
    paddingLeft: 10,
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
  captionText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subCaptionText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  line: {
    marginHorizontal: 5,
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }

});