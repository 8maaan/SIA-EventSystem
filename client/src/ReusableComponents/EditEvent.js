import { useEffect, useState } from 'react';
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "../PagesCSS/CreateEvent.css"
import ImageUploader from '../ReusableComponents/ImageUploader'
import dayjs from 'dayjs';
import { updateDoc, collection, getDocs, doc, getDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import ReusableSnackBar from '../ReusableComponents/ReusableSnackBar'
import { useParams, useNavigate } from 'react-router-dom';
import ReusableDialog from '../ReusableComponents/ReusableDialog'
import ReusableLoadingAnim from '../ReusableComponents/ReusableLoadingAnim'

function EditEvent() {
    const params = useParams();
    const eventId = params.eventId;
    const [eventData, setEventData] = useState(null);
    const [prevEventDate, setPrevEventDate] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const docRef = doc(db, 'event', eventId);
                const docEntry = await getDoc(docRef);
        
                if (docEntry.exists()) {
                    const data = docEntry.data();
                    data.eventTimestamp = data.eventTimestamp.toDate();
                    // BAND-AID FIX FOR "eventData.eventTimestamp.toDate is not a function" error
                    setPrevEventDate(data.eventTimestamp);
                    setEventData(data)
                } else {
                    console.error("No such document!");
                }
            } catch(e) {
                console.error(e.message)
            }
        }

        getEvent();
    },[eventId]);


    const [departments, setDepartments] = useState(null);

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
                console.error("Server side error")
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingUpdate(true);

        if(eventData.eventImage.trim() === ''){
            updateEventTxtError('eventImage', true);
            return;
        }else{
            updateEventTxtError('eventImage', false);
        }

        // BAND AID FIX, THERE MIGHT BE OPTIMAL SOLUTION 4 THIS
        const eventDate = eventData.eventTimestamp === prevEventDate ? eventData.eventTimestamp : eventData.eventTimestamp.toDate();
        try{
            const eventRef = doc(db, 'event', eventId);
            await updateDoc(eventRef, {
                eventName: eventData.eventName,
                eventTimestamp: eventDate,
                eventLocation: eventData.eventLocation,
                eventDepartment: eventData.eventDepartment,
                eventDescription: eventData.eventDescription,
                eventImage: eventData.eventImage
            })
            handleSnackbarOpen("success", "Event has been updated successfully 🎉")
        }catch(e){
            console.error(e);
            handleSnackbarOpen("error", "Error updating an event, try again later.")
        }

        setLoadingUpdate(false);
    };

    const navigateTo = useNavigate();
    const handleDelete = async () => {
        setLoadingDelete(true);
        try {
            const docRef = doc(db, 'event', eventId);
            await deleteDoc(docRef);
            handleSnackbarOpen("success", "Event has been deleted successfully");
            setTimeout(() => {
                navigateTo('/manage-event', { replace: true });;
            }, 1500);
        } catch(e) {
            console.error("No such document!");
            handleSnackbarOpen("error", "Error deleting an event, try again later.");
        }
        setLoadingDelete(false);
    }

    // if(eventData){
    //     console.log(prevEventDate === eventData.eventTimestamp);
    // }

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

    // FOR CONFIRMATION DIALOG
    const [openDialog, setOpenDialog] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleConfirmationDialogClose = (confirmed) => {
        setOpenDialog(false);
        setConfirmationStatus(confirmed);
        // console.log(confirmationStatus);

        if (confirmed) {
            handleDelete();
        }
    };

    if(!eventData){
        return <div><ReusableLoadingAnim/></div>
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" position="relative">
            <form onSubmit={handleSubmit} className='form-style'>
                <h1 style={{ textAlign: 'center', color:'#464a4f' }}>Edit Event</h1>
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
                <ImageUploader required eventImage={eventData.eventImage} handleTxtFieldChange={handleTxtFieldChange} errorTxt={eventDataError.eventImage} isEdit={true}/>

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
                
                <div style={{alignSelf: 'flex-end'}}>
                    <Button variant="contained" sx={{ backgroundColor: '#8a252c', color: 'white', borderRadius: '5px', fontWeight:'600', marginRight: '15px', '&:hover': {backgroundColor: '#4d0606'}}} onClick={handleOpenDialog}>
                        {loadingDelete ? <CircularProgress color='inherit' size={'1.5rem'}/> : 'Delete Event'}
                    </Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#faaa0a', color: 'white', borderRadius: '5px', fontWeight:'600', '&:hover': {backgroundColor: '#d69500'} }}>
                        {loadingUpdate ? <CircularProgress color='inherit' size={'1.5rem'}/> : 'Update Event'}
                    </Button>
                </div>
            </form>
            {snackbar && <ReusableSnackBar open={snackbar.status} onClose={handleSnackbarClose} severity={snackbar.severity} message={snackbar.message} />}
            {openDialog && <ReusableDialog status={true} onClose={handleConfirmationDialogClose} title={"Are you sure you want to delete this event?"}/>}
        </Box>
    );
}

export default EditEvent;