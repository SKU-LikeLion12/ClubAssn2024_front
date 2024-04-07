import React from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';

const ManagePuzzle = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>퍼즐 조각 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addPuzzle')}>추가</button>
    </div>

    <div className='flex w-10/12 mx-auto border-y py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex flex-col grow gap-1'>
          <div>
            <label htmlFor="name">행사명 :  </label>
            <span className='ml-3'>ㅎㅇ</span>
          </div>
          <div>
            <label htmlFor="count">날짜 : </label>
            <span className='ml-3'>ㅎㅇ</span>
          </div>
        </div>
        {/* <button onClick={() => handleEditNavigate(item.id, item.name, item.count)} className='text-[#898989]'>수정</button> */}
        <button className='text-[#898989]'>수정</button>
      </div>
  </div>
  );
};

export default ManagePuzzle;