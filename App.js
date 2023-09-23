import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/Login';
import React, { useState } from 'react';
import LoadingScreen from './navigation/screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = React.createContext();
export const UserContext = React.createContext()


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const serverUrl = 'http://'+ process.env.localIP +':3000'
  const [short, setShort] = useState(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            userToken: action.token,
            role: action.role,
            lastName: action.lastName,
            firstName: action.firstName,
            title: action.title,
            mailAddress: action.mailAddress,
            phoneNumber: action.phoneNumber,
            birthDate: action.birthDate,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            role: action.role,
            lastName: action.lastName,
            firstName: action.firstName,
            title: action.title,
            mailAddress: action.mailAddress,
            phoneNumber: action.phoneNumber,
            birthDate: action.birthDate,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'NO_TOKEN' : 
          return{
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = await AsyncStorage.getItem("token")
      console.log(userToken)
      userToken = JSON.parse(userToken)
      console.log(userToken)
      if(userToken){
        let result
        await fetch(serverUrl + '/userByShort',{
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify({ 
              "short": userToken,
          })
        })
        .then(response => response.json()) 
        .then(serverResponse => {
          console.log(serverResponse)
          result = serverResponse[0]
      })
      console.log(result)
        dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: result.role, title: result.title, firstName: result.firstName, lastName: result.lastName, mailAddress: result.mailAddress, phoneNumber: result.phoneNumber, birthDate: result.birthDate });
      }else{
        dispatch({ type : 'NO_TOKEN'})
      }
    };
    bootstrapAsync();
  }, []);
  console.log(state.userToken)
  console.log(state.isLoading)
  const authContext = React.useMemo(
    () => ({
      signIn: async (shortValue, password) => {
        console.log("in method signIn");
      
        if(!password || password === null){
          Alert.alert("Passwort leer.","Bitte geben sie ein Passwort ein.");
          return;
        }
      
        if(!shortValue || shortValue === null){ 
          Alert.alert("Benutzername leer.","Bitte geben sie ihren Benutzernamen ein.");
          return;
        }
      
        let result;
        await fetch(serverUrl + '/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify({ 
            "short": shortValue, 
            "password": password
          })
        })
        .then(response => response.json()) 
        .then(serverResponse => {
          console.log(serverResponse);
          result = serverResponse;
        });
      
        if(result === null || result.length === 0){
          Alert.alert("Login fehlgeschlagen","Falscher Benutzername oder falsches Passwort.");
          return;
        } else {
          //TODO: keep logged in
          dispatch({ type: 'SIGN_IN', token: shortValue, role:result[0].role }); // Use shortValue here
        }
      },
      
      signOut: () => dispatch({ type: 'SIGN_OUT' }), //TODO: use signOut
    }),
    []
  );
  const userContext = {
    userToken : state.userToken,
    role : state.role,
    short,
    setShort,
    lastName: state.lastName,
    firstName: state.firstName,
    title: state.title,
    mailAddress: state.mailAddress,
    phoneNumber: state.phoneNumber,
    birthDate: state.birthDate
  }

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={userContext}>
        {state.isLoading ? (
            // We haven't finished checking for the token yet
            <LoadingScreen/>
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <LoginScreen/>
          ) : (
            // User is signed in
            <MainContainer/>
          )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

