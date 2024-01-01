import "./App.css";
import React  from 'react';
/* import components */
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Guests/Home";
// site admin
import AllUsers from "./Components/SiteAdministrator/AllUsers";
import NewUsers from "./Components/SiteAdministrator/NewUsers";
// manager
import MatchesDetails from "./Components/Managers/MatchesDetails";
import EditMatches from "./Components/Managers/EditMatches";
import AddStadium from "./Components/Managers/AddStadium";
import AddMatch from "./Components/Managers/AddMatch";
import VacantAndReservedSeats from "./Components/Managers/VacantAndReservedSeats";
// customer
import EditData from "./Components/Customers/EditData";
import MatchesDetails_custopme from "./Components/Customers/MatchesDetails";
import VacantSeats from "./Components/Customers/vacantSeats";
import ReserveSeat from "./Components/Customers/ReserveSeat";
import CancelReservation from "./Components/Customers/CancelReservation";

// import react router
import { Route, Routes } from "react-router-dom";

function App() {
  let token = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* site admin */}
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/newusers" element={<NewUsers />} />
        {/* manager */}
        <Route path="/manager" element={<MatchesDetails />} />
        <Route path="/MatchesDetails" element={<MatchesDetails />} />
        <Route path="/EditMatches" element={<EditMatches />} />
        <Route path="/AddStadium" element={<AddStadium />} />
        <Route path="/AddMatch" element={<AddMatch />} />
        <Route
          path="/VacantAndReservedSeats"
          element={<VacantAndReservedSeats />}
        />
        {/* customer */}
        <Route path="/customer/EditData" element={<EditData />} />
        <Route
          path="/customer/match details"
          element={<MatchesDetails_custopme />}
        />
        <Route path="/customer/vacant seats" element={<VacantSeats />} />
        <Route path="/customer/vacant seats" element={<VacantSeats />} />
        <Route path="/customer/Reserve Seat" element={<ReserveSeat />} />
        <Route
          path="/customer/Cancel Reservation"
          element={<CancelReservation />}
        />
      </Routes>
    </div>
  );
}

export default App;
