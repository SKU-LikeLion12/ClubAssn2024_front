import React, { useEffect } from 'react';
import AddClub from './AddClub';
import Club from './Club';
import { Route, Routes } from 'react-router-dom';
import EditClub from './EditClub';

const ClubManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Club />}/>
      <Route path="/addClub" element={<AddClub />}/>
      <Route path="/editClub" element={<EditClub />}/>
    </Routes>
  );
};

export default ClubManagement;