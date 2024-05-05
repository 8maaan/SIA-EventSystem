
import { Navigate } from 'react-router-dom'
import { UserAuth } from './AuthContext'
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim'

// TO BE OPTIMIZED

// IF USER NOT LOGGED IN, PREVENT ACCESS, REDIRECT TO /LOGIN
export const ProtectedRoute = ({children}) => {
    const { user, loading } = UserAuth();

    if(loading){
        return <div><ReusableLoadingAnim/></div>
    }

    if(user){
        return children;
    }

    return <Navigate to='/'/>
}

// SIMILAR TO ProtectedRoute() BUT FOR LOGGED IN USERS
export const GuestRoute = ({children}) => {
    const { user, loading} = UserAuth();

    if(loading){
        return <div>Loading...</div>;
    }
    
    if(!user){
        return children
    }

    return <div>Page Not Found</div>
}
