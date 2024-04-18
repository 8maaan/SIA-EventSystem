import { Box, Button, TextField } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';

const CreateEvent = () => {

    const navigateTo = useNavigate();

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDepartment, setEventDepartment] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    const handleSubmit = async () => {
        const docRef = await addDoc(collection(db, 'event'), {
            eventName: eventName,
            eventDate: eventDate,
            eventTime: eventTime,
            eventLocation: eventLocation,
            eventDepartment: eventDepartment,
            eventDescription: eventDescription
        })
        navigateTo('/home');
    }

    return (
        <div>
            <ReusableAppBar/>
            <h1 style={{fontSize: '40px', marginTop: '60px'}}>Create Event</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '40ch' }, padding: '50px'
                }}
                noValidate
                autoComplete="off">
            <div>
                <TextField id="standard-basic" label="Event Name" variant="standard" onChange={(event) => {setEventName(event.target.value)}}/>
                <TextField id="standard-basic" label="Date" variant="standard" onChange={(event) => {setEventDate(event.target.value)}}/>
            </div>
            <div>
                <TextField id="standard-basic" label="Time" variant="standard" onChange={(event) => {setEventTime(event.target.value)}}/>
                <TextField id="standard-basic" label="Location" variant="standard" onChange={(event) => {setEventLocation(event.target.value)}}/>
            </div>
            <div>
                <TextField id="standard-basic" label="Department" variant="standard" onChange={(event) => {setEventDepartment(event.target.value)}}/>
                <TextField id="standard-basic" label="Description" variant="standard" multiline  rows={4} maxRows={8} onChange={(event) => {setEventDescription(event.target.value)}}/>

            </div>
            <br></br>
            </Box>
            <div>
                <Button variant='contained' size='large' color='success' onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default CreateEvent;