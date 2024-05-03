import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { ProtectedRoute } from './Context-and-routes/Routes';
import CreateEvent from './Pages/CreateEvent';
import Homepage from './Pages/Homepage';
import LandingPage from './Pages/LandingPage';
import ManageEventPage from './Pages/ManageEventPage';
import PageNotFound from './Pages/PageNotFound';
import EditEvent from './ReusableComponents/EditEvent';
import EventPage from './ReusableComponents/EventPage';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            {/* COMMON ROUTES */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<Homepage/> }/>
            <Route path="/event/:eventId" element={<EventPage/>} />

            {/*PROTECTED ROUTES */}
            <Route path="/manage-event" element={<ManageEventPage/>}/>
            <Route path="/edit-event/:eventId" element={<EditEvent/>}/>
            <Route path="/manage-event/:eventId" element={<ProtectedRoute><EventPage/></ProtectedRoute>}/>
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent/></ProtectedRoute>}/>

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
