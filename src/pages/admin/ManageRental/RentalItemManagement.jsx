import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, ScrollRestoration, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import AddRental from './AddRental';
import EditRental from './EditRental';
import ManageRental from './ManageRental';
import { API } from '../../../api/API';
import AdminNav from '../../../components/AdminNav';
import { customModalStyles } from '../../../css/customModal';
import ScrollToTop from '../../../components/shared/ScrollToTop';

const RentalItemManagement = () => {
  const navigate = useNavigate();
  const [addItemModal, setAddItemModal] = useState();
  const [editItemModal, setEditItemModal] = useState();

  return (
    <>
    <Routes>
      <Route path="/" element={<ManageRental/>}/>
      <Route path="/addRental" element={<AddRental/>}/>
      <Route path="/editRental" element={<EditRental/>}/>
    </Routes>
    </>
  );
};

export default RentalItemManagement;