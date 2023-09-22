import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import LendScreen from './screens/Lend';
import ProfileScreen from './screens/Profile';
import AdminScreen from './screens/administrationScreens/Admin';
import DetailScreen from './screens/Detail';
import App, { UserContext } from '../App';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUserScreen from './screens/administrationScreens/AddUser';
import AddItemScreen from './screens/administrationScreens/AddItem';
import ViewDamageScreen from './screens/administrationScreens/ViewDamages';
import UserAdministrationScreen from './screens/administrationScreens/UserAdministration';
import UserDetailScreen from './screens/UserDetail';
import ItemAdministrationScreen from './screens/administrationScreens/ItemAdministration';
import ItemAdministrationDetailScreen from './screens/administrationScreens/ItemAdministrationDetail';



const homeName = "Home";
const lendName = "Leihen";
const profileName = "Profil";
const adminName = "Admin";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          
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
        <Stack.Screen name="UserAdministration" component={UserAdministrationStack} options={{headerShown: false}}/>
        <Stack.Screen name="ItemAdministration" component={ItemAdministrationStack} options={{headerShown: false}}/>
        <Stack.Screen name="ViewDamages" component={ViewDamageScreen}/>
      </Stack.Navigator>
  );
}

function UserAdministrationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="UserAdministration"
          component={UserAdministrationScreen}
        />
        <Stack.Screen name="AddUser" component={AddUserScreen}/>
        <Stack.Screen name="UserDetail" component={UserDetailScreen}/>
      </Stack.Navigator>
  );
}

function ItemAdministrationStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="ItemAdministration"
          component={ItemAdministrationScreen}
        />
        <Stack.Screen name="AddItem" component={AddItemScreen}/>
        <Stack.Screen name="ItemAdminDetail" component={ItemAdministrationDetailScreen}/>
      </Stack.Navigator>
  );
}


function MainContainer() {
  const {role} = React.useContext(UserContext)
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#3EB489",
            tabBarInactiveTintColor: "white",
            tabBarLabelStyle: {paddingBottom: 10, fontSize: 15 },
            tabBarStyle: {backgroundColor: '#246EE9', padding: 10, height: 80},
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (rn === lendName) {
                    iconName = focused ? 'qr-code' : 'qr-code-outline';
                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (rn = adminName) {
                  iconName = focused ? 'pencil' : 'pencil-outline'
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>
          <Tab.Screen name={homeName} component={HomeStack} options={{headerShown: false}}/>
          <Tab.Screen name={lendName} component={LendScreen} />
          <Tab.Screen name={profileName} component={ProfileStack} options={{headerShown: false}}/>
          {role == "adm" ? (
            <Tab.Screen name ={adminName} component={AdminStack} options={{headerShown: false}}></Tab.Screen>
          ) : (
            <></>
          )}
        </Tab.Navigator>
        
      </NavigationContainer>
  );
}

export default MainContainer;