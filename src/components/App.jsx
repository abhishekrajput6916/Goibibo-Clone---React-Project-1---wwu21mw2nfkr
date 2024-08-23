import "../styles/App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Flights from "./flights/Flights";
import Hotels from "./hotels/Hotels";
import Buses from "./buses/Buses";
import Trains from "./trains/Trains";
import Page404 from "./Page404/Page404";
import HotelSearchInterface from "./hotels/HotelSearchInterface";
import FooterComp from "./footer/Footer";
import { Divider } from "@mui/material";
import {
  ModalContextProvider,
  AuthProvider,
  useModal,
  useAuth,
  FlightBookingProvider,
  FlightListProvider,
} from "./Contexts/contexts";
import ItemCard from "./otherUtilityComponents/resultPage/ItemCard";
import MyFlights from "./flights/FlightsSearch";
import FlightsSearch from "./flights/FlightsSearch";
import FlightCard from "./flights/FlightCard";
import AuthNavigator from "./navigator/AuthNavigator";
import FlightCheckOut from "./flights/FlightCheckOut";

const defaultTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2274E0",
    },
    secondary: {
      main: "#ff6d38",
      contrastText: "#000",
    },
  },
});
function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  useEffect(() => {
    if (user) {
      console.log("appjs rendered with username ", user.user.name);
      // console.log(prams)

    }
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App container">
        <ModalContextProvider>
              <FlightBookingProvider>
          <AuthProvider>
            <Navbar currentUser={user} setCurrentUser={setUser} />
            <div className="main">
                <Routes>
                  <Route path="*" element={<Page404 />} />
                  <Route path="/" element={<Flights />} />
                  <Route path="/flights" element={<Flights />} />
                  <Route
                    path="/flights/:flightSource/:flightDestination/:flightDay/:flightPassengers"
                    element={
                      
                        <FlightsSearch />
                    }
                  />
                  <Route
                    path="/flight/:flightSource/:flightDestination/:flightDay/:flightPassengers/checkOut"
                    element={
                      <AuthNavigator>
                        <FlightCheckOut />
                      </AuthNavigator>
                    }
                  />
                  <Route path="/flights-search" element={<MyFlights />} />

                  <Route path="/hotels" element={<Hotels />} />
                  <Route
                    path="/hotels/:searchParams"
                    element={<HotelSearchInterface />}
                  />
                  <Route path="/trains" element={<Trains />} />
                  <Route path="/bus" element={<Buses />} />
                  <Route path="/test" element={<ItemCard />} />
                  {/* <Route path="/cabs" element={<Cabs />} /> */}
                  {/* <Route path="/holidays" element={<Holidays />} /> */}
                  {/* <Route path="/forex" element={<Forex />} /> */}
                </Routes>
            </div>
            <Divider />
            {/* <FooterComp/> */}
          </AuthProvider>
              </FlightBookingProvider>
        </ModalContextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
