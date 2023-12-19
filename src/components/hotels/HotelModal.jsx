import { useEffect, useRef, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import "./hotels.css";
import Counter from "../otherUtilityComponents/Counter";

function HotelModal({ onClose, setGuests, setRooms }) {
  //to create a portal, use the createPortal function:
  const [details, setDetails] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (e.target.contains(ref.current)) {
        onClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);
  useEffect(() => {}, [details.rooms, details.children, details.adults]);
  function handleDoneBtnClick() {
    setGuests(details.adults, details.children);
    setRooms(details.rooms);
    onClose();
  }

  return (
    <div className="hotel-modal" ref={ref}>
      <div className="guest-modal-body">
        <div className="guest-parent" id="rooms">
          <div className="guest-child">Rooms (max 8)</div>
          <Counter
            lowerBound={1}
            upperBound={8}
            doSet={(num) => {
              setDetails((oldState) => {
                return {
                  ...oldState,
                  rooms: num,
                };
              });
            }}
          />
        </div>

        <div className="guest-parent" id="adults">
          <div className="guest-child">Adults</div>
          <Counter
            lowerBound={1}
            upperBound={16}
            doSet={(num) => {
              setDetails((oldState) => {
                return {
                  ...oldState,
                  adults: num,
                };
              });
            }}
          />
        </div>
        <div className="guest-parent" id="children">
          <div className="guest-child">Children</div>
          <Counter
            lowerBound={0}
            upperBound={4}
            doSet={(num) => {
              setDetails((oldState) => {
                return {
                  ...oldState,
                  children: num,
                };
              });
            }}
          />
        </div>
      </div>
      <button id="done-btn" onClick={handleDoneBtnClick}>Done</button>
    </div>
  );
}

export default HotelModal;


