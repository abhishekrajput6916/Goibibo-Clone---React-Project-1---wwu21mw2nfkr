import { useEffect, useRef, useState } from "react";
import React from "react";
import { createPortal } from "react-dom";
import "./hotels.css";

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
      // console.log("ref",ref.current);
      if (e.target.contains(ref.current)) {
        // console.log("setting showModal false");
        onClose();
      }
    };

    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      // console.log("modal close");
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);
  useEffect(() => {}, [details.rooms, details.children, details.adults]);
  function handleDoneBtnClick() {
    setGuests(details.adults, details.children);
    setRooms(details.rooms);
    onClose();
  }

  return createPortal(
    <div className="hotel-modal" ref={ref}>
      <div className="guest-modal-body">
        <div className="rooms">
          Rooms (max 8)
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

        <div className="adults">
          Adults
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
        <div className="children">
          Children
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
      <button onClick={handleDoneBtnClick}>Done</button>
    </div>,
    document.body
  );
}

export default HotelModal;

function Counter({ lowerBound, upperBound, doSet }) {
  const [num, setNum] = useState(lowerBound);
  useEffect(() => {
    doSet(num);
  }, [num]);
  return (
    <div className="counter">
       <div
        className="increment"
        onClick={() => {
          setNum((old) => {
            if (old > lowerBound) {
              return old - 1;
            } else {
              return old;
            }
          });
        }}
      >
        -
      </div>
      <div>{num}</div>
      <div
        className="decrement"
        onClick={() => {
          setNum((old) => {
            if (old < upperBound) {
              return old + 1;
            } else {
              return old;
            }
          });
        }}
      >
        + 
      </div>
    </div>
  );
}
