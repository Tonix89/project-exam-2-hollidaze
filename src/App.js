import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import PageNotFound from './components/Pages/PageNotFound';
import Contact from './components/Pages/Contact';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="/contact" element={<Contact/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Route>
          </Routes>
      </CssBaseline>
    </div>
  );
}

export default App;
