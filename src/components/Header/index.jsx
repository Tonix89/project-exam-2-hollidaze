import { useState } from 'react';
import { Avatar, Link, Box, Typography, List, ListItem, ListItemButton, Drawer } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Logo from "../../logo.png";
import { Button } from '@mui/base';

const preventDefault = (e) => e.preventDefault();

export default function Header() {
    const [hamMenu, setHamMenu] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
          setHamMenu(open);
    }

    return <Box sx={{
        display : "flex",
        flexwrap: "wrap",
        justifyContent: "space-between",
        "& > :not(style) ~ :not(style)":{
            ml: 2,
        },
    }}>
        <Link href="#"><img src={Logo}/></Link>
        <Box
            sx={{
                display : {xs : "none", sm:"flex"},
                flexwrap: "wrap",
                justifyContent: "space-between",
                "& > :not(style) ~ :not(style)":{
                    ml: 2,
                },
            }}
            onClick={preventDefault}
        >
            <Link href="#" underline="hover">
                <Typography sx={{fontWeight: "bold",}}>Login</Typography>
                </Link>
            <Link href="#" underline="hover"><Typography sx={{fontWeight: "bold",}}>Sign Up</Typography></Link>
        </Box>
        <Box
            sx={{
                display : {xs : "flex", sm:"none"},
                flexwrap: "wrap",
                color:"primary",
                justifyContent: "space-between",
                "& > :not(style) ~ :not(style)":{
                    ml: 2,
                },
            }}
            onClick={preventDefault}
        >
            <MenuRoundedIcon onClick={toggleDrawer(true)}></MenuRoundedIcon>
            <Drawer anchor="right" open={hamMenu} onClose={toggleDrawer(false)} elevation={5} sx={{
                        height:"200px",
                    }}>
                <Box className='yes' role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}
                >
                    <List sx={{
                                    width:"150px",
                                }}>
                        <ListItem>
                            <ListItemButton sx={{
                                    m:"0",
                                    p:"0",
                                }} >
                                    <Link href="#" underline="hover">
                                        <Typography sx={{fontWeight: "bold",}}>Login</Typography>
                                    </Link>
                            </ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton sx={{
                                    m:"0",
                                    p:"0",
                                }}><Link href="#" underline="hover">
                                        <Typography sx={{fontWeight: "bold",}}>Sign Up</Typography>
                                    </Link>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    </Box>
}