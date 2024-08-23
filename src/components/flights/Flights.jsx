
import React, { useEffect, useRef, useState } from "react";
import "./flights.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import BgSvg from "../otherUtilityComponents/BgSvg";
import { Autocomplete, Button, TextField } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FlightModal from "./FlightModal";
import Offers from "../Offers/Offers";
import API from "../../axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
function Flights() {
  const [airports,setAirports]=useState([]);
  const navigate=useNavigate();
  const sourceRef=useRef();
  const destinationRef=useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [source,setSource]=useState('');
  const [destination,setDestination]=useState('');
  const [departureDate,setDepartureDate]=useState(new Date());
  const [day,setDay]=useState((new Date()).getDay());
  const [passengerDetails,setPassengerDetails]=useState({
    adults:1,
    children:0,
    infant:0,
    });//test
    const [error, setError] = useState('');
    
    const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
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
  function validateForm(){
    if (source==='') {
      setError('Enter Source!')      
    sourceRef.current.focus();
  // sourceRef.current.setAttribute("error",'true');
    }else if (destination==='') {
      setError('Enter Destination!');
      destinationRef.current.focus();
    }else if (source===destination) {
      setError('Source and Destination can not be same!');
      destinationRef.current.focus();
    }else{
      return true;
    }
  }
  function handleFlightsSearch(){
    // console.log(source,destination)
    if(validateForm()){
      // console.log("form valid now :-> date is ",departureDate,day);
    navigate(`/flights/${source}/${destination}/${day}/${passengerDetails.adults}-${passengerDetails.children}-${passengerDetails.infant}`,{state:{
      source:source,
      destination:destination,
      departureDate:departureDate,
      day:day,
      adults:passengerDetails.adults,
      children:passengerDetails.children,
      infant:passengerDetails.infant,
      airports:airports
    }})
    }    
  }
  async function getFlightsData() {
    try {
      const config = {
        headers: {
          projectID: "wwu21mw2nfkr",
        },
      };
      const response=await API.get(`airport`);
      // console.log(response.data.data);
      setAirports(response.data.data.airports.map(airport=>{
        return `${airport.city} - ${airport.iata_code}`;
      }))
    } catch (error) {
      console.log(error);
    }finally{
      console.log(airports);
    }
  }
  useEffect(()=>{
    getFlightsData();
  },[])
  
  return !isLoading ? (
    <div className="flights">
      <BgSvg />
      <div className="flight-page-title">Book Flights</div>
      <div className="flights-form-container">
        <div className="flights-city-input">
          <div className="source">
          <Autocomplete
            disablePortal
            options={airports.map((ap) =>{return ap})}
            // defaultValue={source}
            value={source}
            onChange={(e, val) => {
              setSource(val);
            }}
            sx={{ width: 300, }}
            renderInput={(params) => (
              <TextField
              inputRef={sourceRef}
                {...params}
                placeholder="Enter City eg. HYD"
                
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: '#696969', 
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
                variant="outlined"
                // sx={{ backgroundColor: "primary.dark" }}
                label="From"
              />
            )}
          />
          {/* <TextField
            id="outlined-basic"
            label="From"
            inputRef={sourceRef}
            onChange={(e)=>{setSource(e.target.value)}}
            value={source}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: '#696969',  
                fontSize: "20px",
                fontWeight: 700,
              },
            }}
            variant="outlined"
            placeholder="Enter City eg. HYD"
          />
          {source && sourceSuggest && <Suggest array={airports} setSuggest={setSourceSuggest} value={source} handleClick={(val)=>{setSource(val)}}/>} */}
          </div>
          <div className="compare-arrows">
            <SyncAltIcon className="swap-btn" onClick={()=>{
              let temp=sourceRef.current.value;
              sourceRef.current.value=destinationRef.current.value;
              destinationRef.current.value=temp;
              // console.log("swap",sourceRef.current.value,destinationRef.current.value);          
            }}/>
          </div>
          <div className="destination">
          <Autocomplete
            disablePortal
            options={airports.map((ap) =>{return ap})}
            // defaultValue={destination}
            value={destination}
            onChange={(e, val) => {
              setDestination(val);
            }}
            sx={{ width: 300, }}
            renderInput={(params) => (
              <TextField
              inputRef={destinationRef}
                {...params}
                placeholder="Enter City eg. BOM"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: '#696969', 
                    fontSize: "20px",
                    fontWeight: 700,
                  },
                }}
                variant="outlined"
                // sx={{ backgroundColor: "primary.dark" }}
                label="To"
              />
            )}
          />
          </div>
        </div>
        <div className="flight-col-2">

        <div className="date-input">
          <TextField
            id="outlined-basic"
            label="Departure"
            type="date"
            onChange={(e)=>{
              setDepartureDate(e.target.value);
              const newdate=new Date(e.target.value);
              const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
              const dayNum=newdate.getDay();
              setDay(days[dayNum]);
              // console.log(days[dayNum]);
            }}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: '#696969', 
                fontSize: "20px",
                fontWeight: 700,
              },
            }}
            variant="outlined"
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker 
            label="Departure Date"
            // defaultValue={dayjs(departureDate)}
            value={dayjs(departureDate)}
            onChange={(val) => {
              setDepartureDate(val);
              console.log(val);
              const newdate=new Date(val);
            // debugger;
              const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
              const dayNum=newdate.getDay();
              setDay(days[dayNum]);
              console.log(val,days[dayNum]);
            }}
            inputProps={{ variant: "filled" }}
            sx={{
              width: 300,
              // mx:'1.5rem',
              // backgroundColor: "primary.dark",
              // color: "secondary.contrastText",
              "& .MuiInputLabel-root": {
                color: "#fff",
              },
            }} />
          </DemoContainer>
        </LocalizationProvider> */}
        </div>
        <div className="number-of-trevellers">
        <Button variant="outlined" onClick={handleClickOpen} sx={{color:"black",padding:"1rem"}}>
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
      {error && <p className="error">{error}</p>}
      <Offers/>
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
