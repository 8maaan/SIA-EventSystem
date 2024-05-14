import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../Firebase/firebaseConfig";
import ReusableLoadingAnim from "../ReusableComponents/ReusableLoadingAnim";

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
                } else {
                    console.log("No such document!");
                }
            } catch(e) {
                console.log(e.message)
            }
        }

        getEvent();
    },[eventId]);

    if (!event) {
        return <div><ReusableLoadingAnim/></div>
    }

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

    return (
        <div style={{margin: '5%'}}>
            <h1 style={{fontSize: '40px ', display: 'flex', marginTop: '60px'}}>{event.eventName}</h1>
            <hr style={{border: '4px solid #FFD700'}}/>
            <p style={{display: 'flex', textDecoration: 'underline', marginTop: '50px'}}>{event.eventDepartment}</p>
            <p style={{display: 'flex', textAlign:'justify'}}>{event.eventDescription}</p>
            <div style={{background: 'grey', paddingTop: '5px', paddingBottom: '5px'}}>
                <h4 style={{display: 'flex'}}>{dateFormatter(event.eventTimestamp)} - {event.eventLocation}</h4>
                <h4 style={{display: 'flex'}}>Organizer: {event.eventOrganizer ? event.eventOrganizer : 'null'}</h4>
            </div>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <h4>List of Participants:</h4>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Date and Time Joined</TableCell>
                            {/* Add more columns as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {event.eventParticipants.map((participant, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{participant.name}</TableCell>
                                <TableCell align="center">{participant.email}</TableCell>
                                <TableCell align="center">{participant.dateJoined}</TableCell>
                                {/* Add more cells for additional participant details */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EventPage;

