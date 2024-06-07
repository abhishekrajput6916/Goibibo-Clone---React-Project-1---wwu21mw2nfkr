import axios from "axios";
import "./hotels.css";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HotelModal from "./HotelModal";
import { Navigate, useNavigate } from "react-router-dom";
import Search from "../otherUtilityComponents/Search";

import getHeaderWithProjectId from "../otherUtilityComponents/service";
import BgSvg from "../otherUtilityComponents/BgSvg";

function Hotels() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [hotelsArray, setHotelsArray] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [city, setCity] = useState("");
  const [noOfGuests, setNoOfGuests] = useState({
    adults: 0,
    children: 0,
  });
  const [data,setData]=useState({
    city:'',
    checkInDate:'',
    checkOutDate:'',
    guests:{
      rooms:'',
      adults:'',
      children:'',
    }
  })
  const navigate = useNavigate();
  async function getAllLocations() {
    setIsLoading(true);
    try {
      const config =getHeaderWithProjectId(); 
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
    // getHotelDetails(city);
  }, []);

  useEffect(() => {
    if(data.city!==null && data.city!==''){
      navigate("/hotels/results",{
        state:{
          city:data.city,
          allLocations:allLocations,
      }});
    }
    // console.log(data);
  }, [data]);
  
  const handleSearchBtnClick = () => {
    // console.log("hii from handle search");
    setData((oldData)=>{
      return {
        ...oldData,
        city:city,
        checkInDate:startDate,
        checkOutDate:endDate,
        guests:{
          rooms:noOfRooms,
          adults:noOfGuests.adults,
          children:noOfGuests.children,
        }
      }
    })
  };

  return !isLoading ? (
    <div className="hotels">
      {/* {hotelsArray.map((hotel)=>{
        return <div key={hotel._id}>{hotel.name}</div>
      })} */}
      <BgSvg/>

      <h1 className="hotel-page-title">Book Hotels & Homestays</h1>
      <div className="hotels-form-container">
        <div className="hotel-location">
          <div className="city">
            <div className="lable">Where</div>
            <div className="city-input">
              <Search
                handleSearch={(value) => {
                  setCity(value);
                }}
                searchFor={"City"}
                // array={hotelsArray}
                array={allLocations}
                DefValue={data.city}
              />
            </div>
          </div>
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
      {/* <div className="ads">
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
      </div> */}
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

export default Hotels;
