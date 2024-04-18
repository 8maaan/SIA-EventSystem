import React from 'react';
import { UserAuth } from '../Context-and-routes/AuthContext';
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';
import { Typography } from '@mui/material';
import "../PagesCSS/UserProfile.css";
import Avatar from '@mui/material/Avatar';
import DefaultProfileImage from '../ReusableComponents/Default-profile.jpg'; // Replace with the correct path to your default profile image

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
                    <Typography variant="h7" className="Fname" sx={{ marginTop: 5, marginRight: 20 }}>First Name: </Typography>
                    <Typography variant="h7" className="Lname" sx={{ marginRight: 20 }}>Last Name: </Typography>
                    <Typography variant="h7" className="Number" sx={{ marginRight: 22 }}>Number: </Typography>
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






