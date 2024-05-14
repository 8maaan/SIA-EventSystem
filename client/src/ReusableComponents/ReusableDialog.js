import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ReusableDialog = ({ status, onClose, title, context}) => {
  const [open, setOpen] = useState(status);

  useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = (confirmed) => {
    setOpen(false);
    // Pass the status value to the callback function
    onClose && onClose(confirmed);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* The title for the dialog */}
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Add any additional content here if needed */}
            {context}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {/* Options */}
          <Button 
            variant="contained" 
            onClick={() => handleClose(true)} 
            autoFocus
            sx={{
                backgroundColor: '#faaa0a', 
                color: 'white', 
                borderRadius: '5px', 
                fontWeight:'600',
                width:'30%',
                '&:hover': {backgroundColor: '#d69500'}
            }}
        >
            Confirm
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleClose(false)}
            sx={{
                backgroundColor: '#8a252c', 
                color: 'white', 
                borderRadius: '5px', 
                fontWeight:'600',
                width:'30%',
                '&:hover': {backgroundColor: '#4d0606'}
            }}
        >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReusableDialog;