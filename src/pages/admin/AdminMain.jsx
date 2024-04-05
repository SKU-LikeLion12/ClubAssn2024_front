import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/admin.css';

const AdminMain = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center mt-6'>
      <Link to='ItemReservationStatus'><div className='adminMainBtn textDeepBlue'>물품 예약 현황</div></Link>
      <Link to='ItemRentalStatus'><div className='adminMainBtn textSkyBlue'>물품 대여 현황</div></Link>
      <Link to='RentalItemManagement'><div className='adminMainBtn textDeepBlue'>예약 물품 관리</div></Link>
      <Link to='PuzzlePieceManagement'><div className='adminMainBtn textSkyBlue'>퍼즐 조각 관리</div></Link>
      <Link to='ClubMemberManagement'><div className='adminMainBtn textDeepBlue'>동아리원 관리</div></Link>
      <Link to='ClubManagement'><div className='adminMainBtn textSkyBlue'>동아리 관리</div></Link>
      <Link to='TimetableManagement'><div className='adminMainBtn textDeepBlue'>시간표 관리</div></Link>
    </div>
  );
};

export default AdminMain;