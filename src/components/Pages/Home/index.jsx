import React, { createContext, useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Box,
  Grid,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import GetVenue from "../../../api/Venue";
import VenueCard from "../../Venue_card";
import SearchBar from "../../Search_bar";
import SortFilter from "../../Sort_filter";
import { NavLink } from "react-router-dom";

export const VenueData = createContext();

function Home() {
  const [loader, setLoader] = useState(true);
  const [filter, setFilter] = useState([]);
  const [apiLink, setApiLink] = useState(
    "https://api.noroff.dev/api/v1/holidaze/venues",
  );
  const [venueData, setVenueData] = useState([]);
  const [showLimit, setShowLimit] = useState(11);

  const handleAddLimit = () => {
    setShowLimit(showLimit + 12);
  };

  const handleMinusLimit = () => {
    setShowLimit(showLimit - 12);
  };

  const getFilterdata = (filterData) => {
    setFilter(filterData);
  };

  const [continent, country, updated, price, isFilter] = filter;

  useEffect(() => {
    if (updated) {
      setApiLink(
        "https://api.noroff.dev/api/v1/holidaze/venues?sort=updated&sortOrder=" +
          updated,
      );
    } else {
      setApiLink("https://api.noroff.dev/api/v1/holidaze/venues");
    }
  }, [updated]);

  const { data, isLoading, isError } = GetVenue(apiLink);

  useEffect(() => {
    if (isLoading) {
      setLoader(true);
    } else {
      if (data) {
        setVenueData(data);
        setLoader(false);
      }
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (updated) {
      setVenueData(data);
    }

    if (isFilter) {
      if (continent && !country && !price) {
        setVenueData(
          data.filter((venue) => venue.location.continent === continent),
        );
      } else if (continent && country && !price) {
        setVenueData(
          data.filter(
            (venue) =>
              venue.location.continent === continent &&
              venue.location.country === country,
          ),
        );
      } else if (continent && country && price) {
        const newData = data.filter(
          (venue) =>
            venue.location.continent === continent &&
            venue.location.country === country,
        );
        if (price === "asc") {
          setVenueData(newData.sort((a, b) => a.price - b.price));
        } else {
          setVenueData(newData.sort((a, b) => b.price - a.price));
        }
      } else if (!continent && country && price) {
        const newData = data.filter(
          (venue) => venue.location.country === country,
        );
        if (price === "asc") {
          setVenueData(newData.sort((a, b) => a.price - b.price));
        } else {
          setVenueData(newData.sort((a, b) => b.price - a.price));
        }
      } else if (!continent && !country && price) {
        if (price === "asc") {
          setVenueData(data.sort((a, b) => a.price - b.price));
        } else {
          setVenueData(data.sort((a, b) => b.price - a.price));
        }
      } else if (!continent && country && !price) {
        setVenueData(
          data.filter((venue) => venue.location.country === country),
        );
      } else if (continent && !country && price) {
        const newData = data.filter(
          (venue) => venue.location.continent === continent,
        );
        if (price === "asc") {
          setVenueData(newData.sort((a, b) => a.price - b.price));
        } else {
          setVenueData(newData.sort((a, b) => b.price - a.price));
        }
      }
    }
  }, [data, continent, country, updated, price, isFilter]);

  if (loader) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  if (isError) {
    return <Box>Sorry, we have an error. {data.message}.</Box>;
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
      <VenueData.Provider value={data}>
        <SearchBar />
        <SortFilter filterData={getFilterdata} filter={filter} />
      </VenueData.Provider>
      <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
        {continent && <Chip label='continent' />}
        {country && <Chip label='country' />}
        {updated && <Chip label='creation' />}
        {price && <Chip label='price' />}
      </Stack>
      {venueData.length === 0 ? (
        <Typography>No result found.</Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {venueData.map(
            (venue, i) =>
              i <= showLimit && (
                <VenueData.Provider value={venue} key={venue.id}>
                  <Grid item xs={12} sm={4} md={4}>
                    <NavLink
                      to={`/venue/${venue.id}`}
                      style={{ textDecoration: "none" }}>
                      <VenueCard />
                    </NavLink>
                  </Grid>
                </VenueData.Provider>
              ),
          )}
        </Grid>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 2,
          gap: 2,
          justifyContent: "center",
        }}>
        {showLimit <= 98 && (
          <Button
            variant='outlined'
            startIcon={<ExpandMoreOutlinedIcon />}
            onClick={handleAddLimit}
            sx={{ fontWeight: "bold", border: "2px solid" }}>
            Show More
          </Button>
        )}
        {showLimit > 11 && (
          <Button
            variant='outlined'
            startIcon={<ExpandLessOutlinedIcon />}
            onClick={handleMinusLimit}
            sx={{ fontWeight: "bold", border: "2px solid" }}>
            Show Less
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Home;
