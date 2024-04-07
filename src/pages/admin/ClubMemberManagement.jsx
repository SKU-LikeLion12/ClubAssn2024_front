import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { API } from '../../api/API';

const ClubMemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return; // 검색어가 없으면 검색을 실행하지 않음

    try {
      // URL에 포함된 {keyword}를 실제 검색어로 교체해야 합니다.
      // `encodeURI`를 사용하여 URL에서 사용할 수 있도록 검색어를 인코딩합니다.
      const encodedKeyword = encodeURI(searchTerm);
      const response = await API().get(`/admin/join-club/${encodedKeyword}`);
      setSearchResults(response.data); // 가정: 응답 데이터는 검색 결과의 배열
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]); // 오류가 발생하면 검색 결과를 비웁니다.
    }
  };

  return (
    <>
      <AdminNav/>
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4'>동아리원 관리</div>
        <div className='text-right'>
          <button className='w-16 h-8 bg-zinc-300 rounded-lg'>추가</button>
        </div>
        <div className="w-full mt-2 border border-black"></div>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </div>
    </>
  );
};

export default ClubMemberManagement;

// SearchBox 컴포넌트 정의
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
      <img src='../../assets/images/search_icon.png' alt='검색 아이콘' className='w-5 cursor-pointer' onClick={onSearch}/>
    </div>
  );
};

export const SearchResults = ({ results }) => {
  const handlePuzzleClick = () => console.log("퍼즐 조각 추가");
  const handleLeaveClick = () => console.log("동아리원 탈퇴 처리");

  if (results.length === 0) {
    return <div className="text-center my-5">검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      {results.map((result, index) => (
        <div key={index} className="my-4 p-2 rounded shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-semibold">이름:</span> {result.studentName} <span className="font-semibold ml-4">학번:</span> {result.studentId}
            </div>
            <button onClick={handlePuzzleClick} className="w-20 h-8 bg-blue-500 text-white rounded-lg">퍼즐 조각</button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">소속 동아리:</span> {result.clubName}
            </div>
            <button onClick={handleLeaveClick} className="w-20 h-8 bg-red-500 text-white rounded-lg">탈퇴</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AddClubMember = () => {
  return (
    <>
      <AdminNav/>
    </>
  )
};

