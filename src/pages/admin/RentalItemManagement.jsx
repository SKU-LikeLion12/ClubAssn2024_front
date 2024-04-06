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

export const AddItem = ({state, set}) => {
  const [addItemData, setAddItemData] = useState({})

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setAddItemData({ ...addItemData, [name]: value });
  }
  
  const handleAddItem = async () => {
    try {
      const result = await API().post('/admin/item', addItemData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      style={RentalItemModal}
      ariaHideApp={false}
      onRequestClose={() => set(false)}
      isOpen={state}>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex justify-between items-center textFont px-3'>
            <div className='text-2xl'>물품 대여 추가</div>
            <button onClick={() => set(false)} className='text-xl'>X</button>
          </div>
          <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1'>
            <div className='flex flex-col grow gap-1'>
              <div className='flex justify-between items-end mt-1'>
                <label className='w-5/12' htmlFor="name">물품명</label>
                <input type="text" className='adminInput grow' id='name' name='name' value={addItemData.name} onChange={handleChangeValue}/>
              </div>
              <div className='flex justify-between items-end mt-1'>
                <label className='w-5/12' htmlFor="count">총 수량  </label>
                <input type="text" className='adminInput grow' id='count' name='count' value={addItemData.count} onChange={handleChangeValue}/>
              </div>
              <div className='flex justify-between items-end mt-1'>
                <label className='w-5/12' htmlFor="image">사진 </label>
                <input type="file" className='text-xs grow' id='image' name='image' value={addItemData.image} onChange={handleChangeValue}/>
              </div>
            </div>
            <div className='flex justify-center'>
              <button type='submit' onClick={handleAddItem}
              className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>추가하기</button>
            </div>
        </div>
      </div>
    </Modal>
  )
}