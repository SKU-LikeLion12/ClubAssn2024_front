import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClubMemberManagement from './ClubMemberManagement';
import ClubmemberPuzzle from './ClubMemberPuzzle';
import AddClubMember from './AddClubMember';
import AddMember from './AddMember';
import AddmemberPuzzle from './AddmemberPuzzle';

const Clubmember = () => {
  return (
    <Routes>
      <Route path="/" element={<ClubMemberManagement />} />
      <Route path="/EditPuzzle" element={<ClubmemberPuzzle/>} />
      <Route path="/AddClubMember" element={<AddClubMember/>} />
      <Route path="/EditPuzzle/AddmemberPuzzle" element={<AddmemberPuzzle />} />
      <Route path="/AddClubMember/AddMember" element={<AddMember />} />
    </Routes>
  );
};

export default Clubmember;