import { StyleSheet, Text, View } from 'react-native';

  export default function LendScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Lend</Text>
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