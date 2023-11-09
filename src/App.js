import './App.css';
import { Container } from '@mui/system';
import Header from './components/Header';

function App() {
  return (
    <Container maxWidth="lg" sx={{
      mt:2,
    }}>
      <Header/>
    </Container>
  );
}

export default App;
