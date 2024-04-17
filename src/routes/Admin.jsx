import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/admin/AdminMain.jsx";
import ItemReservationStatus from "../pages/admin/ItemReservationStatus.jsx";
import ItemRentalStatus from "../pages/admin/ItemRentalStatus.jsx";
import RentalItemManagement from "../pages/admin/ManageRental/RentalItemManagement.jsx";
import PuzzlePieceManagement from "../pages/admin/puzzle/PuzzlePieceManagement.jsx";
import ClubMemberManagement from "../pages/admin/Clubmember/ClubMemberManagement.jsx";
import ClubManagement from "../pages/admin/club/ClubManagement.jsx";
import AdminLogin from '../pages/admin/AdminLogin.jsx';
import ProtectedRoute from "../components/ProtectedRoute .jsx";
import { AuthProvider } from '../components/AuthContext.jsx';
import Clubmember from '../pages/admin/Clubmember/Clubmember.jsx';

const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path="/adminMain" element={<ProtectedRoute><AdminMain/></ProtectedRoute>}/>
        <Route path="/adminMain/ItemReservationStatus" element={<ProtectedRoute><ItemReservationStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/ItemRentalStatus" element={<ProtectedRoute><ItemRentalStatus /></ProtectedRoute>}/>
        <Route path="/adminMain/RentalItemManagement/*" element={<ProtectedRoute><RentalItemManagement/></ProtectedRoute>} />
        <Route path="/adminMain/PuzzlePieceManagement/*" element={<ProtectedRoute><PuzzlePieceManagement/></ProtectedRoute>}/>
        <Route path="/adminMain/ClubMemberManagement/*" element={<ProtectedRoute><Clubmember /></ProtectedRoute>}/>
        <Route path="/adminMain/ClubManagement/*" element={<ProtectedRoute><ClubManagement/></ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
)};

export default Admin;