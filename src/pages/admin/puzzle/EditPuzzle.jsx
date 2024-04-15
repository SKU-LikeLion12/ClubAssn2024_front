import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import Modal from 'react-modal';
import { confirmModalStyle } from '../../../css/customModal'; 


const EditPuzzle = () => {
  const location = useLocation();
  const { id, name, date } = location.state; // 퍼즐 관리 페이지에서 넘겨준 데이터 받기
  const [confirmModal, setConfirmModal] = useState(false); // 수정 모달
  const [EditItemData, setEditItemData] = useState({
    id: id,
    name: name,
    date: date
  }); // 수정한 데이터들이 객체형태로 담겨있는 state 변수

  const handleChangeValue = (e) => { // 행사명, 날짜 수정되는 핸들러
    const { name, value } = e.target;
    setEditItemData({ ...EditItemData, [name]: value });
  }

  const handleFileChange = (e) => { // 이미지 파일 수정되는 핸들러
    const file = e.target.files[0];
    if (file) {
      setEditItemData({ ...EditItemData, image: file });
    }
  };

  const handleEditEvent = async () => { // 수정 핸들러
    const formData = new FormData();
    formData.append('id', EditItemData.id); // id
    formData.append('name', EditItemData.name); // 행사명
    formData.append('date', EditItemData.date); // 수량 추가 - 수정 후 주석 변경
    if(EditItemData.image !== undefined && EditItemData.image !== null) {
      formData.append('image', EditItemData.image); // 이미지 파일 추가
    } 

    console.log(formData)
    try {
      const result = await API().put('/admin/events/update', formData, { // 수정 API
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
      <div className='text-3xl'>퍼즐 조각 수정</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div className='flex'>
          <div className='flex flex-col grow gap-1 w-full'>
            <div className='flex justify-between items-end mt-1 w-full'>
              <label className='w-3/12' htmlFor="event">행사명</label>
              <input type="text" className='adminInput w-7/12' id='event' name='name' value={EditItemData.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1 w-full'>
              <label className='w-3/12' htmlFor="date">날짜</label>
              <input type="date" className='adminInput w-7/12' id='date' name='date' value={EditItemData.date} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1 w-full'>
              <label className='w-3/12' htmlFor="image">포스터</label>
              <input type="file" className='text-xs w-7/12 ml-5' id='image' name='image' onChange={handleFileChange}/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={handleEditEvent}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>수정하기</button>
        </div>
      </div>
      {confirmModal && <ConfirmEditModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} setEditItemData={setEditItemData} />}  
      </div>
  </div>
  );
};

export default EditPuzzle;

export const ConfirmEditModal = ({confirmModal, setConfirmModal, setEditItemData}) => {
  const navigate = useNavigate();

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setConfirmModal(false)}
      isOpen={confirmModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>행사 수정 완료</div>
          <button className='text-white bg-[#12172b] py-1 px-12 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/PuzzlePieceManagement')}}>확인</button>   
        </div>
    </Modal>
  )
}