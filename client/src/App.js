import './App.css';
import  {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthContextProvider } from './Context-and-routes/AuthContext';

import LandingPage from './Pages/LandingPage';
import UserProfile from './Pages/UserProfile';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            {/* COMMON ROUTES */}
            <Route index element={<LandingPage/>}/>
            <Route path="/profile" element={<UserProfile />} />


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
