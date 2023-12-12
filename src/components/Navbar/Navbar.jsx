import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faHotel,
  faTrain,
  faTaxi,
  faBus,
  faUmbrellaBeach,
  faMoneyCheckDollar,
  faSuitcase,
  faUser,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import UserProfile from "./UserProfile";
import { ModalContext } from "../Contexts/ModalContext";
import { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";

export default function Navbar() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen((old) => !old);
  };
  useEffect(() => {
    const handleResize = () => {
      if (hamburgerOpen && window.innerWidth > 780) {
        setHamburgerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <nav className="navbar">
      <BrandLogo />
      <ul className={hamburgerOpen ? "nav-links-mobile" : "nav-links"}>
        <li className="list-item">
          <NavLink to="/flights" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faPlaneDeparture} />
            <div className="nav-labels">Flights</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/hotels" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faHotel} />
            <div className="nav-labels">Hotels</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/trains" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faTrain} />
            <div className="nav-labels">Trains</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/cabs" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faTaxi} />
            <div className="nav-labels">Cabs</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/bus" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faBus} />
            <div className="nav-labels">Bus</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/holidays" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faUmbrellaBeach} />
            <div className="nav-labels">Holidays</div>
          </NavLink>
        </li>
        <li className="list-item">
          <NavLink to="/forex" className="nav-link">
            <FontAwesomeIcon className="icon" icon={faMoneyCheckDollar} />
            <div className="nav-labels">Forex</div>
          </NavLink>
        </li>
      </ul>
      <div className="nav-2">
        <div className="nav-manage-trip nav-link" id="my-trips">
          <div className="suitcase-icon">
            <FontAwesomeIcon className="icon" icon={faSuitcase} />
          </div>
          <div className="my-trip">
            <span>MyTrips</span>
            <p>Manage Booking</p>
          </div>
        </div>
        <UserProfile
          onClick={() => {
            console.log("user Profile clicked");
            setShowModal((old) => !old);
          }}
        />
        <div
          className="hamburger"
          onClick={() => {
            toggleHamburger();
          }}
        >
          <FontAwesomeIcon icon={hamburgerOpen ? faXmark : faBars} />
        </div>
      </div>

      {showModal && <Modal />}
    </nav>
  );
}
