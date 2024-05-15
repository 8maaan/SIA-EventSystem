import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { db } from '../Firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import ReusableDialog from '../ReusableComponents/ReusableDialog';

const OrganizerApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      const querySnapshot = await getDocs(collection(db, 'organizerApplicants'));
      const applicantsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplicants(applicantsList);
    };

    fetchApplicants();
  }, []);

  const handleDelete = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await deleteDoc(doc(db, 'organizerApplicants', id));
        setApplicants(applicants.filter(applicant => applicant.id !== id));
        setDialogTitle('Success');
        setDialogContext('Applicant successfully deleted.');
        setIsSuccess(true);
        setDialogOpen(true);
      } catch (error) {
        console.error('Error deleting applicant: ', error);
      }
    });
    setDialogTitle('Confirm Delete');
    setDialogContext('Are you sure you want to decline this applicant?');
    setIsSuccess(false);
    setDialogOpen(true);
  };

  const handleApprove = async (id) => {
    setConfirmAction(() => async () => {
      try {
        const applicant = applicants.find(applicant => applicant.id === id);
        if (applicant) {
          await setDoc(doc(db, 'organizers', id), {
            email: applicant.email,
            displayName: applicant.displayName,
            id_number: applicant.id_number
          });
          await deleteDoc(doc(db, 'organizerApplicants', id));

          // Create notification for the applicant
          await addDoc(collection(db, 'notification'), {
            recipient: applicant.email,
            message: 'Your application to become an organizer has been approved.',
            timestamp: new Date()
          });

          setApplicants(applicants.filter(applicant => applicant.id !== id));
          setDialogTitle('Success');
          setDialogContext('Applicant successfully approved.');
          setIsSuccess(true);
          setDialogOpen(true);
        }
      } catch (error) {
        console.error('Error approving applicant: ', error);
      }
    });
    setDialogTitle('Confirm Approve');
    setDialogContext('Are you sure you want to approve this applicant?');
    setIsSuccess(false);
    setDialogOpen(true);
  };

  const handleCloseDialog = (confirmed) => {
    setDialogOpen(false);
    if (confirmed && confirmAction) {
      confirmAction();
    }
  };

  return (
    <div className='oa-body'>
      <div className='table-container'>
        <Typography variant='h4' sx={{ mb: 5, mt: 6, color: 'maroon' }}>Manage Organizer Applications</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id Number</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map(applicant => (
                <TableRow key={applicant.id}>
                  <TableCell align="center">{applicant.id_number}</TableCell>
                  <TableCell align="center">{applicant.displayName}</TableCell>
                  <TableCell align="center">{applicant.email}</TableCell>
                  <TableCell align="center">
                    <IconButton variant='contained' sx={{ mr: 0.5, color: 'maroon' }} onClick={() => handleDelete(applicant.id)}>
                      <DeleteIcon fontSize='large' />
                    </IconButton>
                    <IconButton variant='contained' sx={{ ml: 0.5, color: 'green' }} onClick={() => handleApprove(applicant.id)}>
                      <CheckIcon fontSize='large' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ReusableDialog
        status={dialogOpen}
        onClose={handleCloseDialog}
        title={dialogTitle}
        context={dialogContext}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default OrganizerApplicants;



