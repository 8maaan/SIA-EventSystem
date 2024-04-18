import {
    OAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    validatePassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../Firebase/firebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const provider = new OAuthProvider('microsoft.com');

    // REGISTER A USER
    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // LOG-IN
    const signIn = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithMicrosoft = () =>{
        return signInWithPopup(auth, provider);
    }

    // SIGN OUT
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // VALIDATE PASSWORD

    const validateUserPassword = async (password) => {
        return validatePassword(auth, password);
    }
    
    // SEND PASSWORD RESET EMAIL
    const sendPasswordReset = (email) =>{
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    },[]);

    return (
        <UserContext.Provider value={{ createUser, user, logOut, signIn, loading, validateUserPassword, sendPasswordReset, signInWithMicrosoft }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}