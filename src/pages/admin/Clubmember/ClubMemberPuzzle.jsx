import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from "../../../api/API";

const ClubmemberPuzzle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentName, studentId, clubName } = location.state || {};

return (
  <>
    <AdminNav />
    <div className='mt-20 p-5'>
      <div className='text-3xl pb-4 font-bold'>동아리원 퍼즐 조각 관리</div>
      <div className="w-full mt-2 border border-black"></div>
      <div className="flex justify-end mt-2">
        <button
          className="w-20 h-8 bg-zinc-300 rounded-lg font-bold"
          onClick={() => navigate(-1)}
        >
          확인
        </button>
      </div>
      <div className="flex flex-col items-center justify-center pl-24">
        <div className="flex items-center font-bold w-full max-w-xs">
          <span>이름:</span>
          <span className="ml-4">{studentName}</span>
        </div>
        <div className="flex items-center mt-2 font-bold w-full max-w-xs">
          <span>학번:</span>
          <span className="ml-4">{studentId}</span>
        </div>
        <div className="flex items-center mt-2 font-bold w-full max-w-xs">
          <span>소속 동아리:</span>
          <span className="ml-4">{clubName}</span>
        </div>
      </div>
      <div className="w-full mt-4 border border-black"></div>
      <EventOfDate/>
    </div>
  </>
  );
};

export default ClubmemberPuzzle;


export const EventOfDate =  () => {
  const location = useLocation();
  const { studentName, studentId, clubName } = location.state || {};

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // 삭제할 이벤트 정보를 저장할 상태 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await API().post('/admin/join-events', { studentId });
        setEvents(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("axios를 사용하여 이벤트를 가져오는 중 오류:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteIconClick = (event) => {
    setSelectedEvent(event); // 삭제하려는 이벤트 정보를 상태에 저장
    setIsModalOpen(true); // 모달창 열기
  };

  const handleDeleteEvent = async () => {
    try {
      // 이벤트 삭제 요청을 보내면서, 'data' 속성에 필요한 정보를 포함시킵니다.
      const response = await API().delete('/admin/join-events', {
        data: {
          studentId: studentId, // 여기에서 studentId를 전달
          id: selectedEvent.id, // 추가: 삭제하려는 이벤트의 ID도 전달합니다.
        }
      });
  
      console.log("Deleted event:", response.data);
      // 삭제 후 이벤트 목록 갱신을 위해 삭제된 이벤트를 목록에서 제거합니다.
      setEvents(currentEvents => currentEvents.filter(event => event.id !== selectedEvent.id));
  
    } catch (error) {
      console.error("이벤트 삭제 중 오류 발생:", error);
    }
  
    // 모달창 닫기
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  
  const handleAddButtonClick = () => {
    navigate("AddmemberPuzzle",{ state: { studentId } }); 
  };

  return (
    <>
      {events.length > 0 ? (
        <>
          {events.map((event) => (
            <div key={event.id} className="mt-2">
              <div className="flex justify-between items-center">
                <div className="font-bold p-2">
                  행사명 <span className="ml-8 underline">{event.name}</span>
                </div>
                <img
                  src="../../../assets/images/trash_icon.png"
                  alt="삭제 아이콘"
                  className="w-6 cursor-pointer"
                  onClick={() => handleDeleteIconClick(event)}
                />
              </div>
              <div className="font-bold p-2">
                날짜 <span className="ml-11 underline">{new Date(event.addedTime).toLocaleDateString()}</span>
              </div>
              <div className="w-full mt-4 border border-black"></div>
            </div>
          ))}
        </>
      ) : (
        <div className="mt-2">등록된 행사가 없습니다.</div>
      )}
          <div className="flex justify-end mt-2">
          <button onClick={handleAddButtonClick} className="w-20 h-8 bg-zinc-300 rounded-lg font-bold">추가</button>
          </div>
      {isModalOpen && (
        <DeleteEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
};

export const DeleteEventModal = ({ isOpen, onClose, event, onDeleteEvent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded w-[360px] h-1/3 relative flex flex-col items-center border-2 border-black rounded-lg">
      <button 
          className="absolute top-0 right-0 mt-2 mr-2 text-4xl font-light text-gray-700 hover:text-gray-900" 
          onClick={onClose}
        >
          &times;
        </button>
        <div className='mt-5'>
        <p className="text-center font-bold">행사명 : {event.name}</p>
        <p className="text-center font-bold">날짜 : {new Date(event.addedTime).toLocaleDateString()}</p>
        </div>
        <p className="text-center text-2xl font-bold mt-8">삭제하시겠습니까?</p>
        <div className="flex justify-center w-full mt-8">
          <button
            className="bg-white text-black h-7 w-24 rounded mx-2 border-2 border-black rounded-lg font-bold"
            onClick={() => onDeleteEvent(event.id)}
          >
            예
          </button>
          <button
            className="bg-white text-black h-7 w-24 rounded mx-2 border-2 border-black rounded-lg font-bold"
            onClick={onClose}
          >
            아니오
          </button>
          </div>
      </div>
    </div>
  );
};
