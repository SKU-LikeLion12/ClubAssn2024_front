import React, { useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import Modal from 'react-modal';
import { confirmModalStyle } from '../../../css/customModal'; 

const AddClub = () => {
  const navigate = useNavigate();
  const [confirmModal, setConfirmModal] = useState(false);
  const [isAdd, setIsAdd] = useState({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setIsAdd({ ...isAdd, [name]: value });
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsAdd({ ...isAdd, logo: file });
    }
  };
  
  const handleAddClub = async () => {
    const formData = new FormData();
    formData.append('clubName', isAdd.clubName); // 이름 추가
    formData.append('description', isAdd.description); // 수량 추가
    formData.append('logo', isAdd.logo); // 이미지 파일 추가

    try {
      const result = await API().post('/admin/club/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setConfirmModal(!confirmModal);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>동아리 추가</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div>
          <div className='flex flex-col grow gap-1 w-full'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="clubName">동아리명</label>
              <input type="text" className='adminInput w-7/12' id='clubName' name='clubName' value={isAdd.clubName} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1 w-full'>
              <label className='w-4/12' htmlFor="description">동아리 설명</label>
              <input type="text" className='adminInput w-7/12' id='description' name='description' value={isAdd.description} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1 w-full'>
              <label className='w-4/12' htmlFor="logo">로고</label>
              <input type="file" className='text-xs w-7/12 ml-5' id='logo' name='logo' onChange={handleFileChange}/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={handleAddClub}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>추가하기</button>
        </div>
      </div>
    </div>
    {confirmModal && <ConfirmAddModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} setIsAdd={setIsAdd} />}
  </div>
  );
};

export default AddClub;

export const ConfirmAddModal = ({confirmModal, setConfirmModal, setIsAdd}) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setIsAdd({
      clubName: '',
      description: '',
      logo: '',
    })
    setConfirmModal(!confirmModal)
  }

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setConfirmModal(false)}
      isOpen={confirmModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>동아리 추가 완료</div>
          <div className='flex w-10/12'>
            <button className='text-white bg-[#12172b] py-1 px-4 mx-2 rounded-xl w-1/2' onClick={closeModal}>동아리 추가</button>
            <button className='bg-gray-200 py-1 px-4 mx-2 rounded-xl w-1/2' onClick={()=>{navigate('/admin/adminMain/ClubManagement')}}>홈으로</button>
          </div>
        </div>
    </Modal>
  )
}