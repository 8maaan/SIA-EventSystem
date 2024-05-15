import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context-and-routes/AuthContext';
import { db } from "../Firebase/firebaseConfig";
import '../PagesCSS/ManageEventPage.css';
import ReusableDialog from '../ReusableComponents/ReusableDialog';
import ReusableSnackBar from '../ReusableComponents/ReusableSnackBar';

const ManageEventPage = () => {
    const navigateTo = useNavigate();
    const { user } = UserAuth();
    const [events, setEvents] = useState(null); 
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [snackbar, setSnackbar] = useState({ status: false, severity: '', message: '' });

    const handleSnackbarOpen = (severity, message) => {
        setSnackbar({ status: true, severity, message });
    };

    const handleSnackbarClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };

    // For delete confirmation
    const [openDialog, setOpenDialog] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const handleOpenDialog = (event) => {
        setEventToDelete(event);
        setOpenDialog(true);
    };

    const handleConfirmationDialogClose = async (confirmed) => {
        setOpenDialog(false);
        if (confirmed && eventToDelete) {
            await handleDelete(eventToDelete);
        }
    };

    const handleDelete = async (event) => {
        setLoadingDelete(true);
        try {
            const docRef = doc(db, 'event', event.id);
            await deleteDoc(docRef);
            handleSnackbarOpen('success', 'Event has been deleted successfully');
            window.location.reload();
        } catch (e) {
            console.error('No such document!', e);
            handleSnackbarOpen('error', 'Error deleting an event, try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleCreate = () => {
        navigateTo('/create-event');
    };

    const handleEdit = (event) => {
        navigateTo(`/edit-event/${event.id}`);
    };

    const getEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "event"));
            const events = querySnapshot.docs.map(doc => {
                const data = doc.data();
                data.eventTimestamp = data.eventTimestamp.toDate();
                return { id: doc.id, ...data };
            }).filter(event => user.uid === event.eventOrganizerID);
            setEvents(events);
        } catch (e) {
            console.error(e);
        }
    };

    const dateFormatter = (timestamp) => {
        const formatDate = timestamp.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const formatTime = timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return `${formatDate} - ${formatTime}`;
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div style={{ display: 'flex', marginTop: '1.5%', flexDirection:'column'}}>
            <h1 style={{ fontSize: '40px', color: 'maroon' }}>Manage Events</h1>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                    variant="contained"
                    sx={{ marginBottom: '30px', marginRight: '1%', background: '#faaa0a', color: 'white', fontWeight: '600', '&:hover': { backgroundColor: '#d69500' } }}
                    onClick={handleCreate}
                >
                    Create Event
                </Button>
            </div>
            <Grid container spacing={2} sx={{ backgroundColor: 'rgba(44, 44, 44, 1)', display: 'flex', justifyContent: 'left', padding: '1.5%', flexWrap: 'wrap'}}>
                {events === null ? (
                    <CircularProgress color="inherit" />
                ) : events.length === 0 ? (
                    <Typography variant="h6" color="white">No Events</Typography>
                ) : (
                    events.map((event, idx) => (
                        <Grid item key={event.id}>
                            <Card sx={{ backgroundColor: 'rgba(88, 88, 88, 1)', color: 'white'}}>
                                <Link to={`/manage-event/${event.id}`} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardContent>
                                        <Typography variant="h5" style={{ textAlign: 'left' }}>
                                            {event.eventName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5, textAlign: 'left' }} color="#FFFFF2">
                                            {event.eventDepartment}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left' }}>
                                            {dateFormatter(event.eventTimestamp)}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left' }}>
                                            {event.eventOrganizer ? event.eventOrganizer : 'null'}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button size="small" sx={{ fontWeight: 700, color: 'white', background: '#800000', '&:hover': { backgroundColor: '#4d0606' } }} onClick={() => handleOpenDialog(event)}>
                                        {loadingDelete ? <CircularProgress color='inherit' size={'1.5rem'} /> : 'Delete'}
                                    </Button>
                                    <Button size="small" onClick={() => handleEdit(event)} sx={{ fontWeight: 700, color: 'white', background: '#faaa0a', '&:hover': { backgroundColor: '#d69500' } }}>Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
            {snackbar && <ReusableSnackBar open={snackbar.status} onClose={handleSnackbarClose} severity={snackbar.severity} message={snackbar.message} />}
            {openDialog && <ReusableDialog status={true} onClose={handleConfirmationDialogClose} title={"Are you sure you want to delete this event?"} />}
        </div>
    );
};

export default ManageEventPage;
