import {
  Box,
  Typography,
  Modal,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import theme from "../../styles/theme";
import { VenueData } from "../Pages/Home";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: theme.palette.secondary.main,
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", md: "30%" },
};

function SortFilter(props) {
  const [open, setOpen] = useState(false);

  const newUrl = useNavigate();

  const data = useContext(VenueData);
  const [continent, setContinent] = useState();
  const [continentValue, setContinentValue] = useState("");
  const [continentInput, setContinentInput] = useState("");
  const [newData, setNewData] = useState([]);
  const [country, setCountry] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [sortValue, setSortValue] = useState(null);
  const [sortInput, setSortInput] = useState("");

  const sortOptions = [
    { label: "Lowest to Highest", value: "asc" },
    { label: "Highest to Lowest", value: "desc" },
  ];

  const isOptionEqualToValue = (option, sortValue) => {
    return option.value === sortValue.value;
  };

  const continentOption = Array.from(
    new Set(data.map((venue) => venue.location.continent)),
  ).filter((value) => value !== "");

  useEffect(() => {
    if (continent) {
      // eslint-disable-next-line
      setNewData(
        data.filter((venue) => venue.location.continent === continent),
      );
    } else {
      setNewData(data);
    }
    // eslint-disable-next-line
  }, [continent]);

  const saveFilter = () => {
    if (sortValue) {
      props.filterData([continentValue, country, sortValue.value]);
    } else {
      props.filterData([continentValue, country, sortValue]);
    }

    if (continentValue || country || sortValue) {
      if (continentValue && country && !sortValue) {
        newUrl(`?&filter=true&continent=${continentValue}&country=${country}`);
      } else if (continentValue && !country && !sortValue) {
        newUrl(`?&filter=true&continent=${continentValue}`);
      } else if (!continentValue && !country && sortValue) {
        newUrl(`?&filter=true&price=${sortValue.value}`);
      } else if (!continentValue && country && !sortValue) {
        newUrl(`?&filter=true&country=${country}`);
      } else if (!continentValue && country && sortValue) {
        newUrl(`?&filter=true&country=${country}&price=${sortValue.value}`);
      } else if (continentValue && !country && sortValue) {
        newUrl(
          `?&filter=true&continent=${continentValue}&price=${sortValue.value}`,
        );
      } else {
        newUrl(
          `?&filter=true&continent=${continentValue}&country=${country}&price=${sortValue.value}`,
        );
      }
    } else {
      newUrl("");
    }

    setOpen(false);
  };

  const countryOption = Array.from(
    new Set(newData.map((country) => country.location.country)),
  ).filter((value) => value !== "");

  const handleOpen = () => {
    setOpen(true);
    const currentUrl = window.location.href;

    const urlParams = new URLSearchParams(currentUrl);

    const isContinent = urlParams.get("continent");
    if (isContinent) {
      setContinent(isContinent);
      setContinentInput(isContinent);
      setContinentValue(isContinent);
    }
    const isCountry = urlParams.get("country");
    if (isCountry) {
      setCountryInput(isCountry);
      setCountry(isCountry);
    }
    const isPrice = urlParams.get("price");
    if (isPrice) {
      if (isPrice === "asc") {
        setSortValue({ label: "Lowest to Highest", value: "asc" });
        setSortInput("Lowest to Highest");
      } else if (isPrice === "desc") {
        setSortValue({ label: "Highest to Lowest", value: "desc" });
        setSortInput("Highest to Lowest");
      } else {
        setSortInput("");
        setSortValue(null);
      }
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant='outlined'
        endIcon={<TuneOutlinedIcon />}
        sx={{
          mb: 1,
          background: theme.palette.light.main,
          borderColor: theme.palette.grey.main,
          fontWeight: "bold",
        }}
        onClick={handleOpen}>
        Sort & Filter
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box>
            <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
              Continent
            </Typography>
            <Autocomplete
              freeSolo
              value={continentValue}
              onChange={(e, newContinentValue) => {
                setContinentValue(newContinentValue);
              }}
              inputValue={continentInput}
              onInputChange={(e, newValue) => {
                setContinentInput(newValue);
                setContinent(newValue);
                setCountry("");
              }}
              id='continent-option'
              options={continentOption}
              sx={{
                width: 300,
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
              Country
            </Typography>
            <Autocomplete
              freeSolo
              value={country}
              onChange={(e, newCountryValue) => {
                setCountry(newCountryValue);
              }}
              inputValue={countryInput}
              onInputChange={(e, newValue) => {
                setCountryInput(newValue);
              }}
              id='country-option'
              options={countryOption}
              sx={{
                width: 300,
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
              Price
            </Typography>
            <Autocomplete
              value={sortValue}
              options={sortOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={isOptionEqualToValue}
              onChange={(e, newSortValue) => {
                setSortValue(newSortValue);
              }}
              inputValue={sortInput}
              onInputChange={(e, newValue) => {
                setSortInput(newValue);
              }}
              id='sort-option'
              sx={{
                width: 300,
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant='contained'
              onClick={saveFilter}
              sx={{ width: 100, borderRadius: "20px", fontWeight: "bold" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SortFilter;
