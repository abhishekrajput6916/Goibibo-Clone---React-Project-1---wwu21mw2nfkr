import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  useRef, useState } from "react";
import {useAuth, useModal } from "../Contexts/contexts";
import { useNavigate } from "react-router-dom";
import Signup from "../signup/Signup";
import getHeaderWithProjectId from "../otherUtilityComponents/service";
import axios from "axios";
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
const defaultTheme = createTheme();

export default function SignIn() {
  const errors = {
    emailErr: "Enter email",
    passwordErr: "Enter password",
  };
  const [isNewUser, setIsNewUser] = useState(false);
  const {showModal, setShowModal } = useModal();
  const { setIsLoggedIn } = useAuth();
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
      const token = res.data.token;
      if (token) {
        console.log(token);
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        
        setIsLoggedIn(true);
        setShowModal(false);
      }
      console.log("Response", res);
    } catch (err) {
      console.log("Err", err);
      const apiErr = err.response.data.message;
      // console.log("Error", apiErr);
      apiErr && seterr(apiErr);
    }
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  function isFormValid() {
    const { email, password } = userDetails;
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
    return false;
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    isFormValid() && userLogIn(userDetails);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {isNewUser ? (
        <Signup
          setIsOldUser={() => {
            setIsNewUser(false);
          }}
        />
      ) : (
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
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              {/* <Box variant="error"> */}
              {err && <Alert severity="error">{err}</Alert>}
              {/* </Box> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Box href="#" variant="body2">
                    {"New User..?"}
                    <Button
                      sx={{ display: "block", marginTop: ".5rem" }}
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        console.log("signup");
                        setIsNewUser(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      )}
    </ThemeProvider>
  );
}
