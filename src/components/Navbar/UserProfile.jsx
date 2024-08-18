import React, { useState,useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { LoginContext, useAuth } from "../Contexts/contexts";
// import { LoggedUserContext } from "../Contexts/contexts";


function UserProfile({onClick,currentUser,setCurrentUser}) {
  const { isLoggedIn } = useAuth();
  const [userName,setUserName]=useState('');
useEffect(()=>{
  
  const user= JSON.parse(sessionStorage.getItem("user"));
  if(user){
    console.log('curruser',user.user.name)
    console.log(user);
    const firstName=user.user.name.split(" ")[0];
    setUserName(firstName.charAt(0).toUpperCase()+firstName.substring(1).toLowerCase());
  }else{
    console.log("User not found");
  }
  // setUserName("");
},[isLoggedIn])
useEffect(()=>{
  console.log("userName changed",userName,currentUser);
},[])
  return (
    <div
      className="profile-btn"
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
