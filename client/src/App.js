import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { GuestRoute, ProtectedRoute } from './Context-and-routes/Routes';
import CreateEvent from './Pages/CreateEvent';
import Homepage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import ManageEventPage from './Pages/ManageEventPage';
import PageNotFound from './Pages/PageNotFound';
import EventPage from './ReusableComponents/EventPage';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            {/* GUEST ROUTES */}
            <Route path="/" element={<GuestRoute> <LandingPage/> </GuestRoute>}/>
            <Route path="/home" element={<Homepage/> }/>

            {/*PROTECTED ROUTES */}
            <Route path="/manage-event" element={<ManageEventPage/>}/>
            <Route path="/manage-event/:eventId" element={<ProtectedRoute><EventPage/></ProtectedRoute>}/>
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent/></ProtectedRoute>}/>
            <Route path="/event/:eventId" element={<EventPage/>} />
            

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
