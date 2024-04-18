import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/admin.css';
import { useLogin } from '../../context/LoginContext';

const AdminMain = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center mt-6'>
      <div className="Nav bg-[#12172B] fixed top-0 w-full backdrop-blur-sm h-[70px] text-center text-white text-2xl py-5">관리자 페이지</div>
      <div className='flex flex-col my-16'>
        <Link to='/'><div className='adminMainBtn textSkyBlue'>PUZZLE HOME</div></Link>
        <Link to='ItemReservationStatus'><div className='adminMainBtn textDeepBlue'>물품 예약 현황</div></Link>
        <Link to='ItemRentalStatus'><div className='adminMainBtn textSkyBlue'>물품 대여 현황</div></Link>
        <Link to='RentalItemManagement'><div className='adminMainBtn textDeepBlue'>대여 물품 관리</div></Link>
        <Link to='PuzzlePieceManagement'><div className='adminMainBtn textSkyBlue'>퍼즐 조각 관리</div></Link>
        <Link to='ClubMemberManagement'><div className='adminMainBtn textDeepBlue'>동아리원 관리</div></Link>
        <Link to='ClubManagement'><div className='adminMainBtn textSkyBlue'>동아리 관리</div></Link>
      </div>
    </div>
  );
};

export default AdminMain;