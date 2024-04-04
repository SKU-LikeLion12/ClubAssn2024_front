import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/admin/AdminMain.jsx";
import ItemReservationStatus from "../pages/admin/ItemReservationStatus.jsx";
import ItemRentalStatus from "../pages/admin/ItemRentalStatus.jsx";
import RentalItemManagement from "../pages/admin/RentalItemManagement.jsx";
import PuzzlePieceManagement from "../pages/admin/PuzzlePieceManagement.jsx";
import ClubMemberManagement from "../pages/admin/ClubMemberManagement.jsx";
import ClubManagement from "../pages/admin/ClubManagement.jsx";
import TimetableManagement from "../pages/admin/TimetableManagement.jsx";
import AdminLogin from '../pages/admin/AdminLogin.jsx';
import ProtectedRoute from "../components/ProtectedRoute .jsx";

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path="/adminMain" element={<ProtectedRoute><AdminMain/></ProtectedRoute>}/>
        <Route path="/ItemReservationStatus" element={<ProtectedRoute><ItemReservationStatus /></ProtectedRoute>}/>
        <Route path="/ItemRentalStatus" element={<ProtectedRoute><ItemRentalStatus /></ProtectedRoute>}/>
        <Route path="/RentalItemManagement" element={<ProtectedRoute><RentalItemManagement/></ProtectedRoute>}/>
        <Route path="/PuzzlePieceManagement" element={<ProtectedRoute><PuzzlePieceManagement/></ProtectedRoute>}/>
        <Route path="/ClubMemberManagement" element={<ProtectedRoute><ClubMemberManagement/></ProtectedRoute>}/>
        <Route path="/ClubManagement" element={<ProtectedRoute><ClubManagement/></ProtectedRoute>}/>
        <Route path="/TimetableManagement" element={<ProtectedRoute><TimetableManagement/></ProtectedRoute>}/>
      </Routes>
    </div>
);
};

export default Admin;