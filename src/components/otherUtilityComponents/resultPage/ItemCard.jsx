import React, { useState } from "react";
import {
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  styled,
} from "@mui/material";
import HotelImg from "../../hotelObj.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ItemCard() {
  const [bannerSrc, setBannerSrc] = useState(HotelImg.images[0]);
  return (
    <Card variant="outlined">
      <CardActionArea sx={{ display: "flex", px: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            gap: ".5rem",
            flexDirection: "column",
            maxWidth: "20rem",
          }}
        >
          <Paper>
            <CardMedia component="img" image={bannerSrc} alt="Hotel Image" sx={{
              maxHeight:"13rem",
              overflow: "hidden",
              borderRadius:"1rem"
            }}/>
          </Paper>
          <Stack direction="row">
            {HotelImg.images.map((hotelSrc) => {
              return (
                <Item item >
                  <CardMedia
                  sx={{height: "3rem", width:"4rem",borderRadius:"1rem", overflow: "hidden" }}
                    component="img"
                    key={hotelSrc}
                    image={hotelSrc}
                    onMouseOver={() => setBannerSrc(hotelSrc)}
                    alt="Hotel Image"
                  />
                </Item>
              );
            })}
          </Stack>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ItemCard;
