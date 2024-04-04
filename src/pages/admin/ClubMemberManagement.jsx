import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import axios from 'axios';

// 아래에 SearchBox와 SearchResults 컴포넌트 정의가 포함될 것임

const ClubMemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const tempResults = [
    { name: "홍길동", studentId: "20210001", club: "로봇 동아리" },
    { name: "김철수", studentId: "20210002", club: "음악 동아리" },
    { name: "이영희", studentId: "20210003", club: "미술 동아리" }
  ];

  const handleSearch = async () => {
    try {
      const response = await axios.get(`YOUR_BACKEND_ENDPOINT?query=${searchTerm}`);
      setSearchResults(response.data); // 가정: 응답 데이터는 검색 결과의 배열
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(tempResults)
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
  // 버튼 클릭 이벤트 핸들러 (여기서는 예시로 console.log를 사용)
  const handlePuzzleClick = () => console.log("퍼즐 조각 추가");
  const handleLeaveClick = () => console.log("동아리원 탈퇴 처리");

  return (
    <div>
      <div className="w-full mt-5 border border-black"></div>
      {results.map((result, index) => (
        <div key={index} className="my-2">
          {/* 첫 번째 줄: 이름, 학번, 퍼즐 조각 버튼 */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="mr-10">이름: {result.name}</span> 
              <span>학번: {result.studentId}</span>
            </div>
            <button onClick={handlePuzzleClick} className="w-16 h-8 bg-zinc-300 rounded-lg">퍼즐 조각</button>
          </div>
          {/* 두 번째 줄: 소속 동아리, 동아리원 탈퇴 버튼 */}
          <div className="flex justify-between items-center">
            <div>
              소속 동아리: {result.club}
            </div>
            <button onClick={handleLeaveClick} className="w-16 h-8 bg-zinc-300 rounded-lg">탈퇴</button>
          </div>
          <div className="w-full mt-2 border border-black"></div>
        </div>
      ))}
    </div>
  );
};


