import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import PageNotFound from "./components/Pages/PageNotFound";
import Contact from "./components/Pages/Contact";
import SingleVenue from "./components/Pages/Venue";
import Booking from "./components/Pages/Booking";
import SuccessPage from "./components/Pages/Success";
import Profile from "./components/Pages/Profile";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import VenueCreate from "./components/Pages/Venue_create";

function App() {
  return (
    <div className='App'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/venue/:id' element={<SingleVenue />} />
              <Route path='/booking/:id' element={<Booking />} />
              <Route path='/success/:name' element={<SuccessPage />} />
              <Route path='/profile/:user' element={<Profile />} />
              <Route path='/create/:create' element={<VenueCreate />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Routes>
        </CssBaseline>
      </LocalizationProvider>
    </div>
  );
}

export default App;
