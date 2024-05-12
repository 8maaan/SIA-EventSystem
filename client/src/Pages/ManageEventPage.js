import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import '../PagesCSS/ManageEventPage.css';
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim';

const ManageEventPage = () => {
    useEffect(() => {
        getEvents();
    },[]);

    const navigateTo = useNavigate();

    const [events, setEvents] = useState(null);

    const handleCreate = () => {
        navigateTo('/create-event');
    };

    const handleEdit = (event) => {
        navigateTo(`/edit-event/${event.id}`);
    };

    const handleView = (event) => {
        navigateTo(`/manage-event/${event.id}`);
    };

    const getEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "event"));
            const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            // Loop through each event and check if eventTimestamp exists before converting it
            events.forEach(event => {
                if (event.eventTimestamp) {
                    event.eventTimestamp = new Date(event.eventTimestamp.toDate().toString()).toLocaleString() // Convert to string
                }
            });
    
            setEvents(events);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{display: 'inline-block', marginTop:'1.5%'}}>
            <h1 style={{fontSize: '40px', color:'maroon'}}>Manage Events</h1>
            <div style={{display: 'flex', justifyContent: 'right',}}>
                <Button 
                    variant="contained" 
                    sx={{marginBottom:'30px',background: '#faaa0a', color: 'white', fontWeight: '600', '&:hover': {backgroundColor: '#d69500'} }} 
                    onClick={handleCreate}
                >
                    Create Event
                </Button>
            </div>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{backgroundColor: 'rgba(44, 44, 44, 1)', padding:' 2.5%'}}>
                        {events ? (
                                events.map((event) => (
                                <Grid item xs={12} sm={6} md={3} lg={3} key={event.id}>
                                    <Card sx={{height:'100%', backgroundColor: 'rgba(88, 88, 88, 1)', color: 'white',}}>
                                        <CardContent sx={{height:'50%'}}>
                                            <Typography variant="h5" style={{display: 'flex', textAlign: 'left'}}>
                                                {event.eventName}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5, textAlign:'left'}} color="#FFFFF2">
                                                {event.eventDepartment}
                                            </Typography>
                                            <Typography sx={{textAlign: 'left'}}>
                                                {event.eventTimestamp}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button size="small" onClick={() => handleEdit(event)} sx={{fontWeight: 700, color: 'white', background: '#800000', '&:hover': {backgroundColor: '#4d0606'} }}>Edit</Button>
                                            <Button size="small" onClick={() => handleView(event)} sx={{fontWeight: 700, color: 'white', background: '#800000', '&:hover': {backgroundColor: '#4d0606'} }}>View</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                ))
                        ) : (
                            <ReusableLoadingAnim/>
                        )
                        }
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default ManageEventPage;
