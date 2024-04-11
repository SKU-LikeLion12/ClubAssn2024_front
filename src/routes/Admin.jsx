import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/admin/AdminMain.jsx";
import ItemReservationStatus from "../pages/admin/ItemReservationStatus.jsx";
import ItemRentalStatus from "../pages/admin/ItemRentalStatus.jsx";
import RentalItemManagement from "../pages/admin/ManageRental/RentalItemManagement.jsx";
import PuzzlePieceManagement from "../pages/admin/puzzle/PuzzlePieceManagement.jsx";
import ClubMemberManagement from "../pages/admin/Clubmember/ClubMemberManagement.jsx";
import ClubManagement from "../pages/admin/club/ClubManagement.jsx";
import TimetableManagement from "../pages/admin/TimetableManagement.jsx";
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
        <Route path="/adminMain/TimetableManagement" element={<ProtectedRoute><TimetableManagement/></ProtectedRoute>}/>

        {/* <Route path="/adminMain" element={<AdminMain/>}/>
        <Route path="/adminMain/ItemReservationStatus" element={<ItemReservationStatus />}/>
        <Route path="/adminMain/ItemRentalStatus" element={<ItemRentalStatus />}/>
        <Route path="/adminMain/RentalItemManagement/*" element={<RentalItemManagement/>} />
        <Route path="/adminMain/PuzzlePieceManagement/*" element={<PuzzlePieceManagement/>}/>
        <Route path="/adminMain/ClubMemberManagement/*" element={<Clubmember />}/>
        <Route path="/adminMain/ClubManagement/*" element={<ClubManagement/>}/>
        <Route path="/adminMain/TimetableManagement" element={<TimetableManagement/>}/> */}
      </Routes>
    </AuthProvider>
)};

export default Admin;