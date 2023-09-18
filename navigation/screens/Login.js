import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../../App';
export default function LoginScreen() {
    const { signIn } = React.useContext(AuthContext);
    const serverUrl = 'http://'+ process.env.localIP +':3000'
    const [short, setShort] = useState('');
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons style={styles.inputIcon} name="person" size={20} color="#000"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Benutzername"
                        underlineColorAndroid="transparent"
                        onChangeText={short =>setShort(short)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons style={styles.inputIcon} name="lock-closed" size={20} color="#000"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Passwort"
                        underlineColorAndroid="transparent"
                        secureTextEntry
                        onChangeText={password =>setPassword(password)}
                    />
                </View>
                <TouchableOpacity style={styles.fakeButton} onPress={async ()=>await signIn(short,password)}>
                    <Ionicons style={styles.inputIcon} name="log-in" size={20} color="#000"/>
                    <Text style={styles.subCaptionTextWhite}>
                        Einloggen
                    </Text>
                </TouchableOpacity>
            </View>
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
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    fakeButton: {
        marginBottom: 10,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3EB489',
    },
    subCaptionTextWhite: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },
    inputContainer: {
        padding: 5,
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