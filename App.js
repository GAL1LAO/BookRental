import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/Login';
import React, {useState} from 'react';
import LoadingScreen from './navigation/screens/LoadingScreen';
import { Alert } from 'react-native';

export const AuthContext = React.createContext();
export const UserContext = React.createContext()


export default function App() {
  const serverUrl = 'http://'+ process.env.localIP +':3000'
  const [short, setShort] = useState(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            role: action.role
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {//TODO: not used yet, maybe needed to 'keep logged in'
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);
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

