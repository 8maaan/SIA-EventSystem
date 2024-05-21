import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { OrganizerRoute, AdminRoute } from './Context-and-routes/Routes';
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
import UserProfile from './Pages/UserProfile';
// import Notification from './ReusableComponents/Notifications';
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
            <Route path="/profile" element={<UserProfile/>}/>
            {/* <Route path="/notification" element={<Notification/>} /> */}

            {/* ORGANIZER ROUTES*/}
            <Route path="/manage-event" element={<OrganizerRoute><ManageEventPage/></OrganizerRoute>}/>
            <Route path="/edit-event/:eventId" element={<OrganizerRoute><EditEvent/></OrganizerRoute>}/>
            <Route path="/manage-event/:eventId" element={<OrganizerRoute><EventPage/></OrganizerRoute>}/>
            <Route path="/create-event" element={<OrganizerRoute><CreateEvent/></OrganizerRoute>}/>

            {/* ADMIN ROUTES */}
            <Route path="/organizer-applicants" element={<AdminRoute><OrganizerApplicants/></AdminRoute>} />

            <Route path="*" element={<PageNotFound/>}/>            


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
