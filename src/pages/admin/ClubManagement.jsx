import React,{useState, useEffect} from 'react';
import AdminNav from '../../components/AdminNav';
import axios from 'axios';

const ClubManagement = () => {
  const [isAdding, setIsAdding] = useState(false); // 추가 상태 관리

  // 추가 버튼 클릭 핸들러
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // 조건부 렌더링
  if (isAdding) {
    return <AddClub />;
  }

  return (
    <>
      <AdminNav/>
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4'>동아리 관리</div>
        <div className='text-right'>
          <button className='w-16 h-8 bg-zinc-300 rounded-lg' onClick={handleAddClick}>추가</button>
        </div>
        <div className="w-full mt-2 border border-black"></div>
      </div>
      <Clubdiv/>
    </>
  );
};

export default ClubManagement;

export const Clubdiv = () => {
  const [clubs, setClubs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);


  useEffect(() => {
    // 백엔드 서버로부터 동아리 데이터를 가져오는 함수
    const fetchClubs = async () => {
      setClubs([
        {
          "name": "멋쟁이사자처럼",
          "description": "국내최대규모 IT창업동아리"
        },
        {
          "name": "멋쟁이사232자처럼",
          "description": "국내최대규모 IT창업동아리"
        },
        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },
        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },        {
          "name": "애드마인",
          "description": "애드마인"
        },
        {
          "name": "애드마인",
          "description": "애드마인"
        }
        // 임시데이터
      ]);
      try {
        const response = await axios.get('/admin/club/all');
        setClubs(response.data); // 데이터를 상태에 저장
      } catch (error) {
        console.error("동아리 데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchClubs();
  }, []); // 컴포넌트가 렌더링 될 때 실행

    // 클릭 이벤트 핸들러
    const handleDeleteClick = (club) => {
      setSelectedClub(club); // 선택된 클럽 상태 업데이트
      setShowPopup(true); // 팝업 창 표시
    };
  
    // 팝업 창을 닫는 함수
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    // 예 버튼 클릭 처리 함수
    const handleConfirmDelete = () => {
      // 실제 삭제 로직 구현...
      console.log(`${selectedClub?.name} 삭제 처리`);
      handleClosePopup(); // 팝업 창 닫기
    };

  // 동아리 데이터를 화면에 렌더링
  return (
  <div className="overflow-y-auto max-h-[800px]"> {/* 스크롤바가 추가되는 부분 */}
  {clubs.map((club, index) => (
    <React.Fragment key={index}> 
      <div className="flex justify-between items-center my-2 p-2">
        <div className="text-sm font-bold">{club.name}</div>
        <img src='../../assets/images/clubManage/trash_icon.png' alt='삭제 이미지' className='w-5 cursor-pointer' onClick={() => handleDeleteClick(club)}/>
      </div>
      <div className="w-full mt-2 border border-black"></div>
    </React.Fragment>
  ))}
       {showPopup && (
        <DeletePopup
          club={selectedClub}
          onConfirm={handleConfirmDelete}
          onCancel={handleClosePopup}
        />
      )}
  </div>
);
};

export const DeletePopup = ({ club, onConfirm, onCancel }) => {
  if (!club) return null; // 클럽 정보가 없으면 아무것도 렌더링하지 않음

  // 동아리 삭제 처리 함수
  const handleDeleteClub = async () => {
    try {
      const response = await axios.delete('/admin/club', {
        data: {
          clubName: club.name // 동아리 이름을 요청 본문에 포함
        }
      });
      console.log(response); // 응답 로깅
      onConfirm(); // 삭제 성공 시 실행할 콜백 함수
    } catch (error) {
      console.error('동아리 삭제 실패:', error);
      // 오류 처리 로직 (예: 사용자에게 오류 메시지 표시)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative flex flex-col justify-center p-5 border-2 border-black w-80 min-h-[300px] shadow-lg rounded-md bg-white">
        {/* X표시 버튼 */}
        <button onClick={onCancel} className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="text-center">
          <p className='text-lg font-bold mb-2 textFont'>동아리명</p>
          <div className="text-xl font-medium mb-4"><span className="font-bold textFont">{club.name}</span></div>
          <p className="mt-10 font-bold textFont text-2xl">삭제하시겠습니까?</p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="text-black font-bold py-0.5 px-8 border-2 border-black rounded text-sm textFont" onClick={handleDeleteClub}>예</button>
            <button className="text-black font-bold py-0.5 px-8 border-2 border-black rounded text-sm textFont" onClick={onCancel}>아니오</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddClub = () => {
  // 동아리 이름, 로고, 설명을 위한 상태
  const [clubName, setClubName] = useState('');
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState('');

  // 입력 핸들러 함수들
  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 방지

    const formData = new FormData();
    formData.append('name', clubName);
    formData.append('logo', logo);
    formData.append('description', description);

    try {
      // axios를 이용한 POST 요청
      const response = await axios.post('/admin/club/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('동아리가 성공적으로 추가되었습니다!');
    } catch (error) {
      console.error('동아리 추가에 실패했습니다.', error);
      alert('동아리 추가에 실패했습니다.');
    }
  };

  return (
<>
  <AdminNav/>
  <div className='mt-20 p-5'>
    <div className='text-3xl pb-4'>동아리 추가</div>
    <div className="w-full mt-2 border border-black"></div>
    <form onSubmit={handleSubmit} className="space-y-4 p-3">
      <div className="flex items-center space-x-3">
        <label htmlFor="clubName" className="block text-sm font-bold textFont flex-shrink-0">
          동아리명
        </label>
        <input
          type="text"
          name="clubName"
          id="clubName"
          required
          value={clubName}
          onChange={handleClubNameChange}
          className="mt-1 block flex-grow border border-black rounded-lg"
        />
      </div>
  <div className="flex items-center space-x-3">
    <label htmlFor="logo" className="block text-sm font-bold flex-shrink-0">
      동아리 로고
    </label>
    <div className="flex items-center">
      <input
        type="file"
        name="logo"
        id="logo"
        onChange={handleLogoChange}
        className='hidden'
      />
      {/* 사용자 정의 파일 선택 버튼 */}
      <label htmlFor="logo" className="cursor-pointer bg-zinc-300 py-2 px-2 text-sm border rounded-xl text-xs font-black" >
        파일 선택
      </label>
    </div>
  </div>
      <div>
        <label htmlFor="description" className="block text-sm font-bold textFont mb-2">
          동아리 설명
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows="4"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-1 block w-full resize-none border border-black"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-5 py-1 bg-zinc-300 rounded-lg font-bold textFont">
          확인
        </button>
      </div>
    </form>
    <div className="w-full mt-2 border border-black"></div>
  </div>
</>
  );
};