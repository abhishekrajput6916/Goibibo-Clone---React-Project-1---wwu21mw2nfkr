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
import CostumAdvertisement from "../otherUtilityComponents/CostumAdvertisement";
import getHeaderWithProjectId from "../otherUtilityComponents/service";

function Hotels() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hotelsArray, setHotelsArray] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [city, setCity] = useState(null);
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
  async function getHotelDetails(location) {
    setIsLoading(true);
    try {
      const config =getHeaderWithProjectId(); 
      // {
      //   headers: {
      //     projectID: "wwu21mw2nfkr",
      //   },
      // };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel`,
        config
        // ?search={"location":"${location}"}
      );
      // setTotalData(response.data.data.hotels)
      setHotelsArray(response.data.data.hotels);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
      // console.log(response.data.data);
    }
  }

  useEffect(() => {
    getHotelDetails("delhi");
  }, []);

  useEffect(() => {
    if(data.city!==null && data.city!==''){
      navigate("/hotels/results",{
        state:{
          data:data,
          hotels:hotelsArray,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      console.log(hotelsArray);
      setAllLocations(hotelsArray.map((hotel) => hotel.location));
      console.log(allLocations);
    }
  }, [isLoading]);

  
  const handleSearchBtnClick = () => {
    console.log("hii from handle search");
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

      <div className="hotel-page-title">Book Hotels & Homestays</div>
      <div className="hotels-form-container">
        <div className="hotel-location">
          <div className="hotel-radio">
            <div className="hotel-india">
              <input
                type="radio"
                name="location"
                id="india"
                selected
                value={"india"}
              />
              <label htmlFor="india">India</label>
            </div>
            <div className="hotel-international">
              <input
                type="radio"
                name="location"
                id="international"
                value={"international"}
              />
              <label htmlFor="international">International</label>
            </div>
          </div>
          <div className="city">
            <div className="lable">Where</div>
            <div className="city-input">
              <Search
                handleSearch={(value) => {
                  setCity(value);
                }}
                searchFor={"City"}
                array={hotelsArray}
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
              {/* </div> */}
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
      <div className="ads">
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
        <CostumAdvertisement/>
      </div>
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
