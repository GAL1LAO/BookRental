import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/Home';
import RentScreen from './screens/Rent';
import ProfileScreen from './screens/Profile';

//Screen names
const homeName = "Home";
const rentName = "Rent";
const profileName = "Profile";


const Tab = createBottomTabNavigator();

function MainContainer() {
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
                } else if (rn === rentName) {
                    iconName = focused ? 'qr-code' : 'qr-code-outline';
                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                } 

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={rentName} component={RentScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;