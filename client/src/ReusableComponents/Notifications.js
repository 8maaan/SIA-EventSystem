import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { List, ListItem, ListItemText, Typography, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const NotificationModal = ({ open, handleClose, userEmail }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsRef = collection(db, 'notification');
      const q = query(notificationsRef, where('recipient', '==', userEmail));
      const querySnapshot = await getDocs(q);
      const notificationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationsList);
    };

    if (open) {
      fetchNotifications();
    }
  }, [userEmail, open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" id="notification-modal-title" gutterBottom>
            Notifications
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} secondary={notification.timestamp.toDate().toLocaleString()} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default NotificationModal;

