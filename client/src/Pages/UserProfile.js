import React, { useState, useEffect } from 'react';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { Typography, Avatar, Box, Button, List, ListItem, ListItemText, TextField, Grid, Chip, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../PagesCSS/UserProfile.css";
import WildCatsLogo from '../Images/WildCatsLogo.jpg';
import { db } from '../Firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import ReusableDialog from '../ReusableComponents/ReusableDialog';
import NotificationModal from '../ReusableComponents/Notifications';

const UserProfile = () => {
  const { user } = UserAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);

  useEffect(() => {
    const checkIfOrganizer = async () => {
      if (user && user.email) {
        const organizersRef = collection(db, 'organizers');
        const applicantsRef = collection(db, 'organizerApplicants');

        const qOrganizer = query(organizersRef, where("email", "==", user.email));
        const qApplicant = query(applicantsRef, where("email", "==", user.email));

        const [organizerSnapshot, applicantSnapshot] = await Promise.all([
          getDocs(qOrganizer),
          getDocs(qApplicant),
        ]);

        if (!organizerSnapshot.empty) {
          setIsOrganizer(true);
        }

        if (!applicantSnapshot.empty) {
          setHasApplied(true);
        }
      }
    };

    checkIfOrganizer();
  }, [user]);

  const handleApplyAsOrganizer = async () => {
    if (!user || !user.email) {
      setDialogTitle('Error');
      setDialogMessage('User information is not available!');
      setIsSuccess(false);
      setOpenDialog(true);
      return;
    }

    try {
      await addDoc(collection(db, 'organizerApplicants'), {
        id_number: user.school_id_number || '00-0000-000',
        displayName: user.displayName || 'John Doe',
        email: user.email || 'user@email.com'
      });
      setDialogTitle('Success');
      setDialogMessage('Application submitted successfully!');
      setIsSuccess(true);
      setOpenDialog(true);
      setHasApplied(true);  // mao ni mag pugong sa user para mo apply balik kung ni apply na
    } catch (e) {
      console.error('Error adding document: ', e);
      setDialogTitle('Error');
      setDialogMessage('Failed to submit application.');
      setIsSuccess(true);
      setOpenDialog(true);
    }
  };

  const handleOpenNotificationModal = () => {
    setOpenNotificationModal(true);
  };

  const handleCloseNotificationModal = () => {
    setOpenNotificationModal(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className="container-page">
      <Box className="user-profile-wrapper" sx={{ mt: 4 }}>
        <Grid container>
          <Grid item xs={12} md={4} className="sidebar" sx={{ p: 2 }}>
            <Avatar
              alt="Profile Picture"
              src={user.photoURL || WildCatsLogo}
              sx={{ width: '7rem', height: '7rem', mb: 2 }}
            />
            <List>
              <ListItem>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem onClick={handleOpenNotificationModal}>
                <ListItemText primary="Notifications" />
                <IconButton edge="end" color="inherit" onClick={handleOpenNotificationModal}>
                  <NotificationsIcon />
                </IconButton>
              </ListItem>
              <ListItem onClick={handleApplyAsOrganizer} disabled={isOrganizer || hasApplied}>
                <ListItemText primary="Apply as Organizer" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={8} className="profile-details" sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Profile
            </Typography>
            {isOrganizer && (
              <Chip
                label="Organizer"
                color="success"
                sx={{ mb: 2 }}
              />
            )}
            {hasApplied && !isOrganizer && (
              <Chip
                label="Application Submitted"
                color="warning"
                sx={{ mb: 2 }}
              />
            )}
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="First Name" variant="outlined" defaultValue={user?.displayName || 'John'} className="customTextField" />
              <TextField label="Id" variant="outlined" defaultValue={user?.school_id_number || '00-0000-000'} className="customTextField" />
              <TextField label="Email Address" variant="outlined" defaultValue={user?.email || 'user@email.com'} className="customTextField" disabled />
              <Button
                className='customButton'
                component="a"
                href="https://account.microsoft.com/profile/"
                variant="contained"
                sx={{ mt: 2, bgcolor: '#1976d2', color: '#fff' }}
              >
                Edit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NotificationModal
        open={openNotificationModal}
        handleClose={handleCloseNotificationModal}
        userEmail={user?.email}
      />
      <ReusableDialog
        status={openDialog}
        onClose={handleCloseDialog}
        title={dialogTitle}
        context={dialogMessage}
        isSuccess={isSuccess}
      />
    </Box>
  );
};

export default UserProfile;














