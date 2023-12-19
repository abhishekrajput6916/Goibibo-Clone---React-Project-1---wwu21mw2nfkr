import React, { useState,useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../Contexts/contexts";
// import { LoggedUserContext } from "../Contexts/contexts";


function UserProfile({onClick}) {
  // const {loggedInUser}=useContext(LoggedUserContext);
  const {isLoggedIn}=useContext(LoginContext);
  const [userName,setUserName]=useState('');
  // const navigate = useNavigate();
// const user=JSON.parse(sessionStorage.getItem("loggedInUser"));
// console.log("Logged user");//
// console.log("isLoggedIn",isLoggedIn);
// const loggedUser=isLoggedIn?):null;
useEffect(()=>{
  if(sessionStorage.getItem("user")){
    const firstName=JSON.parse(sessionStorage.getItem("user")).name.split(" ")[0];
    setUserName(firstName.charAt(0).toUpperCase()+firstName.substring(1).toLowerCase());
  }
  // setUserName("");
},[isLoggedIn])
  return (
    <div
      className="profile-btn nav-link"
      id="userProfile"
      onClick={onClick}      
    >
      <FontAwesomeIcon className="icon" icon={faUser} />
      <div className="profile-info-btn">
        {isLoggedIn
          ? `Hey ${
              userName
            // loggedInUser
            }`
          : "Login / Signup"}
      </div>
    </div>
  );
}

export default UserProfile;
