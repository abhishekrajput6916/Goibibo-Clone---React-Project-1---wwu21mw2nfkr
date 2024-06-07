import "../styles/App.css";
import { createTheme, ThemeProvider} from "@mui/material/styles";
import { colors } from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Flights from "./flights/Flights";
import Hotels from "./hotels/Hotels";
import Buses from "./buses/Buses";
import Trains from "./trains/Trains";
import Holidays from "./holidays/Holidays";
import Cabs from "./cabs/Cabs";
import Page404 from "./Page404/Page404";
import Forex from "./forex/Forex";
import HotelSearchInterface from "./hotels/HotelSearchInterface";
import FooterComp from "./footer/Footer";
import { Divider } from "@mui/material";
import { ModalContextProvider,AuthProvider, useModal, useAuth } from "./Contexts/contexts";
import LoginModal from "./modal/Modal";
import SideBar from "./otherUtilityComponents/resultPage/SideBar";
import ItemCard from "./otherUtilityComponents/resultPage/ItemCard";
import { Flight } from "@mui/icons-material";
import MyFlights from "./flights/FlightsSearch";
import FlightsSearch from "./flights/FlightsSearch";
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const defaultTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2274E0',
    },
    secondary: {
      main: '#ff6d38',
      contrastText: '#000',
    },
  },
});
function App() {
  const { isLoggedIn,setIsLoggedIn } = useAuth();
  const [user,setUser]=useState(JSON.parse(sessionStorage.getItem("user")));
useEffect(()=>{
  if(user){
    console.log("appjs rendered with username ",user.user.name)
  }
},[])
  return (
    <ThemeProvider theme={defaultTheme}>
    <div className="App container">
        <ModalContextProvider>
          <AuthProvider>
            <Navbar currentUser={user} setCurrentUser={setUser}/>
            
            {/* <div className="wave">
            </div> */}
            <div className="main">
              <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/" element={<Flights/>} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/flights/:searchParam" element={<FlightsSearch />} />
                <Route path="/flights-search" element={<MyFlights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/results" element={<HotelSearchInterface />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/bus" element={<Buses />} />
                <Route path="/test" element={<ItemCard />} />
                {/* <Route path="/cabs" element={<Cabs />} /> */}
                {/* <Route path="/holidays" element={<Holidays />} /> */}
                {/* <Route path="/forex" element={<Forex />} /> */}
              </Routes>
            </div>
            <Divider/>
            <FooterComp/>
          </AuthProvider>
        </ModalContextProvider>
    </div>
    </ThemeProvider>

  );
}

export default App;
