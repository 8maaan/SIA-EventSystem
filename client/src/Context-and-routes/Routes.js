import { UserAuth } from './AuthContext'
import { useEffect, useState } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim'
import PageNotFound from '../Pages/PageNotFound';

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
    const userEmail = user ? user.email : null;
    const [isOrganizer, setIsOrganizer] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
  
    useEffect(() => {
      const checkIsOrganizer = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "organizers"));
          const organizers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const userIsOrganizer = organizers.some((organizer) => organizer.email === userEmail);
          setIsOrganizer(userIsOrganizer);
        } catch (error) {
          setIsOrganizer(false);
        } finally {
          setIsLoading(false); 
        }
      };
  
      checkIsOrganizer();
    }, [userEmail]);
  
    if (isLoading) {
        return <div><ReusableLoadingAnim /></div>;
    }
  
    if (user && isOrganizer) {
      return children;
    }
  
    return <PageNotFound />;
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
