import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  Button,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Logo from '../../logo.png';
import { Container } from '@mui/system';
import SignUp from '../Sign_up';
import Login from '../Login';
import { token } from '../../tools/Token';

const preventDefault = (e) => e.preventDefault();

export default function Header() {
  const [hamMenu, setHamMenu] = useState(false);

  const [openSignup, setOpenSignup] = useState(false);
  const signUpOpen = () => setOpenSignup(true);
  const signUpClose = () => setOpenSignup(false);

  const [openLogin, setOpenLogin] = useState(false);
  const loginOpen = () => setOpenLogin(true);
  const loginClose = () => setOpenLogin(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setHamMenu(open);
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          p: 0,
          justifyContent: 'space-between',
        }}
      >
        <NavLink
          to="/"
          sx={{
            paddingLeft: '5px',
          }}
        >
          <img src={Logo} alt="Logo" />
        </NavLink>
        <MenuMdScreen
          openLogin={openLogin}
          loginOpen={loginOpen}
          signUpOpen={signUpOpen}
          openSignup={openSignup}
        />
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexWrap: 'wrap',
            color: 'primary',
            justifyContent: 'space-between',
            '& > :not(style) ~ :not(style)': {
              ml: 2,
            },
          }}
          onClick={preventDefault}
        >
          <MenuRoundedIcon
            onClick={toggleDrawer(true)}
            sx={{
              paddingRight: '5px',
            }}
          ></MenuRoundedIcon>
          <Drawer
            anchor="right"
            open={hamMenu}
            onClose={toggleDrawer(false)}
            elevation={5}
            sx={{
              height: '200px',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <MenuSmScreen
                openLogin={openLogin}
                loginOpen={loginOpen}
                signUpOpen={signUpOpen}
                openSignup={openSignup}
              />
            </Box>
          </Drawer>
        </Box>
      </Box>
      <Login open={openLogin} loginClose={loginClose} signUpOpen={signUpOpen} />
      <SignUp
        open={openSignup}
        signUpClose={signUpClose}
        loginOpen={loginOpen}
      />
    </Container>
  );
}

function MenuSmScreen(props) {
  const logout = () => {
    localStorage.removeItem('holiToken');
    window.location.reload();
  };

  if (token()) {
    return (
      <>
        <List
          sx={{
            width: '150px',
          }}
        >
          <ListItem
            sx={{
              m: '0',
              p: '0',
            }}
          >
            <ListItemButton
              sx={{
                m: '0',
                p: '0',
              }}
            >
              <Button>
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                    }}
                  >
                    My Profile
                  </Typography>
                </NavLink>
              </Button>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              m: '0',
              p: '0',
            }}
          >
            <ListItemButton
              sx={{
                m: '0',
                p: '0',
              }}
            >
              <Button onClick={logout} sx={{ fontWeight: 'bold' }}>
                Logout
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  } else {
    return (
      <>
        <List
          sx={{
            width: '150px',
          }}
        >
          <ListItem
            sx={{
              m: '0',
              p: '0',
            }}
          >
            <ListItemButton
              sx={{
                m: '0',
                p: '0',
              }}
            >
              <Button
                onClick={props.loginOpen}
                open={props.openLogin}
                sx={{ fontWeight: 'bold', pb: 0 }}
              >
                Login
              </Button>
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              m: '0',
              p: '0',
            }}
          >
            <ListItemButton
              sx={{
                m: '0',
                p: '0',
              }}
            >
              <Button
                onClick={props.signUpOpen}
                open={props.openSignup}
                sx={{ fontWeight: 'bold' }}
              >
                Sign Up
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  }
}

function MenuMdScreen(props) {
  const logout = () => {
    localStorage.removeItem('holiToken');
    window.location.reload();
  };

  if (token()) {
    return (
      <>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          onClick={preventDefault}
        >
          <Button>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  ml: 1,
                }}
              >
                My Profile
              </Typography>
            </NavLink>
          </Button>
          <Button onClick={logout} sx={{ fontWeight: 'bold' }}>
            Logout
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          onClick={preventDefault}
        >
          <Button
            onClick={props.loginOpen}
            open={props.openLogin}
            sx={{ fontWeight: 'bold' }}
          >
            Login
          </Button>
          <Button
            onClick={props.signUpOpen}
            open={props.openSignup}
            sx={{ fontWeight: 'bold' }}
          >
            Sign Up
          </Button>
        </Box>
      </>
    );
  }
}
