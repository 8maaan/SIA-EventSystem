import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import '../PagesCSS/ManageEventPage.css';
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(68, 68, 68, 1)',
    ...theme.typography.body2,
    padding: '50px',
    paddingLeft: '100px',
    paddingRight: '100px',
    textAlign: 'center',
    color: 'white',
  }));

const ManageEventPage = () => {

    useEffect(() => {
        getEvents();
    },[]);

    const navigateTo = useNavigate();

    const [events, setEvents] = useState(null);

    const handleCreate = () => {
        navigateTo('/create-event');
    }

    const handleEdit = (event) => {
        navigateTo(`/edit-event/${event.id}`);
    }
    const handleView = (event) => {
        navigateTo(`/manage-event/${event.id}`);
    }

    const getEvents = async () => {
        const querySnapshot = await getDocs(collection(db, "event"));
        const events = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setEvents(events)
    }



    return (
        <div>
            <ReusableAppBar/>
            <h1 style={{fontSize: '40px '}}>Manage Events</h1>
            <div style={{display: 'flex', justifyContent: 'right', marginRight: '30px'}}><Button className='Button' variant="contained" sx={{background: '#FFD700', color: 'black', fontWeight: '600'}} onClick={handleCreate}>Create Event</Button></div>
            <div style={{display: 'flex', margin:'30px', gap: '50px'}}>
                <Box sx={{ flexGrow: 1, justifyContent: 'center'}}>
                    <Grid container spacing={2} sx={{backgroundColor: 'rgba(44, 44, 44, 1)', padding: '20px', display: 'flex', flexWrap: 'wrap'}}>
                        {events ? (
                                events.map((event) => (
                                <Grid item xs={3} key={event.id}>
                                    <Card sx={{ minWidth: 275, backgroundColor: 'rgba(88, 88, 88, 1)', color: 'white' }}>
                                        <CardContent>
                                            <Typography variant="h5" style={{display: 'flex'}}>
                                                {event.eventName}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5, display: 'flex'}} color="#FFFFF2">
                                                {event.eventDescription}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{display: 'flex', justifyContent: 'right'}}>
                                            <Button size="small" onClick={() => handleEdit(event)} sx={{fontWeight: 700, color: 'white', background: '#800000'}}>Edit</Button>
                                            <Button size="small" onClick={() => handleView(event)} sx={{fontWeight: 700, color: 'white', background: '#800000'}}>View</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                ))
                        ) : (
                            <></>
                        )
                        }
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

export default ManageEventPage