import React from 'react';
import AdminNav from '../../../components/AdminNav';
import { useLocation, useNavigate } from 'react-router-dom';


const Addpuzzle = () => {
  return (
    <>
    <AdminNav />
    <div className='mt-20 p-5'>
      <div className='text-3xl pb-4 font-bold'>동아리원 퍼즐 조각 추가</div>
      <div className="w-full mt-2 border border-black"></div>
    </div>
    </>
  )
};

export default Addpuzzle;