import { UserAuth } from './AuthContext'
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim'
import PageNotFound from '../Pages/PageNotFound';
import { useUserRoles } from '../ReusableComponents/useUserRoles';

// TO BE OPTIMIZED
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

export const AdminRoute = ({children}) => {
  const { user } = UserAuth();
  const { isAdmin } = useUserRoles(user ? user.email : null);
  
  if (!user) {
    return <PageNotFound />;
  }

  if (isAdmin === null){
    return <div><ReusableLoadingAnim/></div>;
  }
  return isAdmin ? children : <PageNotFound />;
}


