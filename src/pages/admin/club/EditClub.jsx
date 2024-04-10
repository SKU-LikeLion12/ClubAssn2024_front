import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { API } from '../../../api/API';
import { IoTrashOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { confirmModalStyle } from '../../../css/customModal';

const EditClub = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = useState(false); // 수정 모달
  const [deleteModal, setDeleteModal] = useState(false); // 삭제 모달
  const { id, name, description, logo} = location.state;
  const [addItemData, setAddItemData] = useState({
    id: id,
    name: name,
    description: description
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setAddItemData({ ...addItemData, [name]: value });
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAddItemData({ ...addItemData, logo: file });
  };

  const handleDeleteItem = async (name) => {
    try {
      const result = await API().delete('/admin/club', {data: { clubName: name }}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/admin/adminMain/ClubManagement');
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleEditItem = async () => {
    const formData = new FormData();
    formData.append('id', addItemData.id); // 이름 추가
    formData.append('name', addItemData.name); // 이름 추가
    formData.append('description', addItemData.description); // 수량 추가
    if (addItemData.logo !== undefined && addItemData.logo !== null) {
      formData.append('logo', addItemData.logo); // 이미지 파일 추가
    }
    
    try {
      const result = await API().put('/admin/club', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setConfirmModal(!confirmModal);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-2'>
      <div className='text-3xl'>동아리 수정</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div className='flex'>
          <div className='flex flex-col grow gap-1'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="물품명">동아리명</label>
              <input type="text" className='adminInput grow' name='name' value={addItemData.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="총 수량">동아리 설명</label>
              <input type="text" className='adminInput grow' name='description' value={addItemData.description} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-4/12' htmlFor="로고">로고 </label>
              <input type="file" className='text-xs grow ml-5' name='logo' onChange={handleFileChange}/>
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
    {deleteModal && <ConfirmDeleteModal name={addItemData.name} deleteModal={deleteModal} setDeleteModal={setDeleteModal} Dfunc={handleDeleteItem} />}
  </div>
  );
};

export default EditClub;

export const ConfirmEditModal = ({confirmModal, setConfirmModal, setAddItemData}) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setConfirmModal(!confirmModal)
    setAddItemData({
      name: '',
      count: '',
      logo: null
    });
  }

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setConfirmModal(false)}
      isOpen={confirmModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>동아리 수정 완료</div>
          <button className='text-white bg-[#12172b] py-1 px-12 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/ClubManagement')}}>확인</button>   
        </div>
    </Modal>
  )
}

export const ConfirmDeleteModal = ({name, deleteModal, setDeleteModal, Dfunc}) => {
  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setDeleteModal(false)}
      isOpen={deleteModal}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>정말 삭제하시겠습니까?</div>
          <div>
            <button className='text-white bg-[#12172b] py-1 px-10 mx-2 rounded-xl' onClick={()=>{setDeleteModal(!deleteModal)}}>취소</button>
            <button className='text-white bg-[#12172b] py-1 px-10 mx-2 rounded-xl' onClick={()=>{Dfunc(name)}}>삭제</button>
          </div> 
        </div>
    </Modal>
  )
}