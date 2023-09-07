import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

  export default function HomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='Profile' onPress={() => navigation.navigate('Profile')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});