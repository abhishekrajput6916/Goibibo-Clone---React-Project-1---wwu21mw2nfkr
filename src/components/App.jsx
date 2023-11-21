import "../styles/App.css";
import Navbar from "./Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Flights from './flights/Flights'
import Hotels from './hotels/Hotels'
import Login from "./login/Login";
import Signup from "./signup/Signup";

function App() {
  return (
    <div className="App container">
      <Navbar />
      <Routes>
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/cabs" element={<h1>Cabs</h1>} />
        <Route path="/bus" element={<h1>bus</h1>} />
        <Route path="/trains" element={<h1>trains</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
