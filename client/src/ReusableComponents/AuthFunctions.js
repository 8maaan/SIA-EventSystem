// CURRENTLY NOT USED
// TO BE FIXED LATER IF POSSIBLE

import { UserAuth } from '../Context-and-routes/AuthContext';

const { signInWithMicrosoft, logOut } = UserAuth();

export const handleSignIn = async (event) =>{
    event.preventDefault();
    try{
        const signIn = await signInWithMicrosoft();
        console.log(signIn);
    }catch(e){
        console.log(e.message);
    }
}

export const handleSignOut = async () =>{
    try{
        const signOut = await logOut();
        console.log(signOut);
        console.log('You are logged out');
    }catch (e){
        console.log(e.message);
    }
}

export const handleEdit = async (event) =>{
    
}

