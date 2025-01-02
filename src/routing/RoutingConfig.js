import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "../components/NavBar";


import SpecialityRouting from "../Modules/Speciality/SpecialityRouting";
import DoctorRouting from "../Modules/Doctor/DoctorRouting";
import UserRouting from "../Modules/Users/UserRouting";
import PatientRouting from "../Modules/Patient/PatientRouting";

import PrivateRouting from "./PrivateRouting";


import ChangePassword from "../components/ChangePassword";
import RoutingOrg from "../Modules/organization/RoutingOrg";
import DashboardRouting from "../Modules/Dashboard/DashboardRouting";
const RoomRouting =lazy(() => import("../Modules/room/RoomRouting"))
const FacilityRouting =lazy(() => import("../Modules/Facility/FacilityRouting"))


const Login = lazy(() => import("../components/Login"));

const RoutingConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>

      <Route
        path="/forgot_password/:userId"
        element={<ChangePassword />}
      ></Route>
      <Route path="/healthlife/*" element={<Navbar />}>
        <Route path="dashboard/*"element={<PrivateRouting> <DashboardRouting /></PrivateRouting>}></Route>
        <Route path="facility/*"element={<PrivateRouting> <FacilityRouting /></PrivateRouting>}></Route>
        <Route path="speciality/*"element={<PrivateRouting><SpecialityRouting /></PrivateRouting>}></Route>
        <Route path="doctor/*"element={<PrivateRouting><DoctorRouting /></PrivateRouting>}></Route>
        <Route path="users/*"element={<PrivateRouting><UserRouting /></PrivateRouting>}></Route>
        <Route path="patient/*"element={<PrivateRouting><PatientRouting /></PrivateRouting>}></Route>
        <Route path="organization/*"element={<PrivateRouting><RoutingOrg /></PrivateRouting>}></Route>
        <Route path="room/*"element={<PrivateRouting><RoomRouting /></PrivateRouting>}></Route>
       
       
       
       
        
        
      </Route>
    </Routes>
  );
};

export default RoutingConfig;
