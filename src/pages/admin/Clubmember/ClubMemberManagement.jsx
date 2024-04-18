import React, { useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { API } from '../../../api/API';
import { useNavigate } from 'react-router-dom';

const ClubMemberManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await API().get(`/admin/join-club/search?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleDelete = async () => {
    console.log('Deleting item:', selectedItem);
  
    try {
      const requestBody = {
        clubName: selectedItem.clubName,
        memberId: selectedItem.studentId
      };
  
      // API 호출로 항목 삭제
      await API().delete("/admin/join-club", { data: requestBody });
      setIsModalOpen(false); // 모달 닫기
  
      // 삭제 성공 후, 해당 항목을 searchResults에서 제거
      const updatedResults = searchResults.filter(item => item.studentId !== selectedItem.studentId);
      setSearchResults(updatedResults); // 업데이트된 목록으로 상태 변경
  
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          localStorage.clear();
          navigate('/admin/adminLogin')
        }
      }
    }
  };

  return (
    <>
      <AdminNav/>
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4'>동아리원 관리</div>
        <div className='text-right'>
          <button onClick={()=>{navigate('AddClubMember')}} className='w-16 h-8 bg-zinc-300 rounded-lg'>추가</button>
        </div>
        <div className="w-full mt-2 border border-black"></div>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        <SearchResults 
          results={searchResults} 
          setIsModalOpen={setIsModalOpen} 
          setSelectedItem={setSelectedItem}
          searchTerm={setSearchTerm}
        />
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
        item={selectedItem}
      />
      </div>
    </>
  );
};

export default ClubMemberManagement;

// SearchBox 컴포넌트
export const SearchBox = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div className="flex items-center justify-between w-full h-[30px] mt-6 bg-white rounded-xl border-2 border-slate-800 px-2">
      <input
        type="text"
        placeholder="이름 or 학번 or 소속 동아리 검색"
        className="w-full border-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={onSearch}>
        <img src='../../assets/images/search_icon.png' alt='검색 아이콘' className='w-5 cursor-pointer' />
      </button>
    </div>
  );
};

// SearchResults 컴포넌트
export const SearchResults = ({ results, setIsModalOpen, setSelectedItem, searchTerm}) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const handlePuzzleClick = (item) => {
    navigate("EditPuzzle", { state: { studentName: item.studentName, studentId: item.studentId, clubName: item.clubName } });
  }; // 퍼즐조각 클릭하면 실행하는 함수 


  const handleLeaveClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (results.length === 0) {
    return <div className="text-center my-5">검색 결과가 없습니다.</div>;
  }



  return (
    <div>
      {results.map((result, index) => (
        <div key={index} className="my-4 p-2 rounded shadow-sm hover:shadow-md transition-shadow text-sm">
          <div className="flex justify-between items-center mb-4"> 
            <div className="flex items-center font-semibold"> 
              <span>이름 :</span>
              <span className="border-b border-black mx-2 ml-4">{result.studentName}</span>
              <span className="ml-2">학번 :</span>
              <span className="border-b border-black ml-2 ml-5">{result.studentId}</span> 
            </div>
            <button onClick={() => handleLeaveClick(result)} className="w-[75px] h-8 bg-zinc-300 rounded-lg">삭제</button>
          </div>
          <div className="flex justify-between items-center mb-4"> 
            <div>
              <span className="font-semibold">소속 동아리 :</span>
              <span className='border-b border-black ml-7 font-semibold'>{result.clubName}</span>
            </div>
            <button onClick={() => handlePuzzleClick(result)} className="w-[75px] h-8 bg-zinc-300 rounded-lg">퍼즐 조각</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded w-[340px] h-64 relative flex flex-col items-center border-2 border-black rounded-lg">
        <button 
          className="absolute top-0 right-0 mt-2 mr-2 text-4xl font-light text-gray-700 hover:text-gray-900" 
          onClick={onClose}
        >
          &times;
        </button>
        <div className='mt-5'>
        <p className="text-center font-bold">이름 : {item?.studentName}</p>
        <p className="text-center font-bold">학번 : {item?.studentId}</p>
        <p className="text-center font-bold">소속 동아리 : {item?.clubName}</p>
        </div>
        <p className="text-center text-2xl font-bold mt-8">삭제하시겠습니까?</p>
        <div className="flex justify-center w-full mt-4">
          <button className="text-white bg-[#12172b] py-1 mx-2 rounded-xl w-4/12" onClick={onDelete}>삭제</button>
          <button className="bg-gray-200 py-1 mx-2 rounded-xl w-4/12" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};
