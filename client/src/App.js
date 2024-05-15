import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { ProtectedRoute, OrganizerRoute } from './Context-and-routes/Routes';
import CreateEvent from './Pages/CreateEvent';
import Homepage from './Pages/Homepage';
import LandingPage from './Pages/LandingPage';
import ManageEventPage from './Pages/ManageEventPage';
import PageNotFound from './Pages/PageNotFound';
import EditEvent from './ReusableComponents/EditEvent';
import EventPage from './ReusableComponents/EventPage';
import ReusableAppBar from './ReusableComponents/ReusableAppBar';
import EventPageDisplay from './Pages/EventPageDisplay';
import OrganizerApplicants from './Pages/OrganizerApplicants';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <ReusableAppBar/>
          <Routes>

            {/* COMMON ROUTES */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Homepage/> }/>
            <Route path="/event/:eventId" element={<EventPage/>} />
            <Route path="/event-page/:eventId" element={<EventPageDisplay/>} />

            {/*PROTECTED ROUTES */}
            <Route path="/manage-event" element={<OrganizerRoute><ManageEventPage/></OrganizerRoute>}/>
            <Route path="/edit-event/:eventId" element={<OrganizerRoute><EditEvent/></OrganizerRoute>}/>
            <Route path="/manage-event/:eventId" element={<OrganizerRoute><EventPage/></OrganizerRoute>}/>
            <Route path="/create-event" element={<OrganizerRoute><CreateEvent/></OrganizerRoute>}/>

            <Route path="/organizer-applicants" element={<OrganizerApplicants/>} />

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
