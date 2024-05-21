import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../Firebase/firebaseConfig";
import "../PagesCSS/Homepage.css";
import { MenuItem, FormControl, Select, Skeleton } from "@mui/material"; // Import Skeleton
import { Link } from "react-router-dom";

const Homepage = () => {
  const [events, setEvents] = useState(null);
  const [eventChoice, setEventChoice] = useState('All Events');
  const [filteredEvents, setFilteredEvents] = useState(null);
  
  const handleChange = (event) => {
    setEventChoice(event.target.value);
  };

  const filterEvents = (events, eventChoice) => {
    const today = new Date();
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);
  
    switch (eventChoice) {
      case 'This Week':
        return events.filter(event => event.eventTimestamp >= today && event.eventTimestamp <= endOfWeek)
                    .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
      case 'Upcoming Events':
        return events.filter(event => event.eventTimestamp > endOfWeek)
                    .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
      default:
        // Filter out events that are in the past and sort by date
        return events.filter(event => event.eventTimestamp >= today)
                    .sort((a, b) => a.eventTimestamp - b.eventTimestamp);
    }
  };

  const getEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "event"));
      const events = querySnapshot.docs.map(doc => {
        const data = doc.data();
        data.eventTimestamp = data.eventTimestamp.toDate();
        return { id: doc.id, ...data };
      });
      setEvents(events);
    } catch (e) {
      console.log(e.message);
    }
  };

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
  }, []);

  useEffect(() => {
    if (events) {
      const filteredEvents = filterEvents(events, eventChoice);
      setFilteredEvents(filteredEvents);
    }
  }, [events, eventChoice]);

  return (
    <div>
      <div className='homepage-wrapper'>
        <div className='events-container'>
          <div className='currentEvent-wrapper'>
            <div className='selector-container'>
              <FormControl size="small">
                <Select value={eventChoice} onChange={handleChange}>
                  <MenuItem value={'All Events'}>All Events</MenuItem>
                  <MenuItem value={'This Week'}>This Week</MenuItem>
                  <MenuItem value={'Upcoming Events'}>Upcoming Events</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='event-info-container'>
              {filteredEvents ? (
                filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <div className='event-info-card' key={event.id}>
                      <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/event-page/${event.id}`}>
                        <div className="event-info-card-image">
                          <img src={event.eventImage} loading="lazy" alt="event-img" />
                        </div>
                        <div className="event-info-card-details">
                          <h3>{event.eventName}</h3>
                          <p>Date and Time: {dateFormatter(event.eventTimestamp)}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className='event-noEvent'>
                    <p>No events found 😴</p>
                  </div>
                )
              ) : (
                Array.from({ length: 8 }, (_, index) => (
                  <div key={index}>
                    <Skeleton animation="wave" variant="rectangular" width={275} height={180} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage;
