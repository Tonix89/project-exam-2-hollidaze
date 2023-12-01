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
  const [isContinent, isCountry, isUpdated, isPrice] = props.filter;
  const [open, setOpen] = useState(false);

  const data = useContext(VenueData);

  const [continent, setContinent] = useState("");
  const [continentValue, setContinentValue] = useState("");
  const [continentInput, setContinentInput] = useState("");

  const [newData, setNewData] = useState([]);
  const [country, setCountry] = useState("");
  const [countryInput, setCountryInput] = useState("");

  const [sortValue, setSortValue] = useState(null);
  const [sortInput, setSortInput] = useState("");
  const [sort, setSort] = useState(null);

  const [price, setPrice] = useState("");
  const [sortPrice, setSortPrice] = useState(null);
  const [sortPriceInput, setSortPriceInput] = useState("");

  const [filter, setFilter] = useState(false);

  const sortOptions = [
    { label: "Newest to Oldest", value: "desc" },
    { label: "Oldest to Newest", value: "asc" },
  ];

  const isOptionEqualToValue = (option, sortValue) => {
    return option.value === sortValue.value;
  };

  const sortPriceOptions = [
    { label: "Lowest to Highest", value: "asc" },
    { label: "Highest to Lowest", value: "desc" },
  ];

  const isPriceOptionEqualToValue = (option, sortValue) => {
    return option.value === sortValue.value;
  };

  const continentOption = Array.from(
    new Set(data.map((venue) => venue.location.continent)),
  ).filter((value) => value !== "");

  useEffect(() => {
    if (continent) {
      setNewData(
        data.filter((venue) => venue.location.continent === continent),
      );
    } else {
      setNewData(data);
    }
  }, [data, continent]);

  useEffect(() => {
    if (continent || country || sortValue || sortPrice) {
      setFilter(true);
    }

    if (sortValue) {
      setSort(sortValue.value);
    } else {
      setSort(null);
    }

    if (sortPrice) {
      setPrice(sortPrice.value);
    } else {
      setPrice("");
    }
  }, [continent, country, sortValue, sortInput, sortPriceInput, sortPrice]);

  const saveFilter = () => {
    if (filter) {
      props.filterData([continent, country, sort, price, filter]);
    }
    setOpen(false);
  };

  const countryOption = Array.from(
    new Set(newData.map((country) => country.location.country)),
  ).filter((value) => value !== "");

  const handleOpen = () => {
    setOpen(true);

    if (isContinent) {
      setContinent(isContinent);
      setContinentInput(isContinent);
      setContinentValue(isContinent);
    }

    if (isCountry) {
      setCountryInput(isCountry);
      setCountry(isCountry);
    }

    if (isUpdated === "desc") {
      setSortValue({ label: "Newest to Oldest", value: "desc" });
      setSortInput("Newest to Oldest");
    } else if (isUpdated === "asc") {
      setSortValue({ label: "Oldest to Newest", value: "asc" });
      setSortInput("Oldest to Newest");
    } else {
      setSortInput("");
      setSortValue(null);
    }

    if (isPrice === "asc") {
      setSortPrice({ label: "Lowest to Highest", value: "asc" });
      setSortPriceInput("Lowest to Highest");
    } else if (isPrice === "desc") {
      setSortPrice({ label: "Highest to Lowest", value: "desc" });
      setSortPriceInput("Highest to Lowest");
    } else {
      setSortPriceInput("");
      setSortPrice(null);
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
                setContinent(newContinentValue);
              }}
              inputValue={continentInput}
              onInputChange={(e, newValue) => {
                setContinentInput(newValue);
                setCountry("");
              }}
              id='continent-option'
              options={continentOption}
              sx={{
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
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant='h6' component='h2' sx={{ fontWeight: "bold" }}>
              Creation
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
              value={sortPrice}
              options={sortPriceOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={isPriceOptionEqualToValue}
              onChange={(e, newSortValue) => {
                setSortPrice(newSortValue);
              }}
              inputValue={sortPriceInput}
              onInputChange={(e, newValue) => {
                setSortPriceInput(newValue);
              }}
              id='sort-price-option'
              sx={{
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
