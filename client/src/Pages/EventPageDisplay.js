import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../Firebase/firebaseConfig";
import ParticlesComponent from '../ReusableComponents/particles';
import StaircaseEffect from '../ReusableComponents/StairCaseEffect';
import "../PagesCSS/EventPage.css";
import Countdown from 'react-countdown';
import {
    Container, Grid, Paper, Typography, CardMedia, TextField, Button, Box,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EastIcon from '@mui/icons-material/East';


const settings = {
    paper: {
        my: 5,
        p: 4,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: '0px',
        backgroundColor: 'inherit',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
        overflow: 'hidden',
        height: '400px',
        fontWeight: 'bold',
        width: '100vw',
        fontFamily: '"Biome W01 Regular", Arial, sans-serif', // Specifying font-family here
        '& *': {
            fontFamily: '"Biome W01 Regular", Arial, sans-serif', // Ensure all children also use Biome
            color: 'black',
        },
    },
};

/*}  katung original nga background without particles 
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
});  */


const EventPageDisplay = () => {
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();
    // {/* const navigate = useNavigate(); */ }

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

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    }));

    const StyledTextField = styled(TextField)({
        margin: '10px 0',
        '& label.Mui-focused': {
            color: 'primary.main',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'primary.main',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
            },
        },
    });

    const StyledButton = styled(Button)({
        background: 'inherit',
        marginTop: '20px',
        padding: '10px 0',
        backgroundColor: 'inherit',
        '&:hover': {
            backgroundColor: 'white',
        },
        color: 'black',
        fontSize: '18px',
    });

    const style = {
        fontFamily: '"Biome W01 Regular", Arial, sans-serif'
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <ParticlesComponent/> */}
            <div style={{ position: 'relative',}}>
                <Container maxWidth="md" sx={{ ...settings.paper, marginTop: '5%' }}>
                    <Typography variant="h3" align="center">{event.eventName}</Typography>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', background: 'inherit' }}>
                        <Countdown date={event.eventTimestamp} renderer={renderer} />
                    </Paper>
                </Container>
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Stacks everything vertically
                alignItems: 'center',
                height: '100vh',
                zIndex: 3,
                paddingY: '20px',
                background: 'inherit',
                color: '#ffffff'
            }}>
                <Container maxWidth="lg" sx={{ zIndex: 3, background: 'inherit', marginTop: '3.5%' }}>

                    {/* Image Section */}
                    <Paper elevation={6} sx={{
                        background: 'inherit',
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
                            borderRadius: '20px',
                            boxShadow: 'none',
                            marginBottom: 1,
                            direction: 'row',
                            fontFamily: 'Biome W01 Regular'

                        }}>
                            {/* Date */}
                            <Typography variant="h6"><EventIcon sx={{ width: '50px', height: '50px' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '-120px', marginRight: '80px' }}>{dateFormatter(event.eventTimestamp)}</Typography>

                            {/* Place */}
                            <Typography variant="h6"><PlaceIcon sx={{ width: '50px', height: '50px' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '-120px', marginRight: '80px' }}>{event.eventLocation}</Typography>

                            {/* Department*/}
                            <Typography variant="h6"><LocationCityIcon sx={{ width: '50px', height: '50px' }} /></Typography>
                            <Typography style={style} sx={{ marginLeft: '-120px' }}>{event.eventDepartment}</Typography>

                        </Paper>
                    </Paper>

                    {/* Event Name and Description Section */}
                    <Paper elevation={6} sx={{
                        padding: 2,
                        backgroundColor: '#ffffff',
                        background: 'inherit',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        marginBottom: 2 
                    }}>
                        <Typography variant="h4" style={style} sx={{ fontWeight: 'bold', marginBottom: 1 }}>{event.eventName}</Typography>
                        <Typography variant="body1" style={style}>{event.eventDescription}</Typography>
                    </Paper>
                </Container>
            </Box>


            <div style={{ height: '100vh'}}>
                <Container maxWidth="lg" sx={{
                    paddingY: '100px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '50%',
                    border: 'solid black 1px'
                    
                }}>
                    <Grid container spacing={5} sx={{ width: '100%' }}>
                        <Grid item xs={12} md={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                        }}>
                            <StaircaseEffect text="Don't miss out on the fun!" />
                            <Typography variant="h5" sx={{
                                fontWeight: 'bold',
                                position: 'relative',
                                top: '-109px',
                                marginLeft: '200px'
                            }}>
                                Join now!
                            </Typography>
                            <EastIcon sx={{ width: '100px', height: '100px', marginTop: '-175px', marginLeft: '450px' }} />
                        </Grid>

                        {/* RSVP Form Container */}
                        <Grid item xs={12} md={6} sx={{
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px',
                            fontFamily: 'Biome W01 Regular'
                        }}>
                            <StyledPaper elevation={3} sx={{
                                background: 'inherit',
                                
                                width: '80%',
                                marginLeft: '100px'
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    RSVP
                                </Typography>
                                <form>
                                    <StyledTextField fullWidth label="Name" variant="outlined" />
                                    <StyledTextField fullWidth label="Email" variant="outlined" />
                                    <StyledButton variant="contained" fullWidth type="submit">
                                        Register
                                    </StyledButton>
                                </form>
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );

};

export default EventPageDisplay;








