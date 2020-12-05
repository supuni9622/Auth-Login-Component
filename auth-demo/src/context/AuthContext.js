import React, {useContext, useState, useCallback, useEffect} from 'react';
import {auth} from '../firebase.config';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState();

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
        return auth.reset(email);
  
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
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
