import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import { API } from "../../../api/API";
import { Link, useNavigate } from 'react-router-dom';
import { confirmModalStyle } from '../../../css/customModal'; 
import Modal from 'react-modal';
import { GiClick } from "react-icons/gi";
import { images } from "../../../utils/images";

const AddClubMember = () => {
  const [isOpen, setIsOpen] = useState(false); // 확인 모달창 상태
  const [allClubList, setAllClubList] = useState([]); // 모든 동아리 리스트 상태
  const [allMemberList, setAllMemberList] = useState([]); // 모든 멤버 리스트 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [addClubMemberData, setAddClubMemberData] = useState({ // 동아리원 추가 데이터
    studentId: '',
    studentName: '',
    clubName: '',
  });
  const [searchStudentId, setSearchStudentId] = useState(''); // 검색할 학번 상태
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 상태
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleClubChangeValue = (e) => { // 동아리 선택 핸들러
    const { name, value } = e.target;
    setAddClubMemberData({ ...addClubMemberData, [name]: value });
  }
  const handleCheckboxChange = (studentId, isChecked) => {
    if (isChecked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };
  

  useEffect(() => {
    fetchGetData(); // 컴포넌트 마운트 시 데이터 로딩
  }, []);

  // 학번 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearchStudentId(e.target.value);
  }
  
  // 학번 검색 핸들러
  /* const isValidStudentId = (studentId) => {
    const pattern = /^[0-9]{8}$/; // 8자리 숫자로 이루어진 학번
    return pattern.test(studentId);
  }; */
  /* if (!isValidStudentId(searchStudentId)) {
    alert('유효하지 않은 학번입니다.');
    return;
  } */

  const handleSearch = async () => {
    try {
      const result = await API().get(`/admin/join-club/info?keyword=${searchStudentId}`);
      const resultMap = new Map();
      // 검색 결과에서 각 항목을 순회하며 Map 객체에 학번을 키로, 항목 전체를 값으로 저장
      result.data.forEach(item => {
        resultMap.set(item.studentId, item);
      });
      // Map 객체의 값들만 배열로 변환하여 상태를 업데이트
      const uniqueResults = Array.from(resultMap.values());
      setSearchResult(uniqueResults);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  const fetchGetData = async () => { // 초기 데이터 로딩 함수
    try {
      await getAllClub();
      await getAllMember();
    } catch (error) {
      console.error(error)
    }
  }

  const getAllClub = async  () => { // 모든 동아리 조회
    try {
      const result = await API().get('/admin/club/all');
      const clubName = result.data[0].name;
      setAddClubMemberData(prevData => ({ ...prevData, clubName })); // 초기값 설정
      setAllClubList(result.data);
    } catch (error) {
      console.error(error)
    }
  }

  const getAllMember = async () => { // 모든 멤버 조회
    try {
      const result = await API().get('/admin/join-club/all-list');
      const studentName = result.data[0].name;
      const studentId = result.data[0].studentId;
      setAddClubMemberData(prevData => ({ ...prevData, studentName, studentId})); // 초기값 설정
      setAllMemberList(result.data); 
    } catch (error) {
      console.error(error);
    }
  }  

  const addSelectedClubMembers = async () => {
    try {
      // 선택된 학생들을 동아리원으로 추가하는 API 호출 구현
      const promises = selectedStudents.map(studentId =>
        API().post('/admin/join-club/add', { ...addClubMemberData, studentId })
      );
      await Promise.all(promises);
      setIsOpen(true); // 성공 모달창 열기
      setErrorMessage(""); // 에러 메시지 초기화
      setSelectedStudents([]); // 선택 상태 초기화
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 406) {
        setErrorMessage("중복된 동아리원이 있습니다!"); // 406 에러 처리
      } else {
        setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className='relative min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto mb-4 pt-4 pb-6 border-b-2 border-[#12172B]'>
        <div className='text-3xl'>동아리원 추가</div>
      </div>
      
      <div className="text-xl flex flex-col w-10/12 mx-auto gap-3">
        <div className="flex justify-between">
          <div className="text-[16px]">
            <label htmlFor="clubName"></label>
            <select id="clubName" name="clubName" onChange={handleClubChangeValue}>
              {allClubList.map((item) => {
                return <option key={item.id} value={item.name}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="w-6/12 flex text-[14px] ml-8">
            <div>
              학번 : 
            </div> 
            <input
              type="text"
              placeholder="학번 검색"
              value={searchStudentId}
              onChange={handleSearchInputChange}
              className="w-7/12 text-[14px] pl-2 border-b-2 "/>
          </div>
          <button onClick={handleSearch} className="w-8">
            <img src={images.searchBtn} alt='검색 아이콘' className='w-5' />
          </button>
        </div>
        
        {/* 멤버 추가 안내 */}
        <div className="text-xs text-[red] flex mx-auto">
          <div className="mr-1">선택할 동아리원이 없다면 멤버로 먼저 추가하세요.</div>
          <Link to="AddMember" className="underline italic flex items-center">멤버 관리<GiClick className="ml-1"/></Link>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <div className="text-center my-4 text-red-500">{errorMessage}</div>}
        
        {/* 검색 결과 테이블 */}
        <div className="table h-[50vh] text-center bg-white border-[3px] rounded-md border-[#12172B] text-[14px] overflow-y-scroll">
          <table className="w-full" id="dynamicTable">
            <thead>
              <tr className="border-b-[1px] border-[#91ade660]">
                <th>학번</th>
                <th>이름</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item) => (
                <tr key={item.studentId}>
                  <td>{item.studentId}</td>
                  <td>{item.studentName}</td>
                  <td className="pt-1.5">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onChange={e => handleCheckboxChange(item.studentId, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 동아리원 추가 버튼 */}
        <button onClick={addSelectedClubMembers} className="mt-4 py-2 px-3 bg-[#12172B] text-white rounded-2xl w-8/12 mx-auto">동아리원 추가</button>
        
        
        
        
      </div>
      {isOpen && <ConfirmAddModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
export default AddClubMember;

export const ConfirmAddModal = ({isOpen, setIsOpen}) => {
  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(!isOpen);
    // setAddItemData({
    //   name: '',
    //   count: '',
    //   image: null
    // })
  }

  return (
    <Modal
      style={confirmModalStyle}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}>
        <div className='textFont flex flex-col items-center justify-center h-full'>
          <div className='text-2xl p-8'>동아리원 추가 완료</div>
          <div className="w-full flex">
            <button className='text-white bg-[#12172b] w-1/2 py-1 mx-2 rounded-xl' onClick={() => { setIsOpen(false); navigate('/admin/adminMain/ClubMemberManagement/AddClubMember'); }}>동아리원 추가</button>
            <button className='text-gray-500 bg-gray-200 w-1/2 py-1 mx-2 rounded-xl' onClick={()=>{navigate('/admin/adminMain/ClubMemberManagement')}}>홈으로</button>
          </div>
        </div>
    </Modal>
  )
}