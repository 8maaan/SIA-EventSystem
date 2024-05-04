import { useState } from 'react';
import { TextField, TextareaAutosize, Button, Box } from '@mui/material';

function AddEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [eventParticipants, setEventParticipants] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Firebase or backend here
    console.log('Form submitted:', { eventName, eventDate, eventTime, description, location, department, eventParticipants });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#222"
      position="relative"
    >
      <Button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          border: 'none',
          backgroundColor: '#555',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back
      </Button>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          boxSizing: 'border-box'
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Add Event</h1>
        <TextField
          label="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ marginBottom: '20px' }}
          required
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={{ marginBottom: '20px' }}
          required
          InputLabelProps={{ shrink: true, style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Event Time"
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{ shrink: true, style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextareaAutosize
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '20px', width: '96%', resize: 'vertical', backgroundColor: '#222', color: '#fff', padding: '10px' }}
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Event Participants"
          value={eventParticipants}
          onChange={(e) => setEventParticipants(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <Button type="submit" variant="contained" style={{ backgroundColor: '#777', color: 'white', borderRadius: '5px', alignSelf: 'flex-end' }}>
          Add Event
        </Button>
      </form>
    </Box>
  );
}

export default AddEvent;
