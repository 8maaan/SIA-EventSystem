import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';

const CreateEvent = () => {

    const navigateTo = useNavigate();

    const [eventData, setEventData] = useState({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventDepartment: "",
        eventDescription: ""
      });

    const handleSubmit = async () => {

        if(!eventData.eventName.trim() || !eventData.eventDate.trim() || !eventData.eventTime.trim() || 
            !eventData.eventLocation.trim() || !eventData.eventDepartment.trim() || !eventData.eventDescription.trim()) {
            alert('Please Enter All the Fields!');
            return;
        }

        if(eventData.eventDescription.trim().split(/\s+/).length < 5) {
            alert('Please enter a Event Description with atleast 5 words');
            return;
        }
        try {
            const docRef = await addDoc(collection(db, 'event'), {
                eventName: eventData.eventName,
                eventDate: eventData.eventDate,
                eventTime: eventData.eventTime,
                eventLocation: eventData.eventLocation,
                eventDepartment: eventData.eventDepartment,
                eventDescription: eventData.eventDescription
            })
            navigateTo('/home');   
        } catch(e) {
            console.log(e.message);
        }
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
                <TextField id="standard-basic" label="Event Name" variant="standard" onChange={(event) => {setEventData(prevState => ({...prevState, eventName: event.target.value}))}}/>
                <TextField id="standard-basic" label="Date" variant="standard" onChange={(event) => {setEventData(prevState => ({...prevState, eventDate: event.target.value}))}}/>
            </div>
            <div>
                <TextField id="standard-basic" label="Time" variant="standard" onChange={(event) => {setEventData(prevState => ({...prevState, eventTime: event.target.value}))}}/>
                <TextField id="standard-basic" label="Location" variant="standard" onChange={(event) => {setEventData(prevState => ({...prevState, eventLocation: event.target.value}))}}/>
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventData.eventDepartment}
                    label="College Department"
                    onChange={(event) => {setEventData(prevState => ({...prevState, eventDepartment: event.target.value}))}}>

                    <MenuItem value={'College of Engineering and Architecture'}>College of Engineering and Architecture</MenuItem>
                    <MenuItem value={'College of Management, Business and Accountancy'}>College of Management, Business and Accountancy</MenuItem>
                    <MenuItem value={'College of Arts, Sciences, and Education'}>College of Arts, Sciences, and Education</MenuItem>
                    <MenuItem value={'College of Nursing and Allied Health Sciences'}>College of Nursing and Allied Health Sciences</MenuItem>
                    <MenuItem value={'College of Computer Studies'}>College of Computer Studies</MenuItem>
                    <MenuItem value={'College of Criminal Justice'}>College of Criminal Justice</MenuItem>
                </Select>
                </FormControl>
                <TextField id="standard-basic" label="Description" variant="standard" multiline  rows={4} maxRows={8} onChange={(event) => {setEventData(prevState => ({...prevState, eventDescription: event.target.value}))}}/>
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