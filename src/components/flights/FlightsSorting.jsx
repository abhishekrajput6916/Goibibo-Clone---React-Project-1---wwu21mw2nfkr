import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./flights.css";
import {
  ArrowDownward,
  ArrowUpward,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import API from "../../axios";

const FlightsSortBy = ({
  handleSort,
  handleLoading,
  source,
  destination,
  day,
  totalFlights,
}) => {
  const [activeSort, setActiveSort] = useState("ticketPrice");
  const [increasing, setIncreasing] = useState(true);
  const [data, setData] = useState([]);
  const sortOptions = [
    {
      label: "DEPARTURE",
      value: "departureTime",
      description: "earliest @ 05:30",
    },
    { label: "DURATION", value: "duration", description: "fastest @ 1hrs 25m" },
    {
      label: "ARRIVAL",
      value: "arrivalTime",
      description: "Sat, 22 Jun @ 07:15",
    },
    { label: "PRICE", value: "ticketPrice", description: "cheapest @ 3,546" },
    // { label: 'BEST', value: 'best', description: '1hrs 35m, 0 stops - 3,546' },
  ];
  useEffect(() => {
    // console.log(activeSort, increasing);
    getData(activeSort, increasing);
  }, [activeSort, increasing]);

  async function getData(activeSort, increasing) {
    // console.log(
    //   "activeSort,increasing -> ",
    //   activeSort,
    //   increasing ? "1" : "-1"
    // );
    try {
      handleLoading(true);
      const src = source.split("-")[1].trim();
      const dest = destination.split("-")[1].trim();
      const sortVal = increasing ? "1" : "-1";
      const response = await API.get(
        `flight?search={"source":"${src}","destination":"${dest}"}&day=${day}&sort={"${activeSort}":${sortVal}}`
      );

      setData(response.data.data.flights);
      await handleSort(data);
      // console.log(activeSort,sortVal);
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading(false);
    }
  }
  function toggleOrder() {
    setIncreasing((old) => !old);
  }

  const handleSortChange = (value) => {
    setActiveSort(value);
  };

  return (
    <Box className="flight-sort-root">
      <div className="flight-sort-header">
        <Typography variant="h6">Sort By</Typography>
        <Typography variant="body2" color="textSecondary">
          Showing {`${totalFlights}`} flights
        </Typography>
      </div>
      <div className="d-flex">
        <div className="flight-sort-sortOptions">
          {sortOptions.map((option) => (
            <div
              className={`sortType ${
                activeSort === option.value ? "active" : ""
              }`}
              key={option.value}
            >
              <div
                className={`sortOption`}
                onClick={() => {
                  handleSortChange(option.value);
                }}
              >
                <Typography variant="body2">{option.label}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {option.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        {!increasing ? (
          <TrendingUp
            className="sortArrows"
            sx={{ fontSize: "3rem", padding: ".5rem" }}
            onClick={() => {
              toggleOrder();
            }}
          />
        ) : (
          <TrendingDown
            className="sortArrows"
            sx={{ fontSize: "3rem", padding: ".5rem" }}
            onClick={() => {
              toggleOrder();
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default FlightsSortBy;
