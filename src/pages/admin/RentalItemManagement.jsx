import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { RentalItemModal } from '../../css/customModal'; 
import { API } from '../../api/API';

const RentalItemManagement = () => {
  const [addItemModal, setAddItemModal] = useState();
  const [editItemModal, setEditItemModal] = useState();

  return (
    <>
    <div className='min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
        <div className='text-3xl'>물품 대여 관리</div>
        <button className='bg-[#d9d9d9] py-1 px-4 rounded-xl' onClick={()=>{setAddItemModal(!addItemModal)}}>추가</button>
      </div>

      <div className='flex w-10/12 mx-auto border-y py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex flex-col grow gap-1'>
          <div>
            <label htmlFor="물품명">물품명 :  </label>
            <input type="text" className='adminInput'/>
          </div>
          <div>
            <label htmlFor="총 수량">총 수량 : </label>
            <input type="text" className='adminInput'/>
          </div>
        </div>
        <div className='text-[#898989]'>수정</div>
      </div>
    </div>

    {addItemModal && <AddItem state={addItemModal} set={setAddItemModal}/>}
    </>
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
            <form onSubmit={handleAddItem}>
              <div className='flex flex-col grow gap-1'>
                <div className='flex justify-between items-end mt-1'>
                  <label className='w-5/12' htmlFor="물품명">물품명</label>
                  <input type="text" className='adminInput grow' name='name' value={addItemData.name} onChange={handleChangeValue}/>
                </div>
                <div className='flex justify-between items-end mt-1'>
                  <label className='w-5/12' htmlFor="총 수량">총 수량  </label>
                  <input type="text" className='adminInput grow' name='count' value={addItemData.count} onChange={handleChangeValue}/>
                </div>
                <div className='flex justify-between items-end mt-1'>
                  <label className='w-5/12' htmlFor="사진">사진 </label>
                  <input type="file" className='text-xs grow' name='image' value={addItemData.image} onChange={handleChangeValue}/>
                </div>
              </div>
              <div className='flex justify-center'>
                <button type='submit'
                className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>추가하기</button>
              </div>
            </form>
        </div>
      </div>
    </Modal>
  )
}