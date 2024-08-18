import React, { useEffect, useState } from "react";
import "./offers.css";
import OfferCard from "./OfferCard";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { RotatingLines, ThreeCircles } from "react-loader-spinner";
import { Card, Typography, colors } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useRef } from "react";

function Offers() {
  const filters = ["ALL", "HOTELS", "FLIGHTS", "RAILS"];
  const [filter, setFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const navRef=useRef();
  async function getAllOffers() {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          projectID: "wwu21mw2nfkr",
        },
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${filter}"}`,
        config
      );
      setOffers(response.data.data.offers);
      // console.log(response.data.data.offers);
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllOffers();
  }, []);
  useEffect(() => {
    getAllOffers();
  }, [filter]);
  function toggleTab(index) {
    setFilter(filters[index]);
  }
  function handleScroll(direction){
    if (direction === 'left') {
      navRef ? (navRef.current.scrollLeft -= 200) : null;
    } else {
      navRef ? (navRef.current.scrollLeft += 200) : null;
    }
  }
  return (
    <Card sx={{ mt: 2, mb: 5, padding: '10px 50px',width:"80vw" }}>
      <Typography variant="h5" fontWeight={900} component="div">
        Offers for you
      </Typography>
      <ul className="offer-filter-bar">
        <li
          className={filter === "ALL" ? "filter-name active" : "filter-name"}
          onClick={() => {
            toggleTab(0);
          }}
        >
          ALL
        </li>
        <li
          className={filter === "HOTELS" ? "filter-name active" : "filter-name"}
          onClick={() => {
            toggleTab(1);
          }}
        >
          HOTELS
        </li>
        <li
          className={
            filter === "FLIGHTS" ? "filter-name active" : "filter-name"
          }
          onClick={() => {
            toggleTab(2);
          }}
        >
          FLIGHTS
        </li>
        <li
          className={filter === "RAILS" ? "filter-name active" : "filter-name"}
          onClick={() => {
            toggleTab(3);
          }}
        >
          RAILS
        </li>
      </ul>
      {!isLoading ? <div className="offers-main">
        <ArrowCircleLeftOutlinedIcon on onClick={()=>{handleScroll('left')}} className="Left-arrow" />
        <div className="offers" ref={navRef}>
          {offers.map((offer) => {
            return <OfferCard key={offer._id} item={offer} />;
          })}
        </div>
        <ArrowCircleRightOutlinedIcon onClick={()=>{handleScroll('right')}} className="Right-arrow" />
      </div>: (
    <RotatingLines
  visible={true}
  height="60"
  width="60"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  
  />
    // <ThreeCircles color="#F16825" />
  )}
    </Card>
  )
}

export default Offers;

{
  /* <NavLink 
              
               key={filterName} 
               onClick={(e)=>{
                // setActiveTab(filterName)
                setFilter(filterName);
                console.log(e.target.classList);   
              }}>
                {filterName}
                </NavLink> */
}
