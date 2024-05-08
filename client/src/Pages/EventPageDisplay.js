import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../Firebase/firebaseConfig";
import ParticlesComponent from '../ReusableComponents/particles';
import "../PagesCSS/EventPage.css";
import Countdown from 'react-countdown';
import {
    Container, Grid, Paper, Typography, CardMedia, TextField, Button, Box
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const settings = {
    paper: {
        my: 5,
        p: '32px',  
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',  
        padding: '0px',
        background: 'linear-gradient(45deg, #DE3161 30%, #FF8E53 90%)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
        overflow: 'hidden',
        height: '400px',  
        fontWeight: 'bold',
        width: '100%',
        fontFamily: '"Biome W01 Regular", Arial, sans-serif',
        '& *': {
            color: 'black',
        },
    },
};

{/*}  katung original nga background without particles 
const StyledBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  backgroundColor: '#800000',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px) brightness(50%)',
  zIndex: -1, // Ensure this is the lowest in the visual stack
});  */}


const EventPageDisplay = () => {
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();
    {/* const navigate = useNavigate(); */ }

    useEffect(() => {
        const fetchEvent = async () => {
            const docRef = doc(db, 'event', eventId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const eventData = docSnap.data();
                eventData.eventTimestamp = eventData.eventTimestamp.toDate();
                setEvent(eventData);
            } else {
                console.log("No such document!");
            }
        };

        fetchEvent();
    }, [eventId]);

    const dateFormatter = (timestamp) => {
        return `${timestamp.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} - 
                ${timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    };

    const Completionist = () => <span>The event has started!</span>;

    const CountdownBox = ({ value, label }) => (
        <div className="countdown-box">
            <div>{value}</div>
            <div className="countdown-label">{label}</div>
        </div>
    );

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CountdownBox value={days} label="Days" />
                    <CountdownBox value={hours} label="Hours" />
                    <CountdownBox value={minutes} label="Minutes" />
                    <CountdownBox value={seconds} label="Seconds" />
                </div>
            );
        }
    };
    
    const StyledButton = styled(Button)({
        background: '#FF8E53',
        marginTop: '1.25rem', 
        padding: '0.625rem', 
        borderRadius:'12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: 'black',
        fontSize: '1.125rem',
        fontFamily: 'Biome W01 Regular',
        '&:hover': {
            background: '#E57A46', 
        } 
    });
    
    {/* Particles adjustments */}
    const ParticlesWrapper = styled('div')({
        position: 'absolute', 
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1, 
        pointerEvents: 'none', 
      });

    const style = {
        fontFamily: '"Biome W01 Regular", Arial, sans-serif'
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ParticlesWrapper>
            <ParticlesComponent id="particles"/>
            </ParticlesWrapper>
            <div style={{ position: 'relative', zIndex: 2, marginTop: '12.5 rem' }}>
                <Container maxWidth="md" sx={{ ...settings.paper }}>
                    <Typography variant="h3" align="center">{event.eventName}</Typography>
                    <Paper elevation={3} sx={{ padding: '32px', borderRadius: '20 px', background: 'inherit', boxShadow:'none' }}>
                        <Countdown date={event.eventTimestamp} renderer={renderer} />
                    </Paper>
                </Container>
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                zIndex: 3,
                paddingY: '1.25 rem',
                background: 'inherit',
                color: '#ffffff'
            }}>
                <Container maxWidth="lg" sx={{ zIndex: 3, background: 'inherit', marginTop: '350px' }}>

                    {/* Image */}
                    <Paper elevation={6} sx={{
                        background: 'linear-gradient(45deg, #DE3161 30%, #FF8E53 90%)',
                        marginBottom: 2, 
                        overflow: 'hidden',
                        borderRadius: '20px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',

                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', overflow: 'hidden' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 400,
                                    width: 400,
                                    objectFit: 'cover',
                                    clipPath: 'circle(50%)'
                                }}
                                image={event.eventImage || "https://www.wwf.org.uk/sites/default/files/styles/max_650x650/public/2022-05/_WW236934.jpg?itok=JlG-1l9V"}
                                alt="event image"
                            />
                        </Box>
                        <Paper elevation={6} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 2,
                            backgroundColor: '#ffffff',
                            background: 'inherit',
                            borderRadius: '20 px',
                            boxShadow: 'none',
                            marginBottom: 1,
                            direction: 'row',
                            fontFamily: 'Biome W01 Regular'

                        }}>
                            {/* Date */}
                            <Typography variant="h6"><EventIcon sx={{ width: '3.125 rem', height: '3.125 rem' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '120 px', marginRight: '80 px' }}>{dateFormatter(event.eventTimestamp)}</Typography>

                            {/* Place */}
                            <Typography variant="h6"><PlaceIcon sx={{ width: '3.125 rem', height: '3.125 rem' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '120 px', marginRight: '80 px' }}>{event.eventLocation}</Typography>

                            {/* Department*/}
                            <Typography variant="h6"><LocationCityIcon sx={{ width: '3.125 rem', height: '3.125 rem' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '120 px' }}>{event.eventDepartment}</Typography>

                        </Paper>
                    </Paper>

                    {/* Event Name and Description Section */}
                    <Paper elevation={6} sx={{
                        padding: 2,
                        backgroundColor: '#ffffff',
                        background: 'linear-gradient(45deg, #DE3161 30%, #FF8E53 90%)',
                        borderRadius: '1.25 rem',
                        boxShadow: '0 10px 1.875 30px rgba(0, 0, 0, 0.1)',
                        marginBottom: 2 
                    }}>  
                        <Typography variant="h4" style={style} sx={{ fontWeight: 'bold', marginBottom: 1 }}>{event.eventName}
                        </Typography>
                        <Typography variant="body1" style={style}>{event.eventDescription}</Typography>
                        <StyledButton variant="contained" endIcon={<WavingHandIcon/>} sx={{width: '20%', height:'60%'}} onClick={() => console.log("Join Event")}>
                    Join Event
                </StyledButton>
                    </Paper>
                </Container>
    
            </Box>
        </div>
    );

};

export default EventPageDisplay;








