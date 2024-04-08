import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/admin/AdminMain.jsx";
import ItemReservationStatus from "../pages/admin/ItemReservationStatus.jsx";
import ItemRentalStatus from "../pages/admin/ItemRentalStatus.jsx";
import RentalItemManagement from "../pages/admin/ManageRental/RentalItemManagement.jsx";
import PuzzlePieceManagement from "../pages/admin/puzzle/PuzzlePieceManagement.jsx";
import ClubMemberManagement from "../pages/admin/ClubMemberManage/ClubMemberManagement.jsx";
import ClubManagement from "../pages/admin/club/ClubManagement.jsx";
import TimetableManagement from "../pages/admin/TimetableManagement.jsx";
import AdminLogin from '../pages/admin/AdminLogin.jsx';
import ProtectedRoute from "../components/ProtectedRoute .jsx";
import AdminLoginn from '../pages/admin/AdminLoginn.jsx';
import { AuthProvider } from '../components/AuthContext.jsx';
import ScrollToTop from '../components/shared/ScrollToTop.jsx';

const Admin = () => {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path='/adminLoginn' element={<AdminLogin/>} />
        <Route path='/adminLogin' element={<AdminLoginn />} />
        <Route path="/adminMain" element={<ProtectedRoute><AdminMain/></ProtectedRoute>}/>
        <Route path="/adminMain/ItemReservationStatus" element={<ProtectedRoute><ItemReservationStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/ItemRentalStatus" element={<ProtectedRoute><ItemRentalStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/RentalItemManagement/*" element={<ProtectedRoute><RentalItemManagement/></ProtectedRoute>} />
        <Route path="/adminMain/PuzzlePieceManagement/*" element={<PuzzlePieceManagement/>}/>
        <Route path="/adminMain/ClubMemberManagement" element={<ProtectedRoute><ClubMemberManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/ClubManagement/*" element={<ProtectedRoute><ClubManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/TimetableManagement" element={<ProtectedRoute><TimetableManagement/></ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
    </>
);
};

export default Admin;