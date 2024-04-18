import React, { useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import Modal from 'react-modal';
import { confirmModalStyle } from '../../../css/customModal';

const AddPuzzle = () => {
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
      setIsAdd({ ...isAdd, image: file });
    }
  };

  const handleAddEvent = async () => {
    const formData = new FormData();
    formData.append('name', isAdd.name); // 이름 추가
    // formData.append('date', '2024-04-06T11:14:51.572'); // 수량 추가 
    formData.append('date', isAdd.date); // 수량 추가 - 수정 후 주석 변경
    formData.append('image', isAdd.image); // 이미지 파일 추가

    try {
      const result = await API().post('/admin/events/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>퍼즐 조각 추가</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div>
          <div className='flex flex-col grow gap-1'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="event">행사명</label>
              <input type="text" className='adminInput grow' id='event' name='name' value={isAdd.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="date">날짜</label>
              <input type="date" className='adminInput grow' id='date' name='date' value={isAdd.date} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="image">포스터</label>
              <input type="file" className='text-xs grow ml-5' id='image' name='image' onChange={handleFileChange}/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={handleAddEvent}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>추가하기</button>
        </div>
      </div>
    </div>
    {confirmModal && <ConfirmAddModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} setIsAdd={setIsAdd} />}
  </div>
  );
};

export default AddPuzzle;


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
          <div className='text-2xl p-8'>행사 추가 완료</div>
          <div>
            <button className='text-white bg-[#12172b] py-1 px-10 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/PuzzlePieceManagement')}}>확인</button>
          </div>
        </div>
    </Modal>
  )
}