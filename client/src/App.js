import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { GuestRoute, ProtectedRoute } from './Context-and-routes/Routes';
import CreateEvent from './Pages/CreateEvent';
import Homepage from './Pages/Homepage';
import LandingPage from './Pages/LandingPage';
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

            {/*PROTECTED ROUTES */}
            <Route path="/home" element={<ProtectedRoute> <Homepage/> </ProtectedRoute>}/>
            <Route path="/home/:eventId" element={<ProtectedRoute> <EventPage/> </ProtectedRoute>}/>
            <Route path="/create-event" element={<ProtectedRoute> <CreateEvent/> </ProtectedRoute>}/>
            

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
