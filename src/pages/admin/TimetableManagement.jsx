import React from 'react';
import AdminNav from './../../components/AdminNav';

const TimetableManagement = () => {
  return (
    <>
      <AdminNav />
      <div className='min-h-screen'>
        <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b-2 border-[#12172B]'>
          <div className='text-3xl'>강의실 시간표 관리</div>
        </div>
        <div className="mt-16 text-center text-2xl text-gray-400">서비스 준비 중입니다...</div>
      </div>
    </>
  );
};

export default TimetableManagement;