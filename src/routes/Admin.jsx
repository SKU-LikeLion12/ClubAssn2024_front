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

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path="/adminMain" element={<AdminMain/>}/>
        <Route path="/ItemReservationStatus" element={<ItemReservationStatus />}/>
        <Route path="/ItemRentalStatus" element={<ItemRentalStatus />}/>
        <Route path="/RentalItemManagement" element={<RentalItemManagement/>}/>
        <Route path="/PuzzlePieceManagement" element={<PuzzlePieceManagement/>}/>
        <Route path="/ClubMemberManagement" element={<ClubMemberManagement/>}/>
        <Route path="/ClubManagement" element={<ClubManagement/>}/>
        <Route path="/TimetableManagement" element={<TimetableManagement/>}/>
      </Routes>
    </div>
);
};

export default Admin;