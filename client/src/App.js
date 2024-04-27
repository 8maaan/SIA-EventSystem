import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './Context-and-routes/AuthContext';
import { GuestRoute, ProtectedRoute } from './Context-and-routes/Routes';
import CreateEvent from './Pages/CreateEvent';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './Pages/PageNotFound';
import EventPage from './ReusableComponents/EventPage';
import ManageEventPage from './Pages/ManageEventPage';
import HomePage from './Pages/HomePage';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            {/* GUEST ROUTES */}
            <Route path="/" element={<GuestRoute> <LandingPage/> </GuestRoute>}/>
            <Route path="/home" element={<HomePage/> }/>

            {/*PROTECTED ROUTES */}
            <Route path="/manage-event" element={<ManageEventPage/>}/>
            <Route path="/manage-event/:eventId" element={<EventPage/>}/>
            <Route path="/create-event" element={<CreateEvent/>}/>
            

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
