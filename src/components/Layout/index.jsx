import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router';
import { Container } from '@mui/system';

export default function Layout() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
        m: 1,
      }}
    >
      <Header />
      <Container
        sx={{
          minHeight: '85vh',
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
}
