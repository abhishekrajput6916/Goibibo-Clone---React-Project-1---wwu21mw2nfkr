import React, { useState,useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../Contexts/LoginContext";
import { LoggedUserContext } from "../Contexts/LoggedUserContext";


function UserProfile({onClick}) {
  const {setLoggedInUser}=useContext(LoggedUserContext);
  const {isLoggedIn}=useContext(LoginContext);
  // const navigate = useNavigate();
// const user=JSON.parse(sessionStorage.getItem("loggedInUser"));
console.log("Logged user");//
console.log("isLoggedIn",isLoggedIn);
const loggedUser=isLoggedIn?JSON.parse(sessionStorage.getItem("loggedInUser")):null;
  return (
    <div
      className="profile-btn nav-link"
      onClick={onClick}      
    >
      <FontAwesomeIcon className="icon" icon={faUser} />
      <div className="profile-info-btn">
        {isLoggedIn
          ? `Hey ${
              loggedUser.fullName.charAt(0).toUpperCase() +
             loggedUser.fullName.substring(1).toLowerCase()
            // loggedInUser
            }`
          : "Login / Signup"}
      </div>
    </div>
  );
}

export default UserProfile;
