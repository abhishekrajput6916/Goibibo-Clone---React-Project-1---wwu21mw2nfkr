import axios from "axios";
import "./hotels.css";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HotelModal from "./HotelModal";
import { Navigate, useNavigate } from "react-router-dom";
import Search from "../otherUtilityComponents/Search";
import Offers from "../Offers/Offers";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
import BgSvg from "../otherUtilityComponents/BgSvg";
import { Autocomplete, TextField } from "@mui/material";

function Hotels() {
  // const [hotelsArray, setHotelsArray] = useState([]);

  const [error, setError] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allLocations, setAllLocations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [city, setCity] = useState("");
  const [noOfGuests, setNoOfGuests] = useState({
    adults: 0,
    children: 0,
  });
  const cityRef = useRef();
  // const [data,setData]=useState({
  //   city:'',
  //   checkInDate:'',
  //   checkOutDate:'',
  //   guests:{
  //     rooms:'',
  //     adults:'',
  //     children:'',
  //   }
  // })
  const navigate = useNavigate();
  async function getAllLocations() {
    setIsLoading(true);
    try {
      const config = getHeaderWithProjectId();
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/city`,
        config
        // ?search={"location":"${location}"}
      );
      // console.log("AllLocations",response.data.data.cities);
      setAllLocations(response.data.data.cities);
      console.log(response.data.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllLocations();
    console.log(allLocations);
    // getHotelDetails(city);
  }, []);

  // useEffect(() => {
  //   if(data.city!==null && data.city!==''){
  //     navigate("/hotels/results",{
  //       state:{
  //         city:data.city,
  //         allLocations:allLocations,
  //     }});
  //   }else{
  //     setError('Enter City!');
  //     console.log(cityRef.current);
  //   }
  // }, [data]);
  const validateForm = () => {
    if (city === null || city === "") {
      setError("Enter City!");
      console.log(cityRef.current);
    } else {
      return true;
    }

    return false;
  };
  const handleSearchBtnClick = () => {
    // console.log("hii from handle search");
    // setData((oldData)=>{
    //   return {
    //     ...oldData,
    //     city:city,
    //     checkInDate:startDate,
    //     checkOutDate:endDate,
    //     guests:{
    //       rooms:noOfRooms,
    //       adults:noOfGuests.adults,
    //       children:noOfGuests.children,
    //     }
    // }
    // })

    if (validateForm()) {
      navigate(
        `/hotels/${city}-${startDate}-${endDate}-${noOfGuests}-${noOfRooms}`,
        {
          state: {
            city: city,
            allLocations: allLocations,
            startDate: startDate,
            endDate: endDate,
            noOfGuests: noOfGuests,
            noOfRooms: noOfRooms,
          },
        }
      );
    }
  };

  return !isLoading ? (
    <div className="hotels">
      <BgSvg />

      <h1 className="hotel-page-title">Book Hotels & Homestays</h1>
      <div className="hotels-form-container">
        <div className="hotel-location">
          {/* <div className="city"> */}
          {/* <div className="lable">Where</div> */}
          {/* <div className="city-input"> */}
          {/* <Search
               ref={cityRef}
                handleSearch={(value) => {
                  setCity(value);
                }}
                searchFor={"City"}
                // array={hotelsArray}
                array={allLocations}
                DefValue={city}
              /> */}
          <Autocomplete
            disablePortal
            options={allLocations.map((ap) => {
              return ap.cityState;
            })}
            value={city}
            onChange={(e, val) => {
              setCity(val);
            }}
            sx={{ minWidth: 300, }}
            renderInput={(params) => (
              <TextField
                inputRef={cityRef}
                className="city-input"
                {...params}
                placeholder="Enter City"
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "#696969",
                    fontSize: "24px",
                    marginBottom:'1rem',
                    fontWeight: 500,
                  },
                }}
                variant="standard"
                label="Where"
              />
            )}
          />
          {/* </div> */}
          {/* </div> */}
        </div>

        <div className="room-details">
          <div className="room-detail-parent">
            <div className="lable">Check-in</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              withPortal
              className="date input-div txt-large"
            />
          </div>
          <div className="room-detail-parent">
            <div className="lable">Check-out</div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              withPortal
              className="date input-div txt-large"
            />
          </div>
          <div id="guest-rooms" className="room-detail-parent">
            <div className="lable">Guests & Rooms</div>
            <div
              className="guests input-div txt-large"
              onClick={() => {
                setShowGuestModal((old) => !old);
              }}
            >
              {noOfGuests.adults} Adults | {noOfGuests.children} Child |{" "}
              {noOfRooms} {noOfRooms == 1 ? "Room" : "Rooms"}
            </div>
            {/* <div className="hotel-modal-container"> */}

            {showGuestModal && (
              <HotelModal
                onClose={() => setShowGuestModal(false)}
                setGuests={(adults, children) => {
                  setNoOfGuests((old) => {
                    return {
                      ...old,
                      adults: adults,
                      children: children,
                    };
                  });
                }}
                setRooms={(rooms) => setNoOfRooms(rooms)}
              />
            )}
          </div>
          <div className="room-detail-parent" id="travel-pref">
            <div className="lable">Traveller Preference</div>
            <div id="travel-pref-radio-btns" className="input-div">
              <input type="radio" name="preference" id="couple" />
              <label htmlFor="couple" className="coupleOrGostay">
                Couple
              </label>
              <input type="radio" name="preference" id="gostay" />
              <label htmlFor="gostay" className="coupleOrGostay">
                GoStay
              </label>
            </div>
          </div>
        </div>
      </div>

      <button className="hotel-search-btn" onClick={handleSearchBtnClick}>
        Search Hotels
      </button>
      {error && <p className="error">{error}</p>}
      <Offers />
    </div>
  ) : (
    <div className="loader hotels-loader">
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
      />
    </div>
  );
}

export default Hotels;
