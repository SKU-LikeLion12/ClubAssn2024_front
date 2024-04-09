import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClubMemberManagement from './ClubMemberManagement';
import ClubmemberPuzzle from './ClubMemberPuzzle';
import AddClubMember from './AddClubMember';
import Addpuzzle from './AddPuzzle';

const Clubmember = () => {
  return (
    <Routes>
      <Route path="/" element={<ClubMemberManagement />} />
      <Route path="/EditPuzzle" element={<ClubmemberPuzzle/>} />
      <Route path="/AddClubMember" element={<AddClubMember/>} />
      <Route path="/AddPuzzle" element={<Addpuzzle/>} />
    </Routes>
  );
};

export default Clubmember;