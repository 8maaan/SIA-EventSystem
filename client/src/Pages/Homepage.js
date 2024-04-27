import React from 'react'
import ReusableAppBar from '../ReusableComponents/ReusableAppBar'
import "../PagesCSS/HomePage.css"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../Firebase/firebaseConfig";

const HomePage = () => {

  const [events, setEvents] = useState(null);

  const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "event"));
    const events = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setEvents(events)
  }

  useEffect(() => {
    getEvents();
  },[]);

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
                        <p>Time: {event.eventTime}</p>
                        <p>Date: {event.eventDate}</p>
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