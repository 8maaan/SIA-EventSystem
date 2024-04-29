import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';

const CreateEvent = () => {

    const navigateTo = useNavigate();

    const [eventData, setEventData] = useState({
        eventName: "",
        eventTimestamp: "",
        eventLocation: "",
        eventDepartment: "",
        eventDescription: ""
      });

    const handleSubmit = async () => {

        const eventDate = eventData.eventTimestamp ? eventData.eventTimestamp.toDate() : null;

        if(!eventData.eventName.trim() || !eventData.eventTimestamp || 
            !eventData.eventLocation.trim() || !eventData.eventDepartment.trim() || !eventData.eventDescription.trim()) {
            alert('Please Enter All the Fields!');
            return;
        }

        if(eventData.eventDescription.trim().split(/\s+/).length < 5) {
            alert('Please enter a Event Description with atleast 5 words');
            return;
        }


        try {
            await addDoc(collection(db, 'event'), {
                eventName: eventData.eventName,
                eventTimestamp: eventDate,
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
                <TextField id="standard-basic" label="Event Name" onChange={(event) => {setEventData(prevState => ({...prevState, eventName: event.target.value}))}}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Date & Time" onChange={(event) => {setEventData(prevState => ({...prevState, eventTimestamp: event}))}} />
                </LocalizationProvider>
            </div>
            <div>
                {/*TEXTFIELD IS OFF */}
                <FormControl sx={{ m: 1.5, minWidth: 350}}>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventData.eventDepartment}
                    label="College Department"
                    onChange={(event) => {setEventData(prevState => ({...prevState, eventDepartment: event.target.value}))}}>


                    {/* U CAN ADD A MAPPING FEATURE HERE SIMILAR TO LOADING EVENTS */}
                    <MenuItem value={'College of Engineering and Architecture'}>College of Engineering and Architecture</MenuItem>
                    <MenuItem value={'College of Management, Business and Accountancy'}>College of Management, Business and Accountancy</MenuItem>
                    <MenuItem value={'College of Arts, Sciences, and Education'}>College of Arts, Sciences, and Education</MenuItem>
                    <MenuItem value={'College of Nursing and Allied Health Sciences'}>College of Nursing and Allied Health Sciences</MenuItem>
                    <MenuItem value={'College of Computer Studies'}>College of Computer Studies</MenuItem>
                    <MenuItem value={'College of Criminal Justice'}>College of Criminal Justice</MenuItem>
                </Select>
                </FormControl>
                <TextField id="standard-basic" label="Location" onChange={(event) => {setEventData(prevState => ({...prevState, eventLocation: event.target.value}))}}/>
            </div>
            <div>
                <TextField id="standard-basic" label="Description" multiline rows={4} maxRows={8} onChange={(event) => {setEventData(prevState => ({...prevState, eventDescription: event.target.value}))}}/>
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