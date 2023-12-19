import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Modal from "../modal/Modal";
import axios from "axios";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
function Signup({ setIsOldUser }) {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };
  const [err, seterr] = useState("");
  const [cPass, setCPass] = useState("");
  const [userDetails, setUserDetails] = useState(initialData);
  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  const createUser = async (user) => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        { ...user, appType: "bookingportals" },
        config
      );
      const token=res.data.token;
      if(token){
        sessionStorage.setItem("userToken",token);
        alert("Successfully Signed up, Please Login!")
        setIsOldUser(true);
      }
      console.log("Response", res);
    } catch (err) {
      const apiErr=err.response.data.message;
      console.log("Error", err.response.data.message);
      
    }
  };
  function validateForm() {
    if (userDetails.name == "") {
      seterr("Enter full name");
    } else if (userDetails.email == "") {
      seterr("Enter email");
    } else if (userDetails.password == "") {
      seterr("Enter password");
    } else if (userDetails.password !== cPass) {
      seterr("Password mismatch!!");
    } else {
      return true;
    }
    return false;
  }
  function handleSubmit(e) {
    // const id = Math.floor(Math.random() * 10000);
    // const data = { ...userDetails, userId: id };
    e.preventDefault();
    // console.log(data);
    createUser(userDetails);
  
    // const userList = JSON.parse(localStorage.getItem("userList"));
    // if (userList) {
    //   if (userList.find((user) => user.email === data.email)) {
    //     console.log("user already exists.");
    //     setIsOldUser();
    //     return;
    //   } else {
    //     if (validateForm()) {
    //       userList.push(data);
    //       localStorage.setItem("userList", JSON.stringify(userList));
    //     }
    //   }
    // } else {
    //   if (validateForm()) {
    //     const newUserList = [data];
    //     localStorage.setItem("userList", JSON.stringify(newUserList));
    //   }
    // }
    // localStorage.setItem("userList",)
    // console.log("userList", userList);
    // navigate("/login");
  }
  return (
    <div className="signup-form">
      <h1 className="signup-page-title">Sign Up</h1>
      <input
        onChange={handleInputChange}
        type="text"
        name="name"
        value={userDetails.name.toUpperCase()}
        id="name"
        placeholder="Enter your Full Name"
      />
      <input
        onChange={handleInputChange}
        type="email"
        name="email"
        id="email"
        value={userDetails.email}
        placeholder="Enter Email"
      />
      <input
        onChange={handleInputChange}
        type="password"
        name="password"
        id="password"
        value={userDetails.password}
        placeholder="Create Password"
      />
      <input
        onChange={(e) => {
          setCPass(e.target.value);
        }}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={cPass}
      />
      <button id="signup-btn" onClick={handleSubmit}>
        Signup
      </button>
      {err && <div className="error">Error: {err}</div>}
      <div className="login-path">
        <p>Already a user..?</p>
        <button
          onClick={() => {
            console.log("open login");
            setIsOldUser();
          }}
        >
          Login Here
        </button>
      </div>
    </div>
  );
}

export default Signup;
