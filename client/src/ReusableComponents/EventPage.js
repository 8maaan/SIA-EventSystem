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
            try {
                const docRef = doc(db, 'event', eventId);
                const docEntry = await getDoc(docRef);
        
                if (docEntry.exists()) {
                    const data = docEntry.data();
                    data.eventTimestamp = data.eventTimestamp.toDate();
                    setEvent(data)
                    console.log(docEntry.data());
                } else {
                    console.log("No such document!");
                }
            } catch(e) {
                console.log(e.message)
            }
        }

        getEvent();
    },[eventId]);

    function dateFormatter(timestamp) {
        const formatDate = timestamp.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      
        const formatTime = timestamp.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true 
        });
      
        return `${formatDate} - ${formatTime}`;
      }

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
                <h4 style={{display: 'flex', marginLeft: '50px'}}>{dateFormatter(event.eventTimestamp)} - {event.eventLocation}</h4>
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

