import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function FlightsSearch() {
    const location=useLocation().state;
    const [source,setSource]=useState(location.source);
  const [destination,setDestination]=useState(location.destination);
  const [departureDate,setDepartureDate]=useState(location.departureDate);
  const [passengerDetails,setPassengerDetails]=useState({
    adults:location.adults,
    children:location.children,
    infant:location.infant,
  });//test
    const [isLoading,setIsLoading]=useState();
    async function getFlightDetails() {
        setIsLoading(true);  
        try {
          const config = {
            headers: {
              projectID: "wwu21mw2nfkr",
            },
          };
          const response = await axios.get(
            `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}`,
            config
          );
          console.log(response);
        } catch (err) {
          console.log("err", err);
        } finally {
          setIsLoading(false);
          // console.log(flightsArray);
        }
      }
      useEffect(()=>{
        getFlightDetails();
        console.log(source,destination,departureDate,passengerDetails.adults);
      },[])
  return (
    <div>
        Flights Search
    </div>
  )
}

export default FlightsSearch