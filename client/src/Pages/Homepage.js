import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from "../Firebase/firebaseConfig";
import "../PagesCSS/Homepage.css";
import ReusableAppBar from '../ReusableComponents/ReusableAppBar';
import { MenuItem, FormControl, Select } from "@mui/material";
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
        return events.filter(event => event.eventTimestamp >= today && event.eventTimestamp <= endOfWeek);
      case 'Upcoming Events':
        return events.filter(event => event.eventTimestamp > endOfWeek);
      default:
        return events;
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
              {filteredEvents && filteredEvents.map((event, id) => (
                <div className='event-info-card' key={event.id}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/event/${event.id}`} key={id}>
                    <div className="event-info-card-image">
                      <img src={event.eventImage}  loading="lazy" alt="event-img" />
                    </div>
                    <div className="event-info-card-details">
                      <h3>{event.eventName}</h3>
                      <p>Date and Time: {dateFormatter(event.eventTimestamp)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage;
