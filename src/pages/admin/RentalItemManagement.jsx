import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { RentalItemModal } from '../../css/customModal'; 
import { API } from '../../api/API';
import AddRental from './AddRental';
import EditRental from './EditRental';
import ManageRental from './ManageRental';

const RentalItemManagement = () => {
  const navigate = useNavigate();
  const [addItemModal, setAddItemModal] = useState();
  const [editItemModal, setEditItemModal] = useState();

  return (
    <Routes>
      <Route path="/" element={<ManageRental/>}/>
      <Route path="/addRental" element={<AddRental/>}/>
      <Route path="/editRental" element={<EditRental/>}/>
    </Routes>
  );
};

export default RentalItemManagement;