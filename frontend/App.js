import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/Login';
import React, { useState } from 'react';
import LoadingScreen from './navigation/screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});


export const AuthContext = React.createContext();
export const UserContext = React.createContext();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const serverUrl = 'http://'+ process.env.localIP +':3000'
  console.log(process.env.localIP);
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
            role: null,
            lastName: null,
            firstName: null,
            title: null,
            mailAddress: null,
            phoneNumber: null,
            birthDate: null,
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
        console.log("beofre fetch userbyshort")
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
  const authContext = React.useMemo(
    () => ({
      signIn: async (short, password) => {
        console.log("in method signIn");
      
        if(!password || password === null){
          alert("Passwort leer.","Bitte geben sie ein Passwort ein.");
          return;
        }
      
        if(!short || short === null){ 
          alert("Benutzername leer.","Bitte geben sie ihren Benutzernamen ein.");
          return;
        }
      
        let result;
        await fetch(serverUrl + '/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify({ 
            "short": short, 
            "password": password
          })
        })
        .then(response => response.json()) 
        .then(serverResponse => {
          console.log(serverResponse);
          result = serverResponse;
        });
      
        if(result === null || result.length === 0){
          alert("Login fehlgeschlagen","Falscher Benutzername oder falsches Passwort.");
          return;
        } else {
          AsyncStorage.setItem('token', JSON.stringify(short))
          dispatch({ type: 'SIGN_IN', token: short, role:result[0].role, lastName:result[0].lastName, firstName:result[0].firstName, title:result[0].title, mailAddress:result[0].mailAddress, phoneNumber:result[0].phoneNumber, birthDate:result[0].birthDate }); // Use shortValue here
        }
      },
      
      signOut: () => {
        AsyncStorage.setItem('token', null)
        dispatch({ type: 'SIGN_OUT' })},
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

