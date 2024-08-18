import React, { createContext, useContext, useState } from "react";

// export const LoggedUserContext = createContext({});
export const LoginContext = createContext(false);
export const ModalContext = createContext(false);
export const FlightBookingContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("user"));
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
    source:'',
    destination:'',
  });
  return (
    <FlightBookingContext.Provider value={{ flightContext, setFlightContext }}>
      {children}
    </FlightBookingContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(LoginContext);
};
export const useModal = () => {
  return useContext(ModalContext);
};
export const useFlightData = () => {
  return useContext(FlightBookingContext);
};
