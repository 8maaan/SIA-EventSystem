import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from "./ReusableAppBar";



const EditEvent = () => {

    const params = useParams();
    const eventId = params.eventId;
    const [prevevent, setPrevEvent] = useState(null);
    const navigateTo = useNavigate();
    const [departments, setDepartments] = useState(null);
    const [fieldsFilled, setfieldsFilled] = useState(false);
    const [focused, setFocused] = useState({
        eventName: false,
        eventLocation: false,
        eventDescription: false
    });
    const [newevent, setNewEvent] = useState({
        eventName: "",
        eventTimestamp: "",
        eventLocation: "",
        eventDepartment: "",
        eventDescription: ""
      });

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

    // useEffect(() => {
    //     const areAllFieldsFilled = Object.values(newevent).every(value => value !== "");
    //     setfieldsFilled(areAllFieldsFilled);        

    // }, [newevent])

    useEffect(() => {
        const getEvent = async () => {
            try {
                const docRef = doc(db, 'event', eventId);
                const docEntry = await getDoc(docRef);
        
                if (docEntry.exists()) {
                    const data = docEntry.data();
                    data.eventTimestamp = data.eventTimestamp.toDate();
                    setPrevEvent(data)
                    console.log(docEntry.data());
                } else {
                    console.log("No such document!");
                }
            } catch(e) {
                console.log(e.message)
            }
        }

        getEvent();
        getDepartments();
    },[eventId]);

    const handleDelete = async () => {
        try {
            const docRef = doc(db, 'event', eventId);
            await deleteDoc(docRef);
            navigateTo('/manage-event');
        } catch(e) {
            console.log("No such document!");
        }
    }

    const handleEdit = async () => {

        var eventDate = newevent.eventTimestamp ? newevent.eventTimestamp.toDate() : null;

        if(newevent.eventName === '' && newevent.eventName !== prevevent.eventName) {
            newevent.eventName = prevevent.eventName;
        }

        if(eventDate === null && eventDate !== prevevent.eventTimestamp) {
            eventDate = prevevent.eventTimestamp;
        }

        if(newevent.eventLocation === '' && newevent.eventLocation !== prevevent.eventTimestamp) {
            newevent.eventLocation = prevevent.eventLocation;
        }

        if(newevent.eventDepartment === '' && newevent.eventDepartment !== prevevent.eventDepartment) {
            newevent.eventDepartment = prevevent.eventDepartment;
        }

        if(newevent.eventDescription === '' && newevent.eventDescription !== prevevent.eventDescription) {
            newevent.eventDescription = prevevent.eventDescription;
        }

        try {
            const eventRef = doc(db, 'event', eventId);
            await updateDoc(eventRef, {
                eventName: newevent.eventName,
                eventDate: eventDate,
                eventLocation: newevent.eventLocation,
                eventDepartment: newevent.eventDepartment,
                eventDescription: newevent.eventDescription
            });

            navigateTo('/manage-event');
        } catch(e) {
            console.log("No such document!");
        }

    }

    if (!prevevent) {
        return <div><ReusableAppBar/></div>
    }
    
    return ( 
        <div>
        <ReusableAppBar/>
        <h1 style={{fontSize: '40px', marginTop: '60px'}}>Edit Event</h1>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '40ch' }, padding: '50px'
            }}
            noValidate
            autoComplete="off">
        <div>
            <TextField id="standard-basic" label="Event Name" required onFocus={() => handleFocus('eventName')} 
                defaultValue={prevevent.eventName} onChange={(event) => {setNewEvent(prevState => ({...prevState, eventName: event.target.value}))}}/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Date & Time *" defaultValue={dayjs(prevevent.eventTimestamp)} onChange={(event) => {setNewEvent(prevState => ({...prevState, eventTimestamp: event}))}} />
            </LocalizationProvider>
        </div>
        <div>
            {/*TEXTFIELD IS OFF */}
            <FormControl sx={{ m: 1.5, minWidth: 350}}>
            <InputLabel id="demo-simple-select-label" required >Department</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={prevevent.eventDepartment}
                label="College Department"
                onChange={(event) => {setNewEvent(prevState => ({...prevState, eventDepartment: event.target.value}))}}>

                {departments && departments.map(department => (
                    <MenuItem key={department.id} value={department.department}>{department.department}</MenuItem>
                ))}
            </Select>
            </FormControl>
            <TextField id="standard-basic" label="Location" required defaultValue={prevevent.eventLocation} onFocus={() => handleFocus('eventLocation')} 
                onChange={(event) => {setNewEvent(prevState => ({...prevState, eventLocation: event.target.value}))}}/>

        </div>
        <div>
            <TextField id="standard-basic" label="Description" required defaultValue={prevevent.eventDescription} onFocus={() => handleFocus('eventDescription')} 
                multiline rows={4} maxRows={8} onChange={(event) => {setNewEvent(prevState => ({...prevState, eventDescription: event.target.value}))}}/>

        </div>
        <br></br>
        </Box>
        <div>
            {/*disabled={!fieldsFilled}*/}
            <Button variant='contained' size='large' color='error' type='submit' onClick={handleDelete}>Delete</Button>
                |
            <Button variant='contained' size='large' color='success' type='submit' onClick={handleEdit}>Edit</Button>
        </div>
    </div>
    );
}
 
export default EditEvent;