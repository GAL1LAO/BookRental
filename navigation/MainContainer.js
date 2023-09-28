import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import LendScreen from './screens/Lend';
import ProfileScreen from './screens/Profile';
import QRScannerScreen from './screens/QRScanner';
import QRGeneratorScreen from './screens/administrationScreens/QRGenerator';
import SuccessScreen from './screens/Success';
import AdminScreen from './screens/administrationScreens/Admin';
import ReturnItemScreen from './screens/ReturnItem';
import ReturnType from './screens/ReturnType';
import DetailScreen from './screens/Detail';
import { AuthContext, UserContext } from '../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUserScreen from './screens/administrationScreens/AddUser';
import AddItemScreen from './screens/administrationScreens/AddItem';
import ViewDamageScreen from './screens/administrationScreens/ViewDamages';
import UserAdministrationScreen from './screens/administrationScreens/UserAdministration';
import UserDetailScreen from './screens/administrationScreens/UserDetail';
import ItemAdministrationScreen from './screens/administrationScreens/ItemAdministration';
import ItemAdministrationDetailScreen from './screens/administrationScreens/ItemAdministrationDetail';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const homeName = "Home";
const lendName = "Leihen";
const profileName = "Profil";
const adminName = "Admin";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LendNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={lendName} component={LendScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="ReturnItem" component={ReturnItemNavigator} />
    </Stack.Navigator>
  );
}

function ReturnItemNavigator() {
  return (
    <Stack.Navigator options={{headerShown: false}}>
      <Stack.Screen name="ReturnItem" component={ReturnItemScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ReturnType' component={ReturnType} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          
        />
        <Stack.Screen name="Detail" component={DetailScreen}/>
      </Stack.Navigator>
  );
}

function ProfileStack() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            headerRight: () => (
                <TouchableOpacity style={styles.fakeButton} onPress={async ()=>await signOut()}>
                    <Ionicons style={styles.inputIcon} name="log-out" size={20} color="#000"/>
                </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Detail" component={DetailScreen}/>
      </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          
        />
        <Stack.Screen name="Nutzer Administration" component={UserAdministrationStack} options={{headerShown: false}}/>
        <Stack.Screen name="Item Administration" component={ItemAdministrationStack} options={{headerShown: false}}/>
        <Stack.Screen name="Schäden" component={ViewDamageScreen}/>
      </Stack.Navigator>
  );
}

function UserAdministrationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Nutzer Administration"
          component={UserAdministrationScreen}
        />
        <Stack.Screen name="Add User" component={AddUserScreen}/>
        <Stack.Screen name="User Detail" component={UserDetailScreen}/>
      </Stack.Navigator>
  );
}

function ItemAdministrationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Item Administration"
          component={ItemAdministrationScreen}
        />
        <Stack.Screen name="Add Item" component={AddItemStack} options={{headerShown: false}}/>
        <Stack.Screen name="Item Admin Detail" component={ItemAdministrationDetailScreen}/>
      </Stack.Navigator>
  );
}

function AddItemStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Add Item" component={AddItemScreen}/>
        <Stack.Screen name="QR-Code" component={QRGeneratorScreen}/>
      </Stack.Navigator>
  );
}

function MainContainer() {
  const {role} = React.useContext(UserContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#3EB489",
          tabBarInactiveTintColor: "white",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 15 },
          tabBarStyle: { backgroundColor: '#246EE9', padding: 10, height: 100 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === lendName) {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === adminName) {
              iconName = focused ? 'pencil' : 'pencil-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeStack} options={{headerShown: false}}/>
        <Tab.Screen name={lendName} component={LendNavigator} options={{headerShown: false}} />
        <Tab.Screen name={profileName} component={ProfileStack} options={{headerShown: false}}/>
        {role == "adm" && (
          <Tab.Screen name={adminName} component={AdminStack} options={{headerShown: false}} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;

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
      marginVertical: 5,
      marginRight: '0.5%',
      borderRadius: 10,
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