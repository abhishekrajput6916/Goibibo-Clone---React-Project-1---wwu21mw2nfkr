import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { lazy, sus } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FlightModal from "./FlightModal";
import { ThreeCircles } from "react-loader-spinner";
import FlightFilter from "./FlightFilter";
import { Tune } from "@mui/icons-material";
import API from "../../axios";
// import FlightsSorting from "./FlightsSorting";
import FlightsSortBy from "./FlightsSorting";
import { Datepicker } from "flowbite-react";
import { useFlightData } from "../Contexts/contexts";
// import FlightCard from "./FlightCard";
const FlightCard = lazy(() => import("./FlightCard"));

function FlightsSearch() {
  const sourceRef = useRef();
  const destinationRef = useRef();
  const [error, setError] = useState("");
  const matches = useMediaQuery("(min-width:880px)");
  const location = useLocation().state;
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState(location.airports);
  const [source, setSource] = useState(location.source);
  const [destination, setDestination] = useState(location.destination);
  const [day, setDay] = useState(location.day);
  const [departureDate, setDepartureDate] = useState(location.departureDate);
  const [passengerDetails, setPassengerDetails] = useState({
    adults: location.adults,
    children: location.children,
    infant: location.infant,
  }); //test
  const [isLoading, setIsLoading] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const {flightContext,setFlightContext}=useFlightData();

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  async function getFlightDetails(source, destination, dy) {
    const src = source.split("-")[1].trim();
    const dest = destination.split("-")[1].trim();
    setIsLoading(true);
    try {
      const config = {
        headers: {
          projectID: "wwu21mw2nfkr",
        },
      };
      const response = await API.get(
        `flight?search={"source":"${src}","destination":"${dest}"}&day=${dy}`
      );
      setFlights(response.data.data.flights)      
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
      // console.log(flightContext);
    }
  }
  // useEffect(() => {console.log("hii");},[source,destination])
  useEffect(() => {
    // getFlightDetails(source, destination, day);
    handleFlightsUpdate();
    console.log(flightContext)
  }, []);
  useEffect(() => {
    console.log(flights)
  }, [flights])
  
  function handleFlightsUpdate() {
    if (validateForm()) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const newdate = new Date(departureDate);
      const dayNum = newdate.getDay();
      setDay(days[dayNum]);
      getFlightDetails(source, destination, day);
      
    }
  }
  function validateForm() {
    // console.log('hii from validate form');
    if (source === "") {
      setError("Enter Source!");
      sourceRef.current.focus();
      // sourceRef.current.setAttribute("error",'true');
    } else if (destination === "") {
      setError("Enter Destination!");
      destinationRef.current.focus();
    } else if (source === destination) {
      setError("Source and Destination can not be same!");
      destinationRef.current.focus();
    } else {
      return true;
    }
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setPassengerDetails((oldState) => {
        return { ...oldState, ...event };
      });
    }
  };
  return (
    <div className="w-screen">
      <header className="flights-header">
        <div className="flight-city-input">
          <Autocomplete
            disablePortal
            options={airports.map((ap) => ap)}
            // defaultValue={source}
            onChange={(e, val) => {
              setSource(val);
            }}
            sx={{
              width: 300,
              "& .MuiAutocomplete-input, .MuiFormLabel-root": {
                color: "#fff",
              },
            }}
            value={source}
            renderInput={(params) => (
              <TextField
                inputRef={sourceRef}
                // variant="filled"
                sx={{ backgroundColor: "primary.dark" }}
                {...params}
                label="Search by location"
              />
            )}
          />
          <div className="compare-arrows">
            <SyncAltIcon
              onClick={() => {
                let temp = sourceRef.current.value;
                sourceRef.current.value = destinationRef.current.value;
                destinationRef.current.value = temp;
                // console.log(
                //   "swap",
                //   sourceRef.current.value,
                //   destinationRef.current.value
                // );
              }}
            />
          </div>
          <Autocomplete
            disablePortal
            options={airports.map((ap) => ap)}
            // defaultValue={destination}
            value={destination}
            onChange={(e, val) => {
              setDestination(val);
            }}
            // sx={{ width: 300, }}
            sx={{
              width: 300,
              "& .MuiAutocomplete-input, .MuiFormLabel-root": {
                color: "#fff",
              },
            }}
            renderInput={(params) => (
              <TextField
                inputRef={destinationRef}
                {...params}
                // variant="filled"
                sx={{ backgroundColor: "primary.dark" }}
                label="Search by location"
              />
            )}
          />
        </div>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
        {/* <Datepicker
            defaultValue={departureDate}
            value={departureDate}
            onChange={(val) => {
              setDepartureDate(val);
            }}
            sx={{
              width: 300,
              // mx:'1.5rem',
              backgroundColor: "primary.dark",
              color: "secondary.contrastText",
              "& .MuiInputBase-input, .MuiSvgIcon-root, .MuiInputLabel-root": {
                color: "#fff",
              },
            }}
            inputProps={{ variant: "filled" }}
            label="Departure Date"
          /> */}
        {/* </LocalizationProvider> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Departure Date"
              defaultValue={dayjs(departureDate)}
              value={dayjs(departureDate)}
              onChange={(val) => {
                setDepartureDate(val);
                console.log(val);
                const newdate = new Date(val);
                // debugger;
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const dayNum = newdate.getDay();
                setDay(days[dayNum]);
              }}
              inputProps={{ variant: "filled" }}
              sx={{
                width: 300,
                // mx:'1.5rem',
                backgroundColor: "primary.dark",
                color: "secondary.contrastText",
                "& .MuiInputBase-input, .MuiSvgIcon-root, .MuiInputLabel-root":
                  {
                    color: "#fff",
                  },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="standard"
          className="flight-btn"
          onClick={handleClickOpen}
          sx={{
            color: "#fff",
            backgroundColor: "primary.dark",
            padding: "1rem",
            margin: "1rem ",
          }}
        >
          {passengerDetails.adults}{" "}
          {passengerDetails.adults > 1 ? "Adults" : "Adult"},{" "}
          {passengerDetails.children}{" "}
          {passengerDetails.children > 1 ? "Children" : "Child"},{" "}
          {passengerDetails.infant}{" "}
          {passengerDetails.infant > 1 ? "Infants" : "Infant"}
        </Button>
        <FlightModal
          passengerDetails={passengerDetails}
          open={open}
          onClose={handleClose}
        />
        <StyledButton
          variant="filled"
          className="flight-btn"
          sx={{
            color: "primary.main",
            fontWeight: "700",
            backgroundColor: "#fff",
            padding: "1rem",
            margin: "1rem ",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
          }}
          onClick={handleFlightsUpdate}
        >
          Update Search
        </StyledButton>
        <div className="error">{error}</div>
      </header>
      <Box className="flights-container">
        {matches ? (
          <FlightFilter
            handleFlights={(val) => {
              setFlights(val);
            }}
            source={source}
            destination={destination}
            day={day}
            loading={(val) => {
              setIsLoading(val);
            }}
          />
        ) : (
          <div>
            <Button className="drawer-btn" onClick={toggleDrawer(true)}>
              <Tune sx={{ fontSize: "1.3rem" }} />
              Filters
            </Button>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              <FlightFilter
                handleFlights={(val) => {
                  setFlights(val);
                }}
                source={source}
                destination={destination}
                day={day}
                loading={(val) => {
                  // setIsLoading(val);
                }}
              />
            </Drawer>
          </div>
        )}
        <div>
          <FlightsSortBy
            handleSort={(val) => {
              setFlights(val);
            }}
            handleLoading={(val) => {
              setIsLoading(val);
            }}
            source={source}
            destination={destination}
            day={day}
            totalFlights={flights.length}
          />
          <Box className="flights-card-container">
            <Suspense   fallback={<div>LOADING...</div>}>
            {!isLoading ? (
              flights.map((card) => {
                return (
                    <FlightCard key={card._id} card={card} />
                  );
                })
                
            ) : (
              <div className="loader flights-loader">
                <ThreeCircles
                  height="50"
                  width="50"
                  color="#F16825"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                  className="loader-spinner"
                />
              </div>
            )}
            </Suspense>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default FlightsSearch;

export const StyledButton = styled(Button)(({ theme, color = "primary" }) => ({
  ":hover": {
    color: theme.palette[color].main,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
}));
