import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ReusableDialog = ({ status, onClose, title, context, confirmText = "Confirm", cancelText = "Cancel", isSuccess = false }) => {
  const [open, setOpen] = useState(status);

  useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = (confirmed) => {
    setOpen(false);
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
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          {!isSuccess && (
            <>
              <Button 
                variant="contained" 
                onClick={() => handleClose(true)} 
                autoFocus
                sx={{
                  backgroundColor: '#faaa0a', 
                  color: 'white', 
                  borderRadius: '5px', 
                  fontWeight: '600',
                  width: '30%',
                  '&:hover': { backgroundColor: '#d69500' }
                }}
              >
                {confirmText}
              </Button>
              <Button 
                variant="contained" 
                onClick={() => handleClose(false)}
                sx={{
                  backgroundColor: '#8a252c', 
                  color: 'white', 
                  borderRadius: '5px', 
                  fontWeight: '600',
                  width: '30%',
                  '&:hover': { backgroundColor: '#4d0606' }
                }}
              >
                {cancelText}
              </Button>
            </>
          )}
          {isSuccess && (
            <Button 
              variant="contained" 
              onClick={() => handleClose(false)}
              sx={{
                backgroundColor: '#1976d2', 
                color: 'white', 
                borderRadius: '5px', 
                fontWeight: '600',
                width: '30%',
                '&:hover': { backgroundColor: '#145ca0' }
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReusableDialog;
