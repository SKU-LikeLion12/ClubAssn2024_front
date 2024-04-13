import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import { API } from "../../../api/API";
import { useNavigate } from 'react-router-dom';
import { confirmModalStyle } from '../../../css/customModal'; 
import Modal from 'react-modal';
import { images } from "../../../utils/images";

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
    <div className='relative min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto mb-4 pt-4 pb-6 border-b-2 border-[#12172B]'>
        <div className='text-3xl'>멤버 추가</div>
      </div>
      <div className='flex w-9/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-b'>
        <div className='w-full'>
          <div>
            <div className='flex flex-col grow gap-1'>
              <div className="text-red-400 text-[14px] text-center">학번이 틀릴 경우 수정이 불가하므로<br /> 정확하게 작성해주세요.</div>
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
      <MemberManagement />
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
          <div className='text-2xl pb-1'>멤버 추가 완료</div>
          <div className='text-sm pb-6 text-[red]'>이제 동아리원으로 추가할 수 있습니다.</div>
          <div>
            {/* <button className='text-white bg-[#12172b] py-1 px-4 mx-2 rounded-xl' onClick={closeModal}>동아리원 추가</button> */}
            <button className='text-white bg-[#12172b] py-1 px-8 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/ClubMemberManagement')}}>확인</button>
          </div>
        </div>
    </Modal>
  )
}

export const MemberManagement = () => {
  const [keyword, setKeyword] = useState('');
  const [memberInfo, setMemberInfo] = useState(null);
  const [editInfo, setEditInfo] = useState({ studentId: '', studentName: '' });

  const handleSearch = async () => {
    try {
      // API 요청시 POST 메서드를 사용하고, studentId를 요청 바디로 전송
      const response = await API().post('/admin/join-club/info', {
        studentId: keyword // 검색어로 입력받은 키워드를 studentId로 전송
      });
      const results = response.data;
      if (results) {
        setMemberInfo(results); // 검색된 동아리원 정보를 상태에 저장
        setEditInfo({
          studentId: results.studentId,
          studentName: results.name
        });
      } else {
        alert('해당하는 동아리원이 없습니다.');
        setMemberInfo(null); // 검색 결과가 없으면 정보 초기화
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      alert('동아리원 정보를 불러오는 데 실패했습니다.');
    }
  };
  
  const handleDelete = async () => {
    try {
      // studentId를 쿼리 파라미터로 전송
      const response = await API().delete(`/admin/member/delete?studentId=${memberInfo.studentId}`);
      const message = response.data; // API에서 반환된 메시지를 저장
      alert(message); // API의 응답 메시지를 알림
      setMemberInfo(null); // 멤버 정보 상태 초기화
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      if (error.response) {
        // API에서 반환된 오류 메시지가 있을 경우, 그 메시지를 사용자에게 표시
        alert(error.response.data);
      } else {
        // 오류 메시지가 없을 경우, 일반적인 실패 메시지 표시
        alert('동아리원 삭제를 완료하지 못했습니다.');
      }
    }
  };
  

  return (
    <div className=''>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto mb-4 pt-4 pb-6 border-b-2 border-[#12172B]'>
        <div className='text-3xl'>멤버 삭제</div>
      </div>
      <div className='flex justify-between w-8/12 mx-auto py-3 mt-4'>
        <input
          type="text"
          placeholder="학번 8자리 입력"
          className='border-b-2 border-gray-200 pl-2'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch} className='ml-2 w-7 px-1'>
          <img src={images.searchBtn} alt="검색버튼아이콘" className="w-5" />
        </button>
      </div>
      {memberInfo && (
        <div className='flex flex-col items-center w-6/12 mx-auto mt-4'>
          <div className="flex justify-between w-full">
            <div>
              <div className="flex">
                <div>학번 :</div>
                <div className="ml-1 pl-2">{editInfo.studentId}</div>  
              </div>
              <div className="flex">
                <div>이름 :</div>
                <div className="ml-1 pl-2">{editInfo.studentName}</div> 
              </div>  
            </div>
            <button className="w-5" onClick={handleDelete}>
              <img src={images.deleteBtn} alt="삭제하기버튼" className="w-5" />
            </button>
          </div>  
        </div>
      )}
    </div>
  );
};