import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';
import ImageUploader from '../ReusableComponents/ImageUploader';

const CreateEvent = () => {
    
    const navigateTo = useNavigate();

    const [eventData, setEventData] = useState({
        eventName: "",
        eventTimestamp: "",
        eventLocation: "",
        eventDepartment: "",
        eventDescription: "",
        eventImage: ""
    });

    const [departments, setDepartments] = useState(null);
    const [fieldsFilled, setfieldsFilled] = useState(false);
    const [focused, setFocused] = useState({
        eventName: false,
        eventLocation: false,
        eventDescription: false
    });

    const updateEventImage = (imgUrl) => {
        setEventData((prevEvent) => ({
          ...prevEvent,
          eventImage: imgUrl
        }));
    };
    

    const getDepartments = async () => {

        try {
            const querySnapshot = await getDocs(collection(db, "departments"));
            const departments = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {id: doc.id, ...data};
            });

            departments.sort((a, b) => {
                const departmentA = a.department.toLowerCase();
                const departmentB = b.department.toLowerCase();
                if (departmentA < departmentB) {
                    return -1;
                }
                if (departmentA > departmentB) {
                    return 1;
                }
                return 0;
            });
                setDepartments(departments)
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleFocus = (field) => {
        if (!focused[field]) {
            setFocused(prevState => ({
                ...prevState,
                [field]: true
            }));
        }
    };

    const handleSubmit = async () => {
        console.log(eventData.eventTimestamp)

        const eventDate = eventData.eventTimestamp ? eventData.eventTimestamp.toDate() : null;
        console.log(eventDate)
        try {
            console.log('hello')
            await addDoc(collection(db, 'event'), {
                eventName: eventData.eventName,
                eventTimestamp: eventDate,
                eventLocation: eventData.eventLocation,
                eventDepartment: eventData.eventDepartment,
                eventDescription: eventData.eventDescription,
                eventImage: eventData.eventImage
            })
            navigateTo('/manage-event');  

        console.log("hello")
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getDepartments();
    }, [])

    useEffect(() => {
        const areAllFieldsFilled = Object.values(eventData).every(value => value !== "");
        setfieldsFilled(areAllFieldsFilled);
    }, [eventData])

    return (
        <div>
            <h1 style={{fontSize: '40px', marginTop: '60px'}}>Create Event</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '40ch' }, padding: '50px'
                }}
                noValidate
                autoComplete="off">
            <div>
                <TextField id="standard-basic" label="Event Name" required error={focused.eventName && eventData.eventName.trim() === ""} 
                    helperText={(focused.eventName && eventData.eventName.trim() === "") ? 'Please input a value' : ''}  onFocus={() => handleFocus('eventName')} 
                    onChange={(event) => {setEventData(prevState => ({...prevState, eventName: event.target.value}))}}/>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker label="Date & Time *" onChange={(event) => {setEventData(prevState => ({...prevState, eventTimestamp: event}))}} />
                </LocalizationProvider>
            </div>
            <div>
                {/*TEXTFIELD IS OFF */}
                <FormControl sx={{ m: 1.5, minWidth: 350}}>
                <InputLabel id="demo-simple-select-label" required >Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventData.eventDepartment}
                    label="College Department"
                    onChange={(event) => {setEventData(prevState => ({...prevState, eventDepartment: event.target.value}))}}>

                    {departments && departments.map(department => (
                        <MenuItem key={department.id} value={department.department}>{department.department}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <TextField id="standard-basic" label="Location" required error={focused.eventLocation && eventData.eventLocation.trim() === ""} 
                    helperText={(focused.eventLocation && eventData.eventLocation.trim() === "") ? 'Please input a value' : ''}  onFocus={() => handleFocus('eventLocation')} 
                    onChange={(event) => {setEventData(prevState => ({...prevState, eventLocation: event.target.value}))}}/>

            </div>
            <div>
                <TextField id="standard-basic" label="Description" required error={focused.eventDescription && eventData.eventDescription.trim() === ""} 
                    helperText={(focused.eventDescription && eventData.eventDescription.trim() === "") ? 'Please input a description' : ''}  onFocus={() => handleFocus('eventDescription')} 
                    multiline rows={4} maxRows={8} onChange={(event) => {setEventData(prevState => ({...prevState, eventDescription: event.target.value}))}}/>

                    <ImageUploader eventImage={eventData.eventImage} updateEventImage={updateEventImage}/>
            </div>
            </Box>
            <div>
                <Button variant='contained' disabled={!fieldsFilled} size='large' color='success' type='submit' onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default CreateEvent;