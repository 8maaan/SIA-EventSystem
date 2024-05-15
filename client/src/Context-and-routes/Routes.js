import { UserAuth } from './AuthContext'
import { useEffect, useState } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim'
import PageNotFound from '../Pages/PageNotFound';
import { useUserRoles } from '../ReusableComponents/useUserRoles';

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
  return <PageNotFound/>
}

export const OrganizerRoute = ({ children }) => {
  const { user } = UserAuth();
  const { isOrganizer } = useUserRoles(user ? user.email : null);

  if (!user) {
    return <PageNotFound />;
  }

  if (isOrganizer === null) {
    return <div><ReusableLoadingAnim /></div>;
  }

  return isOrganizer ? children : <PageNotFound />;
};

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
