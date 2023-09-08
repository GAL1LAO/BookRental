import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/Home';
import LendScreen from './screens/Lend';
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';

const homeName = "Home";
const lendName = "Leihen";
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
                } else if (rn === lendName) {
                    iconName = focused ? 'qr-code' : 'qr-code-outline';
                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                } 
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={lendName} component={LendScreen} />
          <Tab.Screen name={profileName} component={ProfileScreen}/>
          <Tab.Screen 
            name="Login" 
            component={LoginScreen}
            options={{title: 'Login'}}
          />  
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default MainContainer;