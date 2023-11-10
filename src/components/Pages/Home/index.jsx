import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import GetVenue from "../../../api/Venue";

function Home() {

    const {data, isLoading, isError} = GetVenue("https://api.noroff.dev/api/v1/holidaze/venues?limit=25");

    if(isLoading){
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    if (isError){
        return (
            <Box>
                Sorry, we have an error. {data.message}.
            </Box>
        )
    }

    console.log(data);
    return (
        
        <div>This is Home</div>
    )
};

export default Home;