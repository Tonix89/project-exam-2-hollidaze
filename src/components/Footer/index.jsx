import { Typography} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "light.main",
        color: "primary",
        padding: "20px",
    }}>
        <Box  sx={{
            display:"flex",
            marginBottom:"20px",
            fontWeight:"bold",
        }}>
            Need Help? <NavLink to="/contact"><Typography sx={{
                color:"primary.main",
                fontWeight: "bold",
                ml: 1,
            }}>Contact Us</Typography></NavLink>
        </Box>
        <Typography variant="body1" sx={{
            fontWeight:"bold",
        }}>
            All Rights Reserved. Holidaze &copy; 2023
        </Typography>
    </Box>
}