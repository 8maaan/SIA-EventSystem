import React, { useState, useEffect } from 'react';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { Typography, Avatar, Box, Button, List, ListItem, ListItemText, TextField, Grid, Chip, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../PagesCSS/UserProfile.css";
import WildCatsLogo from '../Images/WildCatsLogo.jpg';
import { db } from '../Firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import NotificationModal from '../ReusableComponents/Notifications';
import SnackbarComponent from '../ReusableComponents/ReusableSnackBar';
import ReusableDialog from '../ReusableComponents/ReusableDialog';

const UserProfile = () => {
  const { user } = UserAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

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

  const handleApplyAsOrganizer = () => {
    if (!isOrganizer && !hasApplied) {
      setOpenDialog(true);
      setConfirmAction(() => handleConfirmApply);
    } else {
      setSnackbarMessage('You have already applied or are an organizer.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleConfirmApply = async () => {
    setOpenDialog(false);
    if (!user || !user.email) {
      setSnackbarMessage('User information is not available!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await addDoc(collection(db, 'organizerApplicants'), {
        id_number: user.school_id_number || '00-0000-000',
        displayName: user.displayName || 'John Doe',
        email: user.email || 'user@email.com'
      });
      setHasApplied(true); 
      setSnackbarMessage('Application submitted successfully!');
      setSnackbarSeverity('success');
    } catch (e) {
      console.error('Error adding document: ', e);
      setSnackbarMessage('Failed to submit application.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseNotificationModal = () => {
    setOpenNotificationModal(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = (confirmed) => {
    setOpenDialog(false);
    if (confirmed && confirmAction) {
      confirmAction();
    }
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
              <ListItem onClick={handleCloseNotificationModal}>
                <ListItemText primary="Notifications" />
                <IconButton edge="end" color="inherit" onClick={handleCloseNotificationModal}>
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
      <SnackbarComponent
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <ReusableDialog
        status={openDialog}
        onClose={handleCloseDialog}
        title="Confirm Application"
        context="Are you sure you want to apply as an organizer?"
      />
    </Box>
  );
};

export default UserProfile;
