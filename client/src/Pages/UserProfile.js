import React from 'react';
import { UserAuth } from '../Context-and-routes/AuthContext';
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';
import { Typography } from '@mui/material';
import "../PagesCSS/UserProfile.css";
import EditableInfoContainer from '../ReusableComponents/ReusableUserInfoContainer';
import Avatar from '@mui/material/Avatar';
import DefaultProfileImage from '../image/Default-profile.jpg';

const UserProfile = () => {
  const { user } = UserAuth();

  return (
    <div className="Container-page">
      <ReusableAppBar />
      <div className="user-profile-wrapper">
        <div className="profile-container">
          <div className="profile-section">
            {user ? (
              <div className="profile-info">
                <div className="center-container">
                  <div className="profile-image-container">
                    <Typography variant="h7" className="welcome-message"sx={{ marginRight: 5 }}>Welcome, {user.displayName || 'User'}!</Typography>
                    <Avatar
                      alt="Profile Picture"
                      src={user.photoURL || DefaultProfileImage}
                      sx={{ width: 80, height: 80, marginLeft: 30, marginTop: 3 }}
                    />
                    <div className="email-container">
                      <Typography sx={{ marginRight: 5 }}>{user.email}</Typography>
                    </div>
                  </div>
                </div>
                <div className="additional-info">
                    <EditableInfoContainer 
                    title="First Name: "
                    content={user.firstName || 'N/A'}
                    
                    />
                    <EditableInfoContainer 
                    title="Last Name: "
                    content={user.lastName || 'N/A'}
                    
                    />
                    <EditableInfoContainer 
                    title="Number: "
                    content={user.number || 'N/A'}
                    
                    />
                  </div>
              </div>
            ) : (
              <Typography>Please sign in to view your profile.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;






