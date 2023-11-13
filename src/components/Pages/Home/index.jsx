import React, { createContext} from "react";
import { Backdrop, CircularProgress, Box, Grid } from "@mui/material";
import GetVenue from "../../../api/Venue";
import VenueCard from "../../Venue_card";
import SearchBar from "../../Search_bar";

export const VenueData = createContext();

function Home() {

    const {data, isLoading, isError} = GetVenue("https://api.noroff.dev/api/v1/holidaze/venues");
    
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

    return (
    <Box sx={{ flexGrow: 1, mt: 1, }}>
        <VenueData.Provider value={data}>
            <SearchBar />
        </VenueData.Provider>
        <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map(venue => <VenueData.Provider value={venue} key={venue.id}>
                    <Grid item xs={12} sm={4} md={4}>
                        <VenueCard/>
                    </Grid>
                </VenueData.Provider>)}
        </Grid>
    </Box>       
    )
};

export default Home;