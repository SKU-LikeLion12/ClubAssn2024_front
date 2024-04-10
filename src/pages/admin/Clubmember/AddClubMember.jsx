import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import { API } from "../../../api/API";
import { Link, useNavigate } from 'react-router-dom';
import { confirmModalStyle } from '../../../css/customModal'; 
import Modal from 'react-modal';
import { GiClick } from "react-icons/gi";

const AddClubMember = () => { // 동아리원 추가
  const [isOpen, setIsOpen] = useState(false) // 확인 모달창
  const [allClubList, setAllClubList] = useState([]); // 모든 동아리 리스트 
  const [allMemberList, setAllMemberList] = useState([]); // 모든 멤버 리스트 
  const [addClubMemberData, setAddClubMemberData] = useState({ // 동아리원 추가 api로 보낼 데이터 담긴 변수
    studentId: '',
    studentName: '',
    clubName: '',
  })

  const handleClubChangeValue = (e) => { // 선택한 동아리 업데이트 
    const { name, value } = e.target;
    setAddClubMemberData({ ...addClubMemberData, [name]: value });
  }

  const handleMemberChangeValue = (e) => { // 선택한 동아리원 업데이트
    const selectedOption = e.target.options[e.target.selectedIndex];
    const studentId = selectedOption.dataset.customattribute;
    const { name, value } = e.target;
    setAddClubMemberData({ ...addClubMemberData, [name]: value, studentId: studentId});
  }

  const fetchGetData = async () => { // 동아리조회 > 동아리원조회 : 비동기 처리
    try {
      await getAllClub();
      await getAllMember();
    } catch (error) {
      console.error(error)
    }
  }

  const getAllClub = async  () => { // 동아리 조회
    try {
      const result = await API().get('/admin/club/all');
      const clubName = result.data[0].name;
      setAddClubMemberData(prevData => ({ ...prevData, clubName })); // 초깃값 설정
      setAllClubList(result.data);
    } catch (error) {
      console.error(error)
    }
  }
  const getAllMember = async () => { // 동아리원 조회
    try {
      const result = await API().get('/admin/join-club/all-list');
      const studentName = result.data[0].name;
      const studentId = result.data[0].studentId;
      setAddClubMemberData(prevData => ({ ...prevData, studentName, studentId})); // 초깃값 설정
      setAllMemberList(result.data); 
    } catch (error) {
      console.error(error);
    }
  }  

  const addClubMember =  async () => { // 동아리+동아리원 추가 btn
    try {
      await API().post('/admin/join-club/add', addClubMemberData); 
      setIsOpen(!isOpen); // 확인 모달창 오픈
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchGetData();
  }, [])

  return (
    <div className='min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
        <div className='text-3xl'>동아리원 추가</div>
      </div>
      
      <div className="text-xl flex flex-col w-10/12 mx-auto gap-3">
        <div>
          <label for="clubName">동아리 선택 : </label>
          <select id="clubName" name="clubName" onChange={handleClubChangeValue}>
            {allClubList.map((item)=>{
              return(
                <option key={item.id} name='clubName' value={item.name}>{item.name}</option>
              )
            })}
          </select>
        </div>

        <div>
          <label for="studentName">동아리원 선택 : </label>
          <select id="studentName" name="studentName" onChange={handleMemberChangeValue}>
            {allMemberList.map((item)=>{
              return(
                <option key={item.studentId} name={item.name} value={item.name} data-customattribute={item.studentId}>{item.name}</option>
              )
            })}
          </select>
          
        </div>
        <button onClick={addClubMember} className="py-2 px-3 bg-[#12172B] text-white rounded-2xl w-8/12 mx-auto">동아리원 추가</button>
        <div className="text-xs text-[red] flex mx-auto">
            <div className="mr-1">선택할 동아리원이 없다면 멤버로 먼저 추가하세요.</div>
            <Link to="AddMember" className="underline italic flex items-center">멤버 추가<GiClick className="ml-1"/></Link>
          </div>
      </div>
      {isOpen && <ConfirmAddModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
};
export default AddClubMember;

export const ConfirmAddModal = ({isOpen, setIsOpen}) => {
  const navigate = useNavigate();

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>동아리원 추가 완료</div>
          <div>
            {/* <button className='text-white bg-[#12172b] py-1 px-4 mx-2 rounded-xl' onClick={closeModal}>동아리원 추가</button> */}
            <button className='text-white bg-[#12172b] py-1 px-8 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/ClubMemberManagement')}}>확인</button>
          </div>
        </div>
    </Modal>
  )
}