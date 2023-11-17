import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Logo from '../../logo.png';
import { Container } from '@mui/system';
import SignUp from '../Sign_up';

const preventDefault = (e) => e.preventDefault();

export default function Header() {
  const [hamMenu, setHamMenu] = useState(false);

  const [opens, setOpens] = useState(false);

  const handleOpens = () => setOpens(true);

  const handleCloses = () => setOpens(false);

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
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            '& > :not(style) ~ :not(style)': {
              ml: 2,
            },
          }}
          onClick={preventDefault}
        >
          <Button
            onClick={handleOpens}
            open={opens}
            sx={{ fontWeight: 'bold' }}
          >
            Login
          </Button>
          <Button
            onClick={handleOpens}
            open={opens}
            sx={{ fontWeight: 'bold' }}
          >
            Sign Up
          </Button>
        </Box>
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
            }}
          >
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
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
                      onClick={handleOpens}
                      open={opens}
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
                      onClick={handleOpens}
                      open={opens}
                      sx={{ fontWeight: 'bold' }}
                    >
                      Sign Up
                    </Button>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>
      <SignUp open={opens} handleCloses={handleCloses} />
    </Container>
  );
}
