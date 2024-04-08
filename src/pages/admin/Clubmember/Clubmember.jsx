import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClubMemberManagement from './ClubMemberManagement';
import ClubmemberPuzzle from './ClubMemberPuzzle';
import AddClubMember from './AddClubMember';

const Clubmember = () => {
  return (
    <Routes>
      <Route path="/" element={<ClubMemberManagement />} />
      <Route path="/EditPuzzle" element={<ClubmemberPuzzle/>} />
      <Route path="/AddClubMember" element={<AddClubMember/>} />
    </Routes>
  );
};

export default Clubmember;