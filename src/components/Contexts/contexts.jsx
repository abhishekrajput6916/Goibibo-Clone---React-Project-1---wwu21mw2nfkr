import React, { createContext, useContext, useState } from "react";

// export const LoggedUserContext = createContext({});
export const LoginContext = createContext(false);
export const ModalContext = createContext(false);
export const FlightBookingContext = createContext(false);
// export const FlightListContext = createContext([]);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("user"));
  const [flightList, setFlightList] = useState([]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn,flightList,setFlightList }}>
      {children}
    </LoginContext.Provider>
  );
};

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState();
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const FlightBookingProvider = ({ children }) => {
  const [flightContext, setFlightContext] = useState({
    source: "",
    destination: "",
  });
  return (
    <FlightBookingContext.Provider value={{ flightContext, setFlightContext }}>
      {children}
    </FlightBookingContext.Provider>
  );
};

// export const FlightListProvider = ({ children }) => {
//   return (
//     <FlightListContext.Provider value={{ flightList, setFlightList }}>
//       {children}
//     </FlightListContext.Provider>
//   );
// };

export const useAuth = () => {
  return useContext(LoginContext);
};
export const useModal = () => {
  return useContext(ModalContext);
};
export const useFlightData = () => {
  return useContext(FlightBookingContext);
};
// export const useFlightList = () => {
//   return useContext(FlightListContext);
// };
