import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../../api/API';

const Addmemberpuzzle = () => {
  const location = useLocation();
  const studentId = location.state.studentId;
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  // 선택된 행사의 ID들을 저장할 상태 변수를 배열로 선언합니다.
  const [selectedEventIds, setSelectedEventIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API().get('/admin/join-events', {
          params: { studentId: studentId }
        });
        if (response.status === 200) {
          setEvents(response.data);
          console.log('GET 요청이 성공했습니다.');
        } else {
          console.error('GET 요청이 실패했습니다.');
        }
      } catch (error) {
        const statusCode = error.response.status;
        if (error.response) {
          console.error("서버 응답 에러:", error.response.data);
        } else if (error.request) {
          console.error("응답 받지 못함:", error.request);
        } else if (statusCode === 401) {
          localStorage.clear();
          navigate('/admin/adminLogin')
        }
      }
    };
    fetchData();
  }, [studentId]);

  // 체크박스 선택 변경 핸들러
  const handleSelectChange = (eventId) => {
    setSelectedEventIds(prev => {
      if (prev.includes(eventId)) {
        // 이미 선택된 경우, 제거
        return prev.filter(id => id !== eventId);
      } else {
        // 선택되지 않은 경우, 추가
        return [...prev, eventId];
      }
    });
  };

  // "확인" 버튼 클릭 시 실행될 함수
  const handleSubmit = async () => {
    try {
      // 선택된 모든 행사 ID에 대해 POST 요청을 보냅니다.
      for (const eventId of selectedEventIds) {
        const response = await API().post('/admin/join-events/add', {
          studentId: studentId,
          id: eventId
        });
        if (response.status !== 200) {
          console.error('POST 요청이 실패했습니다.');
          return; // 실패 시 반복 중단
        }
      }
      console.log('모든 POST 요청이 성공했습니다.');
      // 모든 요청이 성공하면, 필요한 경우 여기에 추가 동작을 구현할 수 있습니다.
      navigate('/admin/adminMain/ClubMemberManagement'); // 여기에 페이지 이동 코드 추가
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4 font-bold'>동아리원 퍼즐 조각 추가</div>
        <div className="w-full mt-10 border border-black"></div>
        {events.map((event) => (
          <div key={event.id} className="mt-6 ml-8 flex items-center">
            <input
              type="checkbox"
              name="selectedEvent"
              value={event.id}
              checked={selectedEventIds.includes(event.id)} // 체크박스가 선택됐는지 여부
              onChange={() => handleSelectChange(event.id)} // 선택 상태 변경 시 핸들러 호출
              className="mr-3"
            />
            <div className="mr-5 font-bold">퍼즐ID : </div>
            <div className='font-bold'>{event.id}</div>
            <div className="mr-5 font-bold ml-8">행사명 : </div>
            <div className='font-bold'>{event.name}</div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit} className="btn bg-zinc-300 rounded-md w-16 font-bold text-m py-2 mt-5">확인</button>
        </div>
      </div>
    </>
  );
};

export default Addmemberpuzzle;
