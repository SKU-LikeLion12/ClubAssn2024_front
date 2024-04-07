import React from 'react';
import AdminNav from '../../components/AdminNav';

const ManagePuzzle = () => {
  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>퍼즐 조각 관리</div>
      {/* <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addRental')}>추가</button> */}
    </div>
  </div>
  );
};

export default ManagePuzzle;