import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../Firebase/firebaseConfig";
import "../PagesCSS/Homepage.css";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';

const HomePage = () => {

  const [events, setEvents] = useState(null);

  const getEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "event"));
      const events = querySnapshot.docs.map(doc => {
        const data = doc.data();
        data.eventTimestamp = data.eventTimestamp.toDate();
        return {id: doc.id, ...data};
      });
        setEvents(events)
    } catch (e) {
      console.log(e.message)
    }
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

  useEffect(() => {
    getEvents();
  },[]);

  console.log(events);

  return (
    <div>
        <ReusableAppBar/>
        <div className='homepage-wrapper'>
            <div className='events-container'>
              <div className='currentEvent-wrapper'>
                <p>This Week</p>
                <div className='event-info-container'>
                  {events && events.map(event => (
                    <div className='event-info-card' key={event.id}>
                      <div className="event-info-card-image">
                        <img src="https://www.wwf.org.uk/sites/default/files/styles/max_650x650/public/2022-05/_WW236934.jpg?itok=JlG-1l9V" alt="event-img"/>
                      </div>
                      <div className="event-info-card-details">
                        <p>{event.eventName}</p>
                        <p>{dateFormatter(event.eventTimestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='upcomingEvent-wrapper'>
                <p>Upcoming Events</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage