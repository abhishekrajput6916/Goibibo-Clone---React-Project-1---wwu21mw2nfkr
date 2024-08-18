import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';
import axios from 'axios';
import API from '../../axios';
const FlightFilter = ({handleFlights,source,destination,day,loading}) => {
    // const classes = useStyles();
    const [departureTime, setDepartureTime] = useState([]);
    const [stops, setStops] = useState(0);
    const [priceRange, setPriceRange] = useState([1000, 11759]);
    const [data,setData]=useState([])
  
    const handleDepartureTime = (event, newDepartureTime) => {
      setDepartureTime(newDepartureTime);
    };
    // useEffect(() => {
    //   console.log(priceRange);
    // }, [priceRange])
    
  
    const handleStops = (event, newStops) => {
      setStops(newStops);
    };
  
    const handlePriceChange = (event, newPriceRange) => {
      setPriceRange(newPriceRange);
    };
  
    const handleReset = () => {
      setDepartureTime('');
      setStops('');
      setPriceRange([1000, 11759]);
    };
  // useEffect(() => {
  //   // console.log(source,destination);
  //   console.log(data);

    
  // }, [data])
  async function getData(stops,PR) {
    loading(true)
    const src = source.split("-")[1].trim();
    const dest = destination.split("-")[1].trim();
    // const stp=stops.split(' ')[0].trim()
    try {
        const response=await API.get(`flight?search={"source":"${src}","destination":"${dest}"}&day=${day}&filter={"ticketPrice":{"$lte":${PR[1]},"$gte":${PR[0]}},"stops":${stops}}`)
     setData(response.data.data.flights);
     handleFlights(data)
     console.log(data);
    } catch (error) {
        console.log(error);
    }finally{
      loading(false)
    }
  }
  function handleApply() {
      console.log(priceRange,stops);

    getData(stops,priceRange);
  }
    return (
      <Box className="flight-filter-root" sx={{ width:250 }}  >
        <div className="flight-filter-header">
          <Typography variant="h6">Filters</Typography>
          <Button className="flight-filter-resetButton" onClick={handleReset}>
            Reset All
          </Button>
        </div>
        {/* <Typography variant="body2" color="textSecondary" className="flight-filter-section">
          showing 41 flights
        </Typography> */}
        {/* <div className="flight-filter-section">
          <Typography variant="subtitle1">Departure</Typography>
          <ToggleButtonGroup
            value={departureTime}
            exclusive
            onChange={handleDepartureTime}
            className="flight-filter-toggleButtonGroup"
          >
            <ToggleButton value="Before 6AM" className="flight-filter-toggleButton">
              Before 6AM
            </ToggleButton>
            <ToggleButton value="6AM - 12PM" className="flight-filter-toggleButton">
              6AM - 12PM
            </ToggleButton>
            <ToggleButton value="12PM - 6PM" className="flight-filter-toggleButton">
              12PM - 6PM
            </ToggleButton>
            <ToggleButton value="After 6PM" className="flight-filter-toggleButton">
              After 6PM
            </ToggleButton>
          </ToggleButtonGroup>
        </div> */}
        <div className="flight-filter-section">
          <Typography variant="subtitle1">Stops</Typography>
          <ToggleButtonGroup
            value={stops}
            exclusive
            onChange={handleStops}
            className="flight-filter-toggleButtonGroup"
          >
            <ToggleButton value={0} className="flight-filter-toggleButton">
              Non-stop
            </ToggleButton>
            <ToggleButton value={1} className="flight-filter-toggleButton">
              1 Stop
            </ToggleButton>
            <ToggleButton value={2} className="flight-filter-toggleButton">
              2+ Stops
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="flight-filter-section">
          <Typography variant="subtitle1">Price</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={1000}
            max={11759}
            className="flight-filter-slider"
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">₹{priceRange[0]}</Typography>
            <Typography variant="body2">₹{priceRange[1]}</Typography>
          </Box>
          <Button className="flight-filter-applyButton" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </Box>
    );
  };
  
  export default FlightFilter;