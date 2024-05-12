import { useEffect, useState } from 'react';
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "../PagesCSS/CreateEvent.css"
import ImageUploader from '../ReusableComponents/ImageUploader'
import dayjs from 'dayjs';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import ReusableSnackBar from '../ReusableComponents/ReusableSnackBar'
import ReusableDialog from '../ReusableComponents/ReusableDialog';

function AddEvent() {
    const eventDataInitialValues = {
        eventName: "",
        eventTimestamp: "",
        eventLocation: "",
        eventDepartment: "",
        eventImage: "",
        eventDescription: "",
    };
    const [departments, setDepartments] = useState(null);
    
    const [eventData, setEventData] = useState(eventDataInitialValues);

    const [eventDataError, setEventDataError] = useState({
        eventName: null, eventTimestamp: null,
        eventLocation: null,
        eventDepartment: null,
        eventDescription: null,
        eventImage: null
    });

    useEffect(()=>{
        const getDepartments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "departments"));
                const departments = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {id: doc.id, ...data};
                });
                    setDepartments(departments)
            } catch (e) {
                console.log(e.message)
            }
        }
        getDepartments();
    },[]);

    const isTextFieldEmpty = (text) => {
        const textStr = text ? text.toString() : '';
        return textStr.trim() === '';
    };

    const updateEventTxtError = (fieldName, value) => {
        setEventDataError(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    

    const handleTxtFieldChange = (value, name) => {
        setEventData((prevEventData) => {
            const updatedEventData = {
                ...prevEventData,
                [name]: value,
            };
    
            // CHECK IF TEXTFIELD IS EMPTY
            switch (name) {
                case 'eventName':
                case 'eventTimestamp':
                case 'eventLocation':
                case 'eventDepartment':
                case 'eventImage':
                case 'eventDescription':
                    updateEventTxtError(name, isTextFieldEmpty(value));
                    break;
                default:
                    break;
            }
            return updatedEventData;
        });
    };
    
    const [resetImageUploader, setResetImageUploader] = useState(null);
    const emptyTextFields = () =>{
        setEventData(eventDataInitialValues);
        setResetImageUploader(true);
    }

    const handleSubmit = async () => {
        setLoading(true);

        if(eventData.eventImage.trim() === ''){
            console.log('Empty')
            updateEventTxtError('eventImage', true);
            setLoading(false);
            return;
        }else{
            updateEventTxtError('eventImage', false);
        }

        const eventDate = eventData.eventTimestamp.toDate();
        try{
            await addDoc(collection(db, 'event'),{
                eventName: eventData.eventName,
                eventTimestamp: eventDate,
                eventLocation: eventData.eventLocation,
                eventDepartment: eventData.eventDepartment,
                eventDescription: eventData.eventDescription,
                eventImage: eventData.eventImage,
                eventParticipants: []
            })
            emptyTextFields();
            handleSnackbarOpen("success", "Event has been created successfully 🎉")
        }catch(e){
            console.error(e);
            handleSnackbarOpen("error", "Error creating an event, try again later.")
        }
        setLoading(false);
    };
    
    // FOR SNACKBAR, LOADING AND DIALOG
    const [loading, setLoading] = useState(false);
    
    const [snackbar, setSnackbar] = useState({ status: false, severity: '', message: ''});
    const handleSnackbarOpen = (severity, message) => {
        setSnackbar({ status: true, severity, message });
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setSnackbar(false);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(false);
    const handleOpenDialog = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    };

    const handleConfirmationDialogClose = (confirmed) => {
        setOpenDialog(false);
        setConfirmationStatus(confirmed);
        console.log(confirmationStatus);

        if (confirmed) {
            handleSubmit();
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" position="relative">
            <form onSubmit={handleOpenDialog} className='form-style'>
                <h1 style={{ textAlign: 'center', color:'#464a4f' }}>Create Event</h1>
                <TextField
                    name="eventName"
                    label="Event Name"
                    value={eventData.eventName}
                    required
                    onChange={(e) => handleTxtFieldChange(e.target.value, e.target.name)}
                    error={eventDataError.eventName}
                    helperText={eventDataError.eventName ? 'Please input event name' : ''}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        name="eventTimestamp"
                        disablePast
                        label="Date & Time"
                        value={eventData.eventTimestamp ? dayjs(eventData.eventTimestamp) : null}
                        onChange={(newValue) => handleTxtFieldChange(newValue, 'eventTimestamp')}
                        slotProps={{
                            textField: {
                                required: true,
                                error: eventDataError.eventTimestamp,
                                helperText: eventDataError.eventTimestamp ? 'Please specify the date & time' : ''
                            },
                        }}
                    />
                </LocalizationProvider>

                <TextField
                    name="eventLocation"
                    label="Location"
                    value={eventData.eventLocation}
                    required
                    onChange={(e) => handleTxtFieldChange(e.target.value, e.target.name)}
                    error={eventDataError.eventLocation}
                    helperText={eventDataError.eventLocation ? 'Please input the event location' : ''}
                />

                <FormControl fullWidth style={{marginBottom: '20px', textAlign:'left'}}>
                    <InputLabel>Department</InputLabel>
                    <Select
                        name="eventDepartment"
                        label="Department"
                        value={eventData.eventDepartment}
                        required
                        onChange={(e) => handleTxtFieldChange(e.target.value, e.target.name)}
                    >
                        {departments && departments.map(department => (
                            <MenuItem key={department.id} value={department.department}>{department.department}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                
                {/* TEMPORARY SOLUTION ONLY, NOT YET FAMILIAR W/ FIREBASE STORAGE FOR IMAGE UPLOADING*/ }
                {/* CORS ISSUE 💀 IF DAGHAN ERRORS SA CONSOLE THEN DISABLE ADBLOCK/UBLOCK FOR THIS PAGE TEMPORARILY*/ }
                <ImageUploader eventImage={eventData.eventImage} handleTxtFieldChange={handleTxtFieldChange} errorTxt={eventDataError.eventImage} reset={resetImageUploader}/>

                <TextField
                    name="eventDescription"
                    label="Description"
                    value={eventData.eventDescription}
                    required
                    onChange={(e) => handleTxtFieldChange(e.target.value, e.target.name)}
                    multiline
                    rows={4}
                    error={eventDataError.eventDescription}
                    helperText={eventDataError.eventDescription ? 'Please input a description' : ''}
                />
                
                <Button type="submit" variant="contained" style={{ backgroundColor: '#8a252c', color: 'white', borderRadius: '5px', alignSelf: 'flex-end', fontWeight:'600' }}>
                    {loading ? <CircularProgress color="inherit" size="1.5rem" /> : "Add Event"}
                </Button>
            </form>
            {snackbar && <ReusableSnackBar open={snackbar.status} onClose={handleSnackbarClose} severity={snackbar.severity} message={snackbar.message} />}
            {openDialog && <ReusableDialog status={true} onClose={handleConfirmationDialogClose} title={"Confirm event submission?"}/>}
        </Box>
    );
}

export default AddEvent;