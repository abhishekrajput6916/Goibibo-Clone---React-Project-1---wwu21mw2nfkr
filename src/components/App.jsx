import "../styles/App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";
import { ModalContext } from "./Contexts/ModalContext";
import { LoggedUserContext } from "./Contexts/LoggedUserContext";
import Navbar from "./Navbar/Navbar";
import Flights from "./flights/Flights";
import Hotels from "./hotels/Hotels";
import Buses from "./buses/Buses";
import Trains from "./trains/Trains";
import Modal from "./modal/Modal";
import Holidays from "./holidays/Holidays";
import Cabs from "./cabs/Cabs";
import Page404 from "./Page404/Page404";
import Forex from "./forex/Forex";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUSer, setLoggedInUser] = useState(null);

  useEffect(() => {
    console.log(isLoggedIn, setIsLoggedIn);
  }, []);

  return (
    <div className="App container">
      <LoggedUserContext.Provider value={{ loggedInUSer, setLoggedInUser }}>
        <ModalContext.Provider value={{ showModal, setShowModal }}>
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <Navbar />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="background-svg"
            >
              <path
                fill="#2274E0"
                fill-opacity="1"
                d="M0,288L80,250.7C160,213,320,139,480,144C640,149,800,235,960,261.3C1120,288,1280,256,1360,240L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              ></path>
            </svg>
            <div className="main">
              <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/cabs" element={<Cabs />} />
                <Route path="/bus" element={<Buses />} />
                <Route path="/holidays" element={<Holidays />} />
                <Route path="/forex" element={<Forex />} />
              </Routes>
            </div>
            {showModal ? <Modal /> : null}
          </LoginContext.Provider>
        </ModalContext.Provider>
      </LoggedUserContext.Provider>
    </div>
  );
}

export default App;
