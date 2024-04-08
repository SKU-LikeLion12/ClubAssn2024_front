import React from "react";
import AdminNav from "../../../components/AdminNav";
import { useLocation } from 'react-router-dom';

const ClubmemberPuzzle = () => { // 동아리원 퍼즐 조각 관리 수정됨
  const location = useLocation();
  const { studentName, studentId, clubName } = location.state || {}; // `location.state`가 undefined인 경우를 대비해 기본값 설정

  return (
    <>
      <AdminNav/>
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4'>동아리원 퍼즐 조각 관리</div>
        <div className="w-full mt-2 border border-black"></div>
        <p className="text-center">이름: {studentName}</p> 
        <p className="text-center">학번: {studentId}</p> 
        <p className="text-center">소속 동아리: {clubName}</p> 
      </div>
    </>
  )
};

export default ClubmemberPuzzle;