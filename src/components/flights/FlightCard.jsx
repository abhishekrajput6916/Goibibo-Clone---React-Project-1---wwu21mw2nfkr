import "./flights.css";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";

import FlightDetails from "./FlightDetails";
import API from "../../axios";
import { AccessTime } from "@mui/icons-material";

const FlightCard = ({ card }) => {
  const [data, setData] = useState('')

async function getData(flightId) {
  try {
    const response = await API.get(`flight/${flightId}`);
    setData(response.data.data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <Card>
      <Accordion onChange = {(e,expanded) => {
        if(expanded){
          getData(card._id)
          // console.log(card._id);
        }  
      }}>
        <CardContent className="flights-card">
          <div className="flight-card-header">
            <Box
              className="airlineLogo"
            >
            </Box><Typography>{card.flightID}</Typography>
            {/* <Chip label="Cheapest" color="primary" /> */}
          </div>
          <div className="flight-card-details">
            <div>
              <Typography variant="h6">{card.source}, India</Typography>
              <Typography variant="h4">{card.arrivalTime}</Typography>
            </div>
            <Box sx={{alignItems:'center',display:'flex', flexDirection:'column' }}>
            <AccessTime />
            <Typography variant="h6">{card.duration}h 00m</Typography>
            </Box>
            <div>
              <Typography variant="h6">{card.destination}, India</Typography>
              <Typography variant="h4">
                {card.departureTime}{" "}
                <Typography variant="caption">+1D</Typography>
              </Typography>
            </div>
            <Typography
              variant="h5"
              color="primary"
              style={{ marginBottom: "8px" }}
            >
              ₹{card.ticketPrice}
            </Typography>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header" >
              <Button variant="contained" className="flight-card-button">
                VIEW DETAILS
              </Button>
            </AccordionSummary>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign={"end"}
            style={{ marginBottom: "16px" }}
          >
            Use GIRUSH to get ₹380 OFF
          </Typography>
        </CardContent>
        <AccordionDetails sx={{p:'0'}}>
          <FlightDetails flight={data}/>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default FlightCard;
