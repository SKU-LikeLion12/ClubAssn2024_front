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


export const EventOfDate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = location.state || {};

  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API().post('/admin/join-events', { studentId });
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("axios를 사용하여 이벤트를 가져오는 중 오류:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteIconClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await API().delete('/admin/join-events', {
        data: {
          studentId: studentId,
          id: selectedEvent.id,
        },
      });

      console.log("Deleted event:", response.data);
      setEvents(currentEvents => currentEvents.filter(event => event.id !== selectedEvent.id));
    } catch (error) {
      console.error("이벤트 삭제 중 오류 발생:", error);
    }

    setIsModalOpen(false);
  };

  const handleAddButtonClick = () => {
    navigate("AddmemberPuzzle", { state: { studentId } });
  };

  // 행사가 4개 이상일 때는 추가 버튼을 숨기기 위한 조건을 추가
  const shouldShowAddButton = events.length < 4;

  return (
    <>
      {events.length > 0 ? (
        events.map((event) => (
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
        ))
      ) : (
        <div className="mt-2">등록된 행사가 없습니다.</div>
      )}
      {/* 행사가 4개 미만일 경우에만 "추가" 버튼 표시 */}
      {shouldShowAddButton && (
        <div className="flex justify-end mt-2">
          <button onClick={handleAddButtonClick} className="w-20 h-8 bg-zinc-300 rounded-lg font-bold">추가</button>
        </div>
      )}
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
            className="text-white bg-[#12172b] py-1 mx-2 rounded-xl w-4/12"
            onClick={() => onDeleteEvent(event.id)}
          >
            예
          </button>
          <button
            className="bg-gray-200 py-1 mx-2 rounded-xl w-4/12"
            onClick={onClose}
          >
            아니오
          </button>
          </div>
      </div>
    </div>
  );
};
