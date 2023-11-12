import {useContext} from "react";
import { Card, CardContent, CardMedia, CardActionArea, Typography, Rating } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { VenueData } from "../Pages/Home";
import theme from "../../styles/theme";


function VenueCard() {
    const data = useContext(VenueData);

    console.log(data)

    let city = "City";
    let country = "Country";

    if(data.location.city && data.location.city.toUpperCase() !== "UNKNOWN"){
        city = data.location.city;
    };

    if(data.location.country && data.location.country.toUpperCase() !== "UNKNOWN"){
        country = data.location.country;
    };
    return (
        <Card sx={{
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
            minHeight: {xs:"0px", sm:"350px"},
        }}>
            <CardActionArea>
                <CardMedia component="img"
          height="140"
          image={data.media[0]}
          alt={data.description} sx={{p:0.5, width: "-webkit-fill-available", borderRadius: "10px"}}/>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div"  sx={{
                    fontWeight: "bold",
                }}>
                        {data.name}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div"  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                        {city.toUpperCase()}, {country.toUpperCase()}
                        <LocationOnIcon sx={{color:"light.main"}}/>
                    </Typography>
                    <Rating name="rating" defaultValue={data.rating} precision={0.1} readOnly sx={{color: "secondary.main"}} />
                    <Typography gutterBottom variant="h6" component="div"  sx={{
                    fontWeight: "bold",
                }}>
                        $ {data.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default VenueCard;