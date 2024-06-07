import React, { useEffect, useRef, useState } from "react";
import "./flights.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import BgSvg from "../otherUtilityComponents/BgSvg";
import { Button, TextField } from "@mui/material";
// import { CompareArrows } from "@mui/icons-material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FlightModal from "./FlightModal";
function Flights() {
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [source,setSource]=useState('DEL');
  const [destination,setDestination]=useState('AUH');
  const [departureDate,setDepartureDate]=useState(new Date());
  const [passengerDetails,setPassengerDetails]=useState({
    adults:1,
    children:0,
    infant:0,
  });//test

  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    
  };


  const handleClickOpen = () => {
    setOpen(true);
    // console.log("flights model open");
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      // console.log("flights model close");
      // console.log(event,reason);
      setPassengerDetails(oldState=>{
        return {...oldState,
          ...event,
        }
      });
    }
  };  
  function handleFlightsSearch(){
    const {adults,children,infant}=passengerDetails;
    // console.log(source,destination,departureDate,adults,children,infant);
    // getFlightDetails()
    navigate(`/flights/${source}-${destination}-${Number(departureDate.toString().slice(0, 10).split('-').join(''))}--${passengerDetails.adults}-${passengerDetails.children}-${passengerDetails.infant}`,{state:{
      source:source,
      destination:destination,
      departureDate:departureDate,
      adults:passengerDetails.adults,
      children:passengerDetails.children,
      infant:passengerDetails.infant,
    }})
  }
  // const flightsRef = useRef();

  return !isLoading ? (
    <div className="flights">
      {/* {flightsArray.map((flight)=>{
        return <div key={flight._id}>{flight.name}</div>
      })} */}
      <BgSvg />
      <div className="flight-page-title">Book Flights</div>
      <div className="flights-form-container">
        <div className="flights-city-input">
          <TextField
            id="outlined-basic"
            label="From"
            onChange={(e)=>{setSource(e.target.value)}}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "18px",
                fontWeight: 700,
              },
            }}
            variant="outlined"
            placeholder="Enter City or Airport"
          />
          <div className="compare-arrows">
            <SyncAltIcon />
          </div>
          <TextField
            id="outlined-basic"
            label="To"
            onChange={(e)=>{setDestination(e.target.value)}}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "18px",
                fontWeight: 700,
              },
            }}
            variant="outlined"
            placeholder="Enter City or Airport"
          />
        </div>
        <div className="flight-col-2">

        <div className="date">
          <TextField
            id="outlined-basic"
            label="Departure"
            type="date"
            onChange={(e)=>{setDepartureDate(e.target.value)}}
            InputLabelProps={{
              shrink: true,
              sx: {
                fontSize: "18px",
                fontWeight: 700,
              },
            }}
            variant="outlined"
          />
        </div>
        <div className="number-of-trevellers">
        <Button variant="outlined" onClick={handleClickOpen} sx={{color:"black"}}>
        {passengerDetails.adults} {passengerDetails.adults>1? "Adults":"Adult"}, {passengerDetails.children} {passengerDetails.children>1? "Children":"Child"}, {passengerDetails.infant} {passengerDetails.infant>1? "Infants":"Infant"}
      </Button>
       <FlightModal
        passengerDetails={passengerDetails}
        open={open}
        onClose={handleClose}
      />
        </div>
        </div>
      </div>
      <button
        className="flight-search-btn"
        onClick={handleFlightsSearch}
      >
        Search flights
      </button>
    </div>
  ) : (
    <div className="loader">
      <ThreeCircles
        height="100"
        width="100"
        color="#F16825"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

export default Flights;
