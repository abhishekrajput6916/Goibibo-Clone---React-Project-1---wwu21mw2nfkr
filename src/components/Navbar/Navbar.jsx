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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import UserProfile from "./UserProfile";
import {useModal } from "../Contexts/contexts";
import { useEffect, useState } from "react";
import LoginModal from "../modal/Modal";
import { AppBar } from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";

export default function Navbar({currentUser,setCurrentUser}) {
  const location=useLocation();
  const { showModal, setShowModal } = useModal(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();

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
    <AppBar>
      <nav className="navbar">
        <BrandLogo />
        <ul className={hamburgerOpen ? "nav-links-mobile" : "nav-links"}>
          <li className="list-item">
            <NavLink to="/flights" className={`nav-link ${location.pathname==='/'?'active':''}`}>
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
            <NavLink to="/bus" className="nav-link">
              <FontAwesomeIcon className="icon" icon={faBus} />
              <div className="nav-labels">Bus</div>
            </NavLink>
          </li>
          {/* <li className="list-item">
            <NavLink to="/cabs" className="nav-link">
              <FontAwesomeIcon className="icon" icon={faTaxi} />
              <div className="nav-labels">Cabs</div>
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to="/holidays" className="nav-link">
              <FontAwesomeIcon className="icon" icon={faUmbrellaBeach} />
              <div className="nav-labels">Holidays</div>
            </NavLink>
          </li> */}
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
              // isLoggedIn&&navigate('/signup')
              setShowModal((old) => !old);
              // console.log("user Profile clicked",showModal);
            }}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <div
            className="hamburger"
            onClick={() => {
              toggleHamburger();
            }}
          >
            {hamburgerOpen?<MenuOpen/>:<Menu/>}
          </div>
        </div>

        {showModal && <LoginModal />}
      </nav>
    </AppBar>
  );
}
