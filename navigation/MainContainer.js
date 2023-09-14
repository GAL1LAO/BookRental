import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import LendScreen from './screens/Lend';
import ProfileScreen from './screens/Profile';
import AdminScreen from './screens/Admin';
import { UserContext } from '../App';

const homeName = "Home";
const lendName = "Leihen";
const profileName = "Profil";
const adminName = "Admin";


const Tab = createBottomTabNavigator();

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
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={lendName} component={LendScreen} />
          <Tab.Screen name={profileName} component={ProfileScreen}/>
          {role == "adm" ? (
            <Tab.Screen name ={adminName} component={AdminScreen}></Tab.Screen>
          ) : (
            <></>
          )}
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default MainContainer;