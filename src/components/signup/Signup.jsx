import React, { useRef, useState } from "react";
import "./signup.css";
import axios from "axios";
import getHeaderWithProjectId from "../otherUtilityComponents/service";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp({ setIsOldUser }) {
  const errors = {
    nameErr: "Enter name",
    emailErr: "Enter email",
    passwordErr: "Enter password",
  };
  const [err, seterr] = useState("");
  // const [cPass, setCPass] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const createUser = async (user) => {
    const config = getHeaderWithProjectId();
    try {
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        { ...user, appType: "bookingportals" },
        config
        );
      const token = res.data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        alert("Successfully Signed up, Please Login!");
        setIsOldUser(true);
      }
      console.log("Response", res);
    } catch (err) {
      const apiErr = err.response.data.message;
      console.log("Error", err.response.data.message);
      if (apiErr) {
        seterr(apiErr);
      }
    }
  };
  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  
  function isFormValid() {
    const { name, email, password } = userDetails;
    if (name != "") {
      if (email != "") {
        if (password != "") {
          return true;
        } else {
          passwordRef.current.focus();
          seterr(errors.passwordErr);
        }
      } else {
        emailRef.current.focus();
        seterr(errors.emailErr);
      }
    } else {
      nameRef.current.focus();
      seterr(errors.nameErr);
    }
    return false;
  }
  function handleSubmit(e) {
    e.preventDefault();
    isFormValid() && createUser(userDetails);
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Enter Your Name"
              type="name"
              id="name"
              autoComplete="current-name"
              autoFocus
              onChange={handleInputChange}
              value={userDetails.name.toUpperCase()}
              inputRef={nameRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={userDetails.email}
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={userDetails.password}
              inputRef={passwordRef}
            />

            {err && <Alert severity="error">{err}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Box href="#" variant="body2">
                  {"Already a user? Log In"}
                  <Button
                    sx={{ display: "block", marginTop: ".5rem" }}
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      console.log("open login");
                      setIsOldUser(false);
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
