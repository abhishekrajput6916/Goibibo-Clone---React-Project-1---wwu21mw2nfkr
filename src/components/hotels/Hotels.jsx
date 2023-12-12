import axios from "axios";
import "./hotels.css";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HotelModal from "./HotelModal";

function Hotels() {
  const [isLoading, setIsLoading] = useState(true);
  const [hotelsArray, setHotelsArray] = useState([]);
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [noOfGuests, setNoOfGuests] = useState({
    adults: 0,
    children: 0,
  });
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [showGuestModal, setShowGuestModal] = useState(false);

  async function getHotelDetails(location) {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          projectID: "wwu21mw2nfkr",
        },
      };
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`,
        config
      );
      setHotelsArray(response.data.data.hotels);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getHotelDetails("delhi");
  }, []);
  useEffect(() => {
    if (!isLoading) {
      console.log(hotelsArray);
    }
  }, [isLoading]);

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
              <input type="radio" name="location" id="india" value={"india"} />
              <lable for="india">India</lable>
            </div>
            <div className="hotel-international">
              <input
                type="radio"
                name="location"
                id='international"'
                value={"international"}
              />
              <lable for="international">International</lable>
            </div>
          </div>
          <div className="city">
            <div className="lable">Where</div>
            <div className="city-input">
              <FaSearch className="search-icon" />
              <input type="text" value={""} placeholder="Enter your city" />
            </div>
          </div>
        </div>

        <div className="room-details">
          {/* <div className="stay-duration"> */}
          <div className="check-in">
            <div className="lable">Check-in</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              withPortal
              className="date"
            />
          </div>
          <div className="check-out">
            <div className="lable">Check-out</div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              withPortal
              className="date"
            />
          </div>
          {/* </div> */}
          {/* <div className="guests"> */}
          <div className="guest-rooms">
            <div className="lable">Guests & Rooms</div>
            <div
              className="guests"
              onClick={() => {
                setShowGuestModal((old) => !old);
              }}
            >
              {noOfGuests.adults} Adults | {noOfGuests.children} Child |{" "}
              {noOfRooms} {noOfRooms == 1 ? "Room" : "Rooms"}
            </div>
            {showGuestModal ? (
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
            ) : null}
          </div>
          <div className="travel-pref">
            <label>Traveller Preference</label>
            <div className="travel-pref-radio-btns">
              <input type="radio" name="preference" id="couple" />
              <input type="radio" name="preference" id="gostay" />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <button className="hotel-search-btn">Search Hotels</button>
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
