import { Button, Card, CardActions, CardContent, FormControl, MenuItem, Select, Typography } from '@mui/material';
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
    
    const navigateTo = useNavigate();
    const [events, setEvents] = useState(null);
    const [eventChoice, setEventChoice] = useState('All Events');
    const [filteredEvents, setFilteredEvents] = useState(null);

    const handleChange = (event) => {
        setEventChoice(event.target.value);
      };
    
      const filterEvents = (events, eventChoice) => {
        const today = new Date();
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);
      
        switch (eventChoice) {
          case 'This Week':
            return events.filter(event => event.eventTimestamp >= today && event.eventTimestamp <= endOfWeek)
                        .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
          case 'Upcoming Events':
            return events.filter(event => event.eventTimestamp > endOfWeek)
                        .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
          default:
            return events.filter(event => event.eventTimestamp >= today)
                        .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
        }
      };

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
            const events = querySnapshot.docs.map(doc => {
                const data = doc.data();
                data.eventTimestamp = data.eventTimestamp.toDate();
                return { id: doc.id, ...data };
              });
    
            setEvents(events);
        } catch (e) {
            console.error(e);
        }
    };

    const dateFormatter= (timestamp) => {
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
    }


    useEffect(() => {
        getEvents();
    },[]);

    useEffect(() => {
        if (events) {
          const filteredEvents = filterEvents(events, eventChoice);
          setFilteredEvents(filteredEvents);
        }
      }, [events, eventChoice]);

    return (
        <div style={{display: 'inline-block', marginTop:'1.5%'}}>
            <h1 style={{fontSize: '40px', color:'maroon'}}>Manage Events</h1>
            <div style={{display: 'flex', justifyContent: 'right', gap: '10px', marginRight: '10px'}}>
                <FormControl size="small">
                        <Select value={eventChoice} onChange={handleChange}>
                            <MenuItem value={'All Events'}>All Events</MenuItem>
                            <MenuItem value={'This Week'}>This Week</MenuItem>
                            <MenuItem value={'Upcoming Events'}>Upcoming Events</MenuItem>
                        </Select>
                    </FormControl>
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
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 10 }} sx={{backgroundColor: 'rgba(44, 44, 44, 1)', padding:' 2.5%'}}>
                        {filteredEvents ? (
                                filteredEvents.map((event, idx) => (
                                <Grid item xs={12} sm={6} md={3} lg={5} key={idx}>
                                    <Card sx={{height:'100%', backgroundColor: 'rgba(88, 88, 88, 1)', color: 'white', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                        <CardContent sx={{ height: 'calc(100% - 56px)' }}>
                                            <Typography variant="h5" style={{display: 'flex', textAlign: 'left'}}>
                                                {event.eventName}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5, textAlign:'left'}} color="#FFFFF2">
                                                {event.eventDepartment}
                                            </Typography>
                                            <Typography sx={{textAlign: 'left'}}>
                                                {dateFormatter(event.eventTimestamp)}
                                            </Typography>
                                            <Typography sx={{textAlign: 'left', color: 'gold'}}>
                                                <Typography sx={{textAlign: 'left', color: 'gold'}}>
                                                    {event.eventOrganizer ? event.eventOrganizer : 'null'}
                                                </Typography>
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
