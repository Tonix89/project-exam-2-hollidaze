import './App.css';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import PageNotFound from './components/Pages/PageNotFound';
import Contact from './components/Pages/Contact';

function App() {
  return (
    <Container maxWidth="lg" sx={{
      mt:2,
      padding:0,
    }}>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/contact" element={<Contact/>} />
            <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
