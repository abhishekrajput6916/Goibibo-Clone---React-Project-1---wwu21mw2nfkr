import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Signup from "../signup/Signup";
import { ModalContext } from "../Contexts/contexts";
import { LoginContext,LoggedUserContext } from "../Contexts/contexts";
// import {  } from "../Contexts/LoginContext";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
import axios from "axios";

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const { setShowModal } = useContext(ModalContext);
  // const {loggedInUser,setLoggedInUser} = useContext(LoggedUserContext);
  const {setIsLoggedIn} = useContext(LoginContext);
  const [err, seterr] = useState("");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ 
    email: "",
    password: "",
  });
  const userLogIn = async (user) => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        { ...user, appType: "bookingportals" },
        config
      );
      const token=res.data.token;
      if(token){
        console.log(token);
        sessionStorage.setItem("userToken",token);
        sessionStorage.setItem("user",JSON.stringify(res.data.data));
        setIsLoggedIn(true);
        setShowModal(false);
      }
      console.log("Response", res);
    } catch (err) {
      const apiErr=err.response.data.message;
      console.log("Error", apiErr);
      seterr(apiErr);
      
    }
  };
  function handleFormSubmit(e) {
    e.preventDefault();
    userLogIn(userDetails);
    // const userList = JSON.parse(localStorage.getItem("userList"));
    // if (!userList) {
    //   return;
    // }
    // const user = userList.find((usr) => usr.email === userDetails.email);
    // console.log("user: ", user);
    // if (user) {
    //   if (user.password === userDetails.password) {
    //     console.log("Login Successful", user.fullName);
    //     setIsLoggedIn(true);
    //     setShowModal(false);
    //     setLoggedInUser(user);
    //     console.log("Logged User", loggedInUser);//
    //     sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    //     navigate("/flights");
    //   } else {
    //     console.log("password is incorrect");
    //     seterr("password is incorrect");
    //   }
    // } else {
    //   console.log("no user found");
    //   seterr("no user found");
    //   setIsNewUser(true);

      // signupRef.current.focus();
    // }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  return isNewUser ? (
    <Signup
      setIsOldUser={() => {
        setIsNewUser(false);
      }}
    />
  ) : (
    <div className="login-form">
      <h1 className="login-page-title">Log In</h1>
      <input
        type="email"
        name="email"
        id="email"
        value={userDetails.email}
        onChange={handleInputChange}
        placeholder="Enter Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={userDetails.password}
        onChange={handleInputChange}
        placeholder="Enter Password"
      />
      <button onClick={handleFormSubmit} id="login-btn">
        Login
      </button>
      {err && <div className="error">Error: {err}</div>}
      <div className="signup-path">
        <p id="new-user">New User..?</p>
        <button
          className="signup-btn"
          onClick={() => {
            console.log("signup");
            setIsNewUser(true);
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
