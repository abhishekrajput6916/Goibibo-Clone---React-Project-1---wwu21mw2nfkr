import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import TopBar from "../otherUtilityComponents/resultPage/TopBar";
// import { LoginContext } from "../Contexts/contexts";
import DatePicker from "react-datepicker";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import HotelModal from "./HotelModal";
import Search from "../otherUtilityComponents/Search";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
import axios from "axios";
import SideBar from "../otherUtilityComponents/resultPage/SideBar";
import HotelCard from "./HotelCard";

function HotelSearchInterface() {
  const location = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(location.startDate);
  const [endDate, setEndDate] = useState(location.endDate);
  const [noOfRooms, setNoOfRooms] = useState(location.noOfRooms);
  const [city, setCity] = useState(location.city);
  const [noOfGuests, setNoOfGuests] = useState(location.noOfGuests);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [hotelsArray, setHotelsArray] = useState([]);
  const [allLocations, setAllLocations] = useState(location.allLocations);
  const cityRef = useRef();

  const handleSearchBtnClick = () => {
    console.log("hii from handle search results");
  };
  async function getHotelsList(location) {
    setIsLoading(true);
    try {
      const config = getHeaderWithProjectId();
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`,
        config
      );
      console.log("Response.data.data.hotels", response.data.data.hotels);
      setHotelsArray(response.data.data.hotels);
    } catch (err) {
      console.log("err", err.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("currentCity", location);
      // console.log(response.data.data);
    }
  }

  useEffect(() => {
    getHotelsList(city);
  }, []);

  return (
    <div id="hotel-search-result">
      <TopBar>
        <Box component="form" noValidate autoComplete="off">
          <Grid
            container
            display="fles"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="hotel-search-city-input"
          >
            <Grid item>
              <Typography className="text-white">Location</Typography>
              {/* <Search
            handleSearch={(value) => {
              setCity(value);
            }}
            searchFor="City"
            array={hotelsArray}
            color="primary.contrastText"
            sx={{backgroundColor:"primary.dark",borderRadius:".5rem",p:".2rem",px:".5rem"}}          
          /> */}
              <Autocomplete
                disablePortal
                options={allLocations.map((ap) => {
                  return ap.cityState;
                })}
                value={city}
                onChange={(e, val) => {
                  setCity(val);
                }}
                sx={{ minWidth: 300 }}
                renderInput={(params) => (
                  <TextField
                    inputRef={cityRef}
                    className="city-input"
                    {...params}
                    placeholder="Enter City"
                    // InputLabelProps={{
                    //   shrink: true,
                    //   sx: {
                    //     color: "#fff",
                    //     fontSize: "20px",
                    //     marginBottom:'1rem',
                    //     fontWeight: 500,
                    //   },
                    // }}
                    sx={{
                      backgroundColor: "primary.dark",
                      borderRadius: ".5rem",
                    }}
                    variant="outlined"
                    // label="Location"
                  />
                )}
              />
            </Grid>
            <Grid item className="room-detail-parent">
              <Typography className="text-white">Check-in</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  py: "1rem",
                }}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  withPortal
                  color="white"
                  className="hotel-search-date"
                />
              </Button>
            </Grid>
            <Grid item className="room-detail-parent">
              <Typography className="text-white">Check-out</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  py: "1rem",
                }}
              >
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  withPortal
                  className="hotel-search-date"
                />
              </Button>
            </Grid>
            <Grid item id="guest-rooms" className="room-detail-parent">
              <Typography className="text-white">Guests & Rooms</Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  py: "1rem",
                }}
              >
                <Typography
                  className="txt-large"
                  onClick={() => {
                    setShowGuestModal((old) => !old);
                  }}
                >
                  {noOfGuests.adults} Adults | {noOfGuests.children} Child |{" "}
                  {noOfRooms} {noOfRooms == 1 ? "Room" : "Rooms"}
                </Typography>
              </Button>
              {/* <div className="hotel-modal-container"> */}

              {showGuestModal && (
                <HotelModal
                  onClose={() => setShowGuestModal(false)}
                  setGuests={(adults, children) => {
                    setNoOfGuests((old) => {
                      return {
                        ...old,
                        adults: adults,
                        children: children,
                      };
                    });
                  }}
                  setRooms={(rooms) => setNoOfRooms(rooms)}
                />
              )}
            </Grid>
            <Grid item justifySelf="flex-end">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "primary.contrastText",
                  color: "secondary.contrastText",
                  maxHeight: "min-content",
                  mt: "1.5rem",
                }}
                onClick={handleSearchBtnClick}
              >
                Update Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TopBar>
      <SideBar />
      <div className="hotel-card-container">
        {hotelsArray.map((hotel)=>{
          return (<HotelCard hotel={hotel}/>)
        })}
      </div>
    </div>
  );
}

export default HotelSearchInterface;
