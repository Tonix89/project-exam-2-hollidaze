import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import PageNotFound from './components/Pages/PageNotFound';
import Contact from './components/Pages/Contact';
import SingleVenue from './components/Pages/Venue';
import Booking from './components/Pages/Booking';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/venue/:id" element={<SingleVenue />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </CssBaseline>
      </LocalizationProvider>
    </div>
  );
}

export default App;
