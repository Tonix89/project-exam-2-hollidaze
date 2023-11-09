import './App.css';
import { Container } from '@mui/system';
import Layout from './components/Layout';

function App() {
  return (
    <Container maxWidth="lg" sx={{
      mt:2,
      padding:0,
    }}>
      <Layout/>
    </Container>
  );
}

export default App;
