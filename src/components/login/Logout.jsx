import Avatar from "@mui/material/Avatar";
import avatarImg from "../../images/dp.jpg";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useModal, useAuth } from "../Contexts/contexts";
import { Box, Typography, Grid, Button } from "@mui/material";
import { FacebookOutlined, LinkedIn, Twitter } from "@mui/icons-material";

const ProfileCard = () => {
  const { setShowModal } = useModal();
  const { setIsLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState({
    profileSrc: "",
    name: "",
    email: "",
    social: {
      linkedinID: "",
      facebookId: "",
      twitterId: "",
    },
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUserDetails((oldUser) => {
        const { name, email } = user.user;
        return {
          ...oldUser,
          profileSrc: "",
          name: name.toUpperCase(),
          email: email,
          social: {
            linkedinID: "",
            facebookId: "",
            twitterId: "",
          },
        };
      });
    }
  }, []);
  function handleLogout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    console.log("Log out", userDetails.name);
    setShowModal(false);
  }
  return (
    <Box
      sx={{
        marginTop: 3,
        py: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h6" color="rgba(0,0,0,0.8)">
        Profile
      </Typography>
      <Box>
        <Avatar src={avatarImg} sx={{ width: "5rem", height: "5rem" }} />
      </Box>

      <Typography component="h1" variant="h4">
        {userDetails.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h6">
          Email: {userDetails.email}
        </Typography>
        <Box>
          <FacebookOutlined />
          <Twitter />
          <LinkedIn />
        </Box>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            handleLogout();
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};
export default ProfileCard;
