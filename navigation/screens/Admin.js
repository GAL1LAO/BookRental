import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

  export default function AdminScreen({navigation}){
    function giveOut(){
        console.log('test is clicked')
    }
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.fakeButton} onPress={giveOut()}>
        <Text style={styles.subCaptionTextWhite}>
            Items hinzufügen
        </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.fakeButton} onPress={giveOut()}>
        <Text style={styles.subCaptionTextWhite}>
            Benutzer hinzufügen
        </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.fakeButton} onPress={giveOut()}>
        <Text style={styles.subCaptionTextWhite}>
            Ausleihen und Schäden ansehen
        </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#246EE9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    fakeButton: {
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#3EB489',
    },
    subCaptionTextWhite: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },
    inputContainer: {
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
});