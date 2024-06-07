
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import TopBar from "../otherUtilityComponents/resultPage/TopBar";
import { LoginContext } from "../Contexts/contexts";
import DatePicker from "react-datepicker";
import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import HotelModal from "./HotelModal";
import Search from "../otherUtilityComponents/Search";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
import axios from "axios";
import SideBar from "../otherUtilityComponents/resultPage/SideBar";
import HotelCard from "./HotelCard";

function HotelSearchInterface() {
  const location = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [city, setCity] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState({
    adults: 0,
    children: 0,
  });
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [hotelsArray, setHotelsArray] = useState([]);
  const [hotelDetails, setHotelDetails] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guests: {
      rooms: "",
      adults: "",     
      children: "",
    },
  });
  const handleSearchBtnClick = () => {
    console.log("hii from handle search results");
    setHotelDetails((oldData) => {
      return {
        ...oldData,
        city: city,
        checkInDate: startDate,
        checkOutDate: endDate,
        guests: {
          rooms: noOfRooms,
          adults: noOfGuests.adults,
          children: noOfGuests.children,
        },
      };
    });
  };
  async function getHotelsList(location) {
    setIsLoading(true);
    try {
      const config = getHeaderWithProjectId();
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`,
        config      
      );
      console.log("Response.data.data.hotels",response.data.data.hotels);
      setHotelsArray(response.data.data.hotels);
    } catch (err) {
      console.log("err", err.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("currentCity",location);
      // console.log(response.data.data);
    }
  }
  

  useEffect(() => {
    console.log("location.state",location);
    console.log("hotels arr",hotelsArray);
    setCity(location.city);
    getHotelsList(location.city);
  }, []);

  return (
    <div id="hotel-search-result">
      <TopBar>
        <Box component="form" noValidate autoComplete="off" >
          <Grid container  display="fles" justifyContent="center" alignItems="center" spacing={2} className="hotel-search-city-input">
          <Grid item  sx={{py:".5rem"}}>
          <Typography className="text-white">Location</Typography>
          <Search
            handleSearch={(value) => {
              setCity(value);
            }}
            searchFor="City"
            array={hotelsArray}
            color="primary.contrastText"
            sx={{backgroundColor:"primary.dark",borderRadius:".5rem",p:".2rem",px:".5rem"}}          
          />
          </Grid>
          <Grid item  className="room-detail-parent">
            <Typography className="text-white">Check-in</Typography>
            <Button variant="contained" sx={{backgroundColor:"primary.dark", color:"primary.contrastText"}}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              withPortal
              color="white"
              className="hotel-search-date"
            />
            </Button>
          </Grid>
          <Grid item  className="room-detail-parent">
            <Typography className="text-white">Check-out</Typography>
            <Button variant="contained" sx={{backgroundColor:"primary.dark", color:"primary.contrastText"}}>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              withPortal
              className="hotel-search-date"
              />
              </Button>
          </Grid>
          <Grid item  id="guest-rooms" className="room-detail-parent">
            <Typography className="text-white">Guests & Rooms</Typography>
              
            <Button variant="contained" sx={{backgroundColor:"primary.dark", color:"primary.contrastText"}}>
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
            <Button variant="contained" fullWidth  sx={{backgroundColor:"primary.contrastText", color:"secondary.contrastText", maxHeight:"min-content", mt:"1.5rem" }} onClick={handleSearchBtnClick} >Update Search</Button>
          </Grid>
        </Grid>

          
        </Box>
      </TopBar>
      <SideBar/>
      <HotelCard/>

    </div>
  );
}

export default HotelSearchInterface;
