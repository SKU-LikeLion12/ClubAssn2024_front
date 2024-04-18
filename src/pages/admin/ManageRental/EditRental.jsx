import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { confirmModalStyle } from '../../../css/customModal'; 
import { API } from '../../../api/API';
import AdminNav from '../../../components/AdminNav';

const EditRental = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { id, name, count } = location.state;
  const [addItemData, setAddItemData] = useState({
    itemId: id,
    name: name,
    count: count
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setAddItemData({ ...addItemData, [name]: value });
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAddItemData({ ...addItemData, image: file });
  };

  const handleDeleteItem = async (id) => {
    try {
      const result = await API().delete(`/admin/item/${id}`, id);
      navigate('/admin/adminMain/RentalItemManagement');
    } catch (error) {
      console.error(error)
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          localStorage.clear();
          navigate('/admin/adminLogin')
        }
      }
    }
  }
  
  const handleEditItem = async () => {
    const formData = new FormData();
    formData.append('itemId', addItemData.itemId); // 이름 추가
    formData.append('name', addItemData.name); // 이름 추가
    formData.append('count', addItemData.count); // 수량 추가
    if (addItemData.image !== undefined && addItemData.image !== null) {
      formData.append('image', addItemData.image); // 이미지 파일 추가
    }

    try {
      const result = await API().put('/admin/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setConfirmModal(!confirmModal);
    } catch (error) {
      console.error(error)
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          localStorage.clear();
          navigate('/admin/adminLogin')
        }
      }
    }
  }

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-2'>
      <div className='text-3xl'>대여 물품 수정</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div className='flex'>
          <div className='flex flex-col grow gap-1'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="물품명">물품명</label>
              <input type="text" className='adminInput grow' name='name' value={addItemData.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="총 수량">총 수량  </label>
              <input type="text" className='adminInput grow' name='count' value={addItemData.count} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="사진">사진 </label>
              <input type="file" className='text-xs grow ml-5' name='image' onChange={handleFileChange}/>
            </div>
          </div>
          <button onClick={()=>{setDeleteModal(!deleteModal)}} className='text-[red] w-2/12 ml-4'>
            <IoTrashOutline size={22}/>
          </button>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={handleEditItem}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>수정하기</button>
        </div>
      </div>
    </div>
    {confirmModal && <ConfirmEditModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} setAddItemData={setAddItemData} />}
    {deleteModal && <ConfirmDeleteModal id={id} deleteModal={deleteModal} setDeleteModal={setDeleteModal} Dfunc={handleDeleteItem} />}
  </div>
  );
};

export default EditRental;

export const ConfirmEditModal = ({confirmModal, setConfirmModal, setAddItemData}) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setConfirmModal(!confirmModal)
    setAddItemData({
      name: '',
      count: '',
      image: null
    });
  }

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setConfirmModal(false)}
      isOpen={confirmModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>물품 수정 완료</div>
          <button className='text-white bg-[#12172b] py-1 px-12 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/RentalItemManagement')}}>확인</button>   
        </div>
    </Modal>
  )
}

export const ConfirmDeleteModal = ({id, deleteModal, setDeleteModal, Dfunc}) => {
  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setDeleteModal(false)}
      isOpen={deleteModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-xl p-8'>물품을 삭제하시겠습니까?</div>
          <div className='flex w-10/12'>
            <button className='text-white bg-[#12172b] py-1 mx-2 rounded-xl w-6/12' onClick={()=>{Dfunc(id)}}>삭제</button>
            <button className='bg-gray-200 py-1 mx-2 rounded-xl w-6/12' onClick={()=>{setDeleteModal(!deleteModal)}}>취소</button>
          </div> 
        </div>
    </Modal>
  )
}