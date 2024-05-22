import {Button, Box, Modal, Typography, Fade, Backdrop, TextField, Divider, CircularProgress} from '@mui/material'
import { useState } from 'react';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { db } from '../Firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '15px',
  p: 4,
  textAlign: 'center'
};

export default function LoginModal({ open, onClose}) {
  const { signIn, signInWithMicrosoft } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    setError(false);
    setLoading(true);
    try{
      const signInWithEmail = await signIn(email, password);
      onClose();
    }catch(e){
      console.error(e);
      setError(true);
    }
    setLoading(false);
  }

  const handleMicrosoftSignIn = async () =>{
    const pattern = /\b\d{2}-\d{4}-\d{3}\b/;
    try{
          const loginDetails = await signInWithMicrosoft();
          handleRegister(
            loginDetails.user.uid,
            loginDetails._tokenResponse.firstName.match(pattern)?.[0],
            loginDetails.user.email,
            loginDetails.user.displayName
          );
          onClose();
      }catch(e){
        console.error("Log in error. Try again later.");
      }
  }

  const handleRegister = async (uid, cid, email, displayName) => {
    try {
      await setDoc(
        doc(db, "user", uid),
        {
          uid: uid,
          school_id_number: cid,
          email: email,
          displayName: displayName,
        },
        { merge: true }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email" 
                sx={{mt: 2, width:'70%'}} 
                label="Email" 
                required
                onChange={(event) => {setEmail(event.target.value)}}
                error={error}
              />
              <TextField 
                type="password" 
                sx={{mt: 2, mb: 2, width:'70%'}} 
                label="Password" 
                required 
                onChange={(event) => {setPassword(event.target.value)}}
                error={error}
                helperText={error ? 'Incorrect email or password' : null}
              />
              <Button 
                type='submit' 
                variant='contained' 
                sx={{mb: 2, width:'70%', backgroundColor: '#8a252c', '&:hover': {backgroundColor: '#4d0606'}}}
              >
                {loading ? <CircularProgress size='1.7rem' color='inherit'/> : 'Sign In'}
              </Button>
            </form>
            <Divider spacing={2}>or continue with</Divider>
            <Button
              onClick={handleMicrosoftSignIn}
              variant='contained' 
              sx={{mt: 2, mb: 3, width:'70%'}} 
              startIcon={<img src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Microsoft-25.png" 
              alt="Microsoft Logo" 
              style={{marginRight: '10px'}}/>}
            >
              Sign in with Microsoft
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}