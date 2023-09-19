import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/Login';
import React from 'react';
import LoadingScreen from './navigation/screens/LoadingScreen';

export const AuthContext = React.createContext();
export const UserContext = React.createContext()


export default function App() {
  const serverUrl = 'http://'+ process.env.localIP +':3000'
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            role: action.role,
            isLoading: false,
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
      let userToken = 'abcd';//TODO: reset
      let role = 'adm'
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: role });
    };
    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (short, password) => {
        console.log("in method signIn")
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        if(!password ||password === null){
          alert("Passwort leer.","Bitte geben sie ein Passwort ein.")
          return
        }
        if(!short ||short === null){
            alert("Benutzername leer.","Bitte geben sie ihren Benutzernamen ein.")
            return
        }
        let result
        await fetch(serverUrl + '/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ 
                "short": short,
                "password": password
            })
          })
          .then(response => response.json()) 
          .then(serverResponse => {
            console.log(serverResponse)
            result = serverResponse
        })
        if(result === null || result.length === 0){
            alert("Login fehlgeschlagen","Falscher Benutzername oder falsches Passwort.")
            return
        }else{
            //TODO: keep logged in
            dispatch({ type: 'SIGN_IN', token: short, role:result[0].role, lastName:result[0].lastName, firstName:result[0].firstName, title:result[0].title, mailAddress:result[0].mailAddress, phoneNumber:result[0].phoneNumber, birthDate:result[0].birthDate });
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }), //TODO: use signOut
    }),
    []
  );
  const userContext = {
    userToken : state.userToken,
    role : state.role,
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

