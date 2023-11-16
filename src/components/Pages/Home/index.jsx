import React, { createContext, useState, useEffect} from "react";
import { Backdrop, CircularProgress, Box, Grid } from "@mui/material";
import GetVenue from "../../../api/Venue";
import VenueCard from "../../Venue_card";
import SearchBar from "../../Search_bar";
import SortFilter from "../../Sort_filter";

export const VenueData = createContext();

function Home() {

    const [filter, setFilter] = useState([]);
    const [apiLink, setApiLink] = useState("https://api.noroff.dev/api/v1/holidaze/venues");
    const [venueData, setVenueData] = useState([]);

    const getFilterdata = (filterData) => {
        setFilter(filterData);
    }
    
    const [continent, country, price] = filter;

    useEffect(() => {
        if(price){
            setApiLink("https://api.noroff.dev/api/v1/holidaze/venues?sort=price&sortOrder=" + price)
        }else{
            setApiLink("https://api.noroff.dev/api/v1/holidaze/venues")
        }

    }, [price])

    const {data, isLoading, isError} = GetVenue(apiLink);

    useEffect(() => {
        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(currentUrl);
        const isFilter = urlParams.get("filter");
        if(isFilter){
            if(continent && !country){
                setVenueData(data.filter((venue) => venue.location.continent === continent));
            }else if(continent && country){
                setVenueData(data.filter((venue) => venue.location.continent === continent && venue.location.country === country));
            }else if(country && !continent ){
                setVenueData(data.filter((venue) => venue.location.country === country));
            }else{
                setVenueData(data);
            }
        }else{
            setVenueData(data);
        }
        // eslint-disable-next-line
    }, [filter, data])
    
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
            <SortFilter filterData={getFilterdata}/>
        </VenueData.Provider>
        <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {venueData.map(venue => <VenueData.Provider value={venue} key={venue.id}>
                    <Grid item xs={12} sm={4} md={4}>
                        <VenueCard/>
                    </Grid>
                </VenueData.Provider>)}
        </Grid>
    </Box>       
    )
};

export default Home;