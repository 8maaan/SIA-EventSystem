import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableAppBar from './ReusableAppBar';

const EventPage = () => {

    const params = useParams();
    const eventId = params.eventId;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const getEvent = async () => {
            const docRef = doc(db, 'event', eventId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setEvent(docSnap.data())
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }

        getEvent();
    },[eventId]);

    if (!event) {
        return <div><ReusableAppBar/></div>
    }

    return (
        <div>
            <ReusableAppBar/>
            <h1 style={{fontSize: '40px ', display: 'flex', marginLeft: '50px', marginTop: '60px'}}>{event.eventName}</h1>
            <hr style={{border: '4px solid #FFD700'}}/>
            <p style={{display: 'flex', marginLeft: '50px', textDecoration: 'underline', marginTop: '50px'}}>{event.eventDepartment}</p>
            <p style={{display: 'flex', marginLeft: '50px'}}>{event.eventDescription}</p>
            <div style={{background: 'grey', paddingTop: '5px', paddingBottom: '5px'}}>
                <h4 style={{display: 'flex', marginLeft: '50px'}}>{event.eventDate} - {event.eventTime} - {event.eventLocation}</h4>
            </div>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <h4>List of Participants:</h4>
                <h4>Invite Options:</h4>
            </div>
        </div>
    )
}

export default EventPage;

