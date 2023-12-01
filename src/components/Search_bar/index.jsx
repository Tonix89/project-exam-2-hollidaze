import { Container, TextField, Box, Link } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { VenueData } from "../Pages/Home";
import theme from "../../styles/theme";

let styles = {
  display: "none",
};

function SearchBar() {
  const data = useContext(VenueData);
  const [searchValue, setSearchValue] = useState("");
  const [productList, setProductList] = useState([]);
  const [showList, setShowList] = useState(false);

  function clearSearch() {
    setSearchValue("");
  }

  function CreateList({ item }) {
    if (searchValue) {
      return (
        <Link href={`/venue/${item.id}`} underline='none'>
          <Box onClick={clearSearch}>{item.name}</Box>
        </Link>
      );
    } else {
      styles = {
        display: "none",
      };
    }
  }

  useEffect(() => {
    const filterProducts = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
    setProductList(filterProducts);
  }, [searchValue, data]);

  useEffect(() => {
    const handleDomClick = (e) => {
      if (e.target.id === "search-input" || e.target.id === "search-results") {
        return;
      }
      setShowList(false);
    };

    document.addEventListener("click", handleDomClick);

    return () => {
      document.removeEventListener("click", handleDomClick);
    };
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "grey.main",
        mb: 1,
        textAlign: "center",
        position: "relative",
      }}>
      <TextField
        id='search-input'
        variant='outlined'
        label='Search Here'
        value={searchValue}
        size='small'
        onChange={(event) => {
          setSearchValue(event.target.value);
          styles = {
            position: "absolute",
            top: "50px",
            backgroundColor: "white",
            zIndex: "100",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "start",
            textAlign: "start",
            padding: "10px",
          };
          setShowList(true);
        }}
        sx={{
          backgroundColor: "white",
          m: 1,
          width: { xs: "95%", md: "80%" },
          borderRadius: "25px",
          "& .MuiInputBase-root": { borderRadius: "25px" },
          "& .MuiInputLabel-root": {
            mt: "2px",
            backgroundColor: "white",
            px: 1,
            fontWeight: "bold",
          },
        }}
      />
      {searchValue && (
        <ClearIcon
          onClick={() => {
            setSearchValue("");
          }}
          sx={{
            position: "absolute",
            right: { xs: "50px", md: "150px" },
            top: "17px",
            cursor: "pointer",
          }}
        />
      )}
      {showList && (
        <Box
          id='search-results'
          style={styles}
          sx={{
            left: { xs: "35px", sm: "50px", md: "145px" },
            maxWidth: { xs: "230px", md: "500px" },
            borderRadius: "10px",
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
          }}>
          {productList.length === 0 ? (
            <p>No item matches</p>
          ) : (
            productList.map((item) => <CreateList key={item.id} item={item} />)
          )}
        </Box>
      )}
    </Container>
  );
}

export default SearchBar;
