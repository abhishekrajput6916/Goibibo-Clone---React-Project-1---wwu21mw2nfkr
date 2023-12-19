import React from "react";
import "./footer.css";

import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faFacebook,faInstagram,faTwitter} from "@fortawesome/free-solid-svg-icons";

function FooterComp() {
  return (
    <div className="footer">
      <div className="w-full">
        <div className="footer-section-1">
          <div>
            <div className="footer-title">OUR PRODUCTS </div>
            <div className="footer-link-group">
              <div href="#">Domestic Hotels</div>
              <div href="#">International Hotels</div>
              <div href="#">Domestic Flights</div>
              <div href="#">International Flights</div>
              <div href="#">Multi-City Flights</div>
              <div href="#">Couple Friendly Hotels</div>
              <div href="#">Nearby Getaways</div>
              <div href="#">Bus Booking</div>
              <div href="#">Cab Booking</div>
              <div href="#">Airport Cabs Booking</div>
              <div href="#">Outstation Cabs Booking</div>
              <div href="#">Train Booking</div>
              <div href="#">Go Stay</div>
              <div href="#">Trip Money</div>
              <div href="#">Goibibo Advertising Solutions</div>
            </div>
          </div>

          <div>
            <div className="footer-title">About Us</div>
            <div className="footer-link-group">
              <div href="#">Investor Relations</div>
              <div href="#">Management</div>
              <div href="#">Terms of Services</div>
              <div href="#">User Agreement</div>
              <div href="#">Privacy</div>
              <div href="#">Careers</div>
              <div href="#">YouTube Channel</div>
              <div href="#">Technology@Goibibo</div>
              <div href="#">Customer Support</div>
              <div href="#">Facebook Page</div>
              <div href="#">Twitter Handle</div>
            </div>
          </div>
          <div>
            <div className="footer-title">TRAVEL ESSENTIALS</div>
            <div className="footer-link-group">
              <div href="#">PNR Status</div>
              <div href="#">Offers</div>
              <div href="#">Airline Routes</div>
              <div href="#">Train Running Status</div>
            </div>
          </div>
          <div>
            <div className="footer-title">MORE LINKS</div>
            <div className="footer-link-group">
              <div href="#">Cheap Flights</div>
              <div href="#">Hotels Near Me</div>
              <div href="#">My Bookings</div>
              <div href="#">Cancellation</div>
              <div href="#">My Account</div>
              <div href="#">Wallet</div>
              <div href="#">Advertise with Us</div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-section-2">
          <div href="#" by="Flowbite™" year={2022}>Copyright</div>
          <div className="social-media-links">
            
            <FaFacebook className="icon"/>
            <FaInstagram className="icon"/>
            <FaTwitter className="icon"/> 
            <FaGithub className="icon"/> 
            <FaDribbble className="icon"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FooterComp;
