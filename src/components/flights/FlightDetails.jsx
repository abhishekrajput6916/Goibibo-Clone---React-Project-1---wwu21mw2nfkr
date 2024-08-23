import React, { useContext } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import {
  Cancel,
  AirlineSeatReclineNormal,
  Fastfood,
  Work,
  Luggage,
  EventRepeat,
} from "@mui/icons-material";
import "./flights.css";
import { useEffect } from "react";
import { LoginContext, useAuth, useModal } from "../Contexts/contexts";
import { useNavigate, useParams } from "react-router-dom";
// import { ModalContext } from '../Contexts/contexts';

const FlightDetails = (flight) => {
  const {flightSource,flightDestination,flightDay,flightPassengers}=useParams();
  const { isLoggedIn } = useAuth();
  const { showModal, setShowModal } = useModal();
  const navigate = useNavigate();
  const details = [
    {
      icon: <Cancel />,
      label: "Cancellation fee, per passenger",
      value: "Starting from ₹3600",
    },
    {
      icon: <AirlineSeatReclineNormal />,
      label: "Seat",
      value: `${flight.flight.availableSeats} left`,
    },
    { icon: <Fastfood />, label: "Meal", value: "FREE meal", highlight: true },
    { icon: <Work />, label: "Cabin baggage", value: "7 KGS" },
    { icon: <Luggage />, label: "Check-in baggage", value: "15 KGS" },
    {
      icon: <EventRepeat />,
      label: "Date change fee, per passenger",
      value: "Starting from ₹3350",
    },
  ];

  useEffect(()=>{console.log(flight)},[])
  function handleFlightBookin() {
    if (isLoggedIn) {
      // navigate('./')
      console.log("yes logged in", showModal, isLoggedIn);
    } else {
      setShowModal(true);
      console.log(" Not logged in", showModal, isLoggedIn);
    }
  }
  return (
    
      <Box className="flight-detail-root">
        <div className="flight-detail-header">
          <Typography variant="h6">FLEXI</Typography>
          <Typography className="flight-detail-price">
            ₹{flight.flight.ticketPrice}
          </Typography>
        </div>
        <Divider />
        <div className="flight-detail-details">
          {details.map((item, index) => (
            <div key={index} className="flight-detail-detailItem">
              <Box display="flex" alignItems="center">
                {item.icon}
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color={item.highlight ? "green" : "textPrimary"}
                style={{ fontWeight: item.highlight ? "bold" : "normal" }}
              >
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flight-detail-buttons">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
            onClick={() => {
              navigate(`/flight/${flightSource}/${flightDestination}/${flightDay}/${flightPassengers}/checkout`, { state: {
                flightData:flight,
              } });
            }}
          >
            Book Now
          </Button>
          {/* <Button variant="outlined" color="secondary">
            Lock Price
          </Button> */}
        </div>
      </Box>
  );
};

export default FlightDetails;
