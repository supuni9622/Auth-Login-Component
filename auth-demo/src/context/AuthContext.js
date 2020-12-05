import React, {useContext, useState, useCallback, useEffect} from 'react';
import app, {auth} from '../firebase.config';
import firebase from 'firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);

    const signUp = useCallback((email,password) => {
        // This is firebase function and here we call it 
        return auth.createUserWithEmailAndPassword(email,password);

    },[]);

    const login = useCallback((email,password) => {

      // This is firebase function and here we call it 
        return auth.signInWithEmailAndPassword(email, password)

    },[]);

    const logout = useCallback(() => {

        // This is firebase function and here we call it 
        return auth.signOut();
  
      },[]);

    const resetPassword = useCallback((email) => {

        // This is firebase function and here we call it 
        return auth.sendPasswordResetEmail(email);
  
    },[]);

    const updateEmail = useCallback((email) => {

        // This is firebase function and here we call it 
        return currentUser.updateEmail(email);
  
    },[currentUser]);

    const updatePassword = useCallback((password) => {

        // This is firebase function and here we call it 
        return currentUser.updatePassword(password);
  
    },[currentUser]);

    // TO DO : Keep a session to avoid logout after refreshing for a certain time period

    // const readSession = () => {
    //     const user = window.sessionStorage.getItem(
    //             `firebase:authUser:${app.apiKey}:[DEFAULT]`
    //         );
    //         if (user) setLoggedIn(true)
    //   }

    // useEffect(() => {
    //     readSession()
    //   }, [])

    const googleSignupLogin = useCallback(() => {

        var provider = new firebase.auth.GoogleAuthProvider();
        // This is firebase function and here we call it 
        return auth.signInWithPopup(provider);
    
    },[]);
    
    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        googleSignupLogin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
