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

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const value = {
        currentUser,
        signUp,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
