import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import { API } from "../../../api/API";
import { Link, useNavigate } from 'react-router-dom';
import { confirmModalStyle } from '../../../css/customModal'; 
import Modal from 'react-modal';
import { GiClick } from "react-icons/gi";

const AddMember = () => { // 동아리원 추가
  const [isOpen, setIsOpen] = useState(false) // 확인 모달창
  const [addMemberData, setAddMemberData] = useState({ 
    studentId: '',
    name: '',
    role: 'ROLE_MEMBER'
  })

  const handleChangeValue = (e) => { // 선택한 동아리 업데이트 
    const { name, value } = e.target;
    setAddMemberData({ ...addMemberData, [name]: value });
  }

  const handleRoleChangeValue = (e) => { // 선택한 동아리 업데이트 
    const role = e.target.checked ? 'ROLE_ADMIN' : 'ROLE_MEMBER'
    setAddMemberData({ ...addMemberData, role });
  }

  const addMember =  async () => { // 동아리+동아리원 추가 btn
    try {
      await API().post('/admin/member/add', addMemberData);
      setIsOpen(!isOpen); 
    } catch (error) {
      console.error(error)
      alert('학생 정보를 확인해주세요.')
    }
  }

  return (
    <div className='min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
        <div className='text-3xl'>멤버 추가</div>
      </div>
      
      <div className='flex w-9/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div>
          <div className='flex flex-col grow gap-1'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="studentId">학번</label>
              <input type="text" className='adminInput grow' name='studentId' value={addMemberData.studentId} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="name">이름</label>
              <input type="text" className='adminInput grow' name='name' value={addMemberData.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-center items-center mt-1'>
              <label className='w-3/12' htmlFor="role">관리자</label>
              <input type="checkbox" className='adminInput grow' name='role' onChange={handleRoleChangeValue}/>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={addMember}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>추가하기</button>
        </div>
      </div>
    </div>
      {isOpen && <ConfirmAddModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
};
export default AddMember;

export const ConfirmAddModal = ({isOpen, setIsOpen}) => {
  const navigate = useNavigate();

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>동아리 추가 완료</div>
          <div>
            {/* <button className='text-white bg-[#12172b] py-1 px-4 mx-2 rounded-xl' onClick={closeModal}>동아리원 추가</button> */}
            <button className='text-white bg-[#12172b] py-1 px-4 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/ClubMemberManagement')}}>확인</button>
          </div>
        </div>
    </Modal>
  )
}