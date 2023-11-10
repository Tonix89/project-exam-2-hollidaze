import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

export default function Layout() {
    return (
        <>
            <Header/>
            <Box sx={{
                minHeight:"85vh",
            }}>
                <Outlet/>
            </Box>
            <Footer/>
        </>
    )
}