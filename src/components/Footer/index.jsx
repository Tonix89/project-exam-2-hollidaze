import { Typography, Link } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "light.main",
        color: "primary",
        padding: "20px",
    }}>
        <Typography variant="h5" sx={{
            marginBottom:"20px",
            fontWeight:"bold",
        }}>
            Need Help? <Link href="#">Contact Us</Link>
        </Typography>
        <Typography variant="body1" sx={{
            fontWeight:"bold",
        }}>
            All Rights Reserved. Holidaze &copy; 2023
        </Typography>
    </Box>
}