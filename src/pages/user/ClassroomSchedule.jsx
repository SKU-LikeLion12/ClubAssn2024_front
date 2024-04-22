import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Back from '../../components/shared/Back';
import { Outlet } from 'react-router-dom';
import classroomData from '../../utils/classroom.json';
import { images } from '../../utils/images';

const ClassroomSchedule = () => {
  const [building, setBuilding] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setBuildings(Object.keys(classroomData)); // 건물 목록 추출
  }, []);

  useEffect(() => {
    if (classroomData[building] && Array.isArray(classroomData[building].rooms)) {
      setRooms(classroomData[building].rooms);
    } else {
      setRooms([]);
    }
  }, [building]);

  const handleSearch = () => {
    if (classroomData[building] && classroomData[building].images[room]) {
      setImageSrc(classroomData[building].images[room]);
    } else {
      alert('건물과 강의실을 선택해주세요.');
      setImageSrc('');
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        <Back left={'LBP'} right={'RBP'} />
        {/* <div className='relative -z-20'>
          <img src={images.RBP} alt="오른쪽퍼즐" className='absolute right-0 w-1/2 mt-[200px]' />
          <img src={images.LBP} alt="왼쪽퍼즐" className='absolute left-0 w-1/2 mt-[400px]' />
        </div> */}
        <PageTitle title={'강의실'} title2={'시간표'} Tcolor={'#A3CDF6'} Tcolor2={'#6FA9E3'} />
        <div className="flex w-11/12 mx-auto justify-evenly font-bold ">
          <select
            name="building"
            id="building-select"
            className="bg-[#d3edf9] border-[3px] border-[#6fa9e3] text-[#6fa9e3] rounded-md px-4 py-1"
            value={building}
            onChange={e => setBuilding(e.target.value)}>
            <option value="">선택</option>
            {buildings.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            name="room"
            id="room-select"
            className="bg-[#d3edf9] border-[3px] border-[#6fa9e3] text-[#6fa9e3] rounded-md px-4 py-1"
            value={room}
            onChange={e => setRoom(e.target.value)}>
            <option value="">선택</option>
            {rooms.map(room => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="조회"
            className="bg-[#6fa9e3] text-[#d3edf9] px-4 rounded-md cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="강의실 시간표 사진"
            className="w-11/12 border-2 rounded-md border-[#6fa9e3] mx-auto my-8"
          />
        ) : (
          <div className="bg-white w-11/12 mx-auto h-[80vh] my-8 text-[#6fa9e3] border-2 rounded-md border-[#6fa9e3] text-center pt-20 text-xl">
            건물과 강의실 선택 후 <br />
            시간표를 조회해주세요.
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default ClassroomSchedule;
