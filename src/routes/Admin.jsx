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
import AdminLoginn from '../pages/admin/AdminLoginn.jsx';

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path='/adminLoginn' element={<AdminLoginn />} />
        <Route path="/adminMain" element={<ProtectedRoute><AdminMain/></ProtectedRoute>}/>
        <Route path="/adminMain/ItemReservationStatus" element={<ProtectedRoute><ItemReservationStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/ItemRentalStatus" element={<ProtectedRoute><ItemRentalStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/RentalItemManagement" element={<ProtectedRoute><RentalItemManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/PuzzlePieceManagement" element={<ProtectedRoute><PuzzlePieceManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/ClubMemberManagement" element={<ProtectedRoute><ClubMemberManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/ClubManagement" element={<ProtectedRoute><ClubManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/TimetableManagement" element={<ProtectedRoute><TimetableManagement/></ProtectedRoute>}/>
      </Routes>
    </div>
);
};

export default Admin;