import React, { useEffect, useRef, useState } from "react";
import "./flights.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

function Flights() {
  const [isLoading, setIsLoading] = useState(false);
  const [flightsArray, setFlightsArray] = useState([]);
  const location=useLocation();
  const flightsRef=useRef();
  async function getFlightDetails(location) {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          projectID: "wwu21mw2nfkr",
        },
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"location":"${location}"}`,
        config
      );
      setFlightsArray(response.data.data.flights);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
      console.log(flightsArray);
    }
  }

  useEffect(() => {
    if(location.pathname=='/'){
      console.log(flightsRef.current.classList)
      flightsRef.current.classList.add("active");
    }
    getFlightDetails("delhi");
  }, []);
  useEffect(() => {
    if (!isLoading) {
      console.log(flightsArray);
    }
  }, [isLoading]);

  return !isLoading ? (
    <div className="flights" ref={flightsRef}>
      {/* {flightsArray.map((flight)=>{
        return <div key={flight._id}>{flight.name}</div>
      })} */}

      <div className="flight-page-title">Book Flights</div>
      <div className="flights-form-container">
        <div className="radio">
          <lable htmlFor="one-way">
            <input
              type="radio"
              name="trip-type"
              id='one-way"'
              value={"one-way"}
            />
            One-way
          </lable>
          <lable htmlFor="round-trip">
            <input
              type="radio"
              name="trip-type"
              id='round-trip"'
              value={"round-trip"}
            />
            Round-trip
          </lable>
          <lable htmlFor="multi-city">
            <input
              type="radio"
              name="trip-type"
              id="multi-city"
              value={"multi-city"}
            /> 
            Multi-city
          </lable>
        </div>
      </div>
      <button className="flight-search-btn" onClick={()=>{
        console.log(location);
      }}>Search flights</button>
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
