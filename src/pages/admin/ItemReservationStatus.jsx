import React from 'react';
import AdminNav from './../../components/AdminNav';
import reserveStatus from '../../utils/reservationStatus.json';

const ItemReservationStatus = () => {
  return (
    <>
      <AdminNav />
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4'>
          물품 예약 현황
        </div>
        <div className="bg-[#000000] h-0.5"></div>
        {reserveStatus.map((reservationStatus) => (
          <ReserveStatus key={reservationStatus.id} reservationStatus={reservationStatus} />
        ))}
      </div>
    </>
  );
};

export default ItemReservationStatus;

export const ReserveStatus = ({reservationStatus}) => {
  return (
    <div className='w-full'>
      <div key={reservationStatus.id}>
        <div className='flex justify-between'>
          <div className="my-4">
            <div>예약날짜 : {reservationStatus.reserveDate}</div>
            <div>이름 : {reservationStatus.name}</div>
            <div>학번 : {reservationStatus.number}</div>
            <div>소속 동아리 : {reservationStatus.club}</div>
            <div>예약 물품 : {reservationStatus.reserveItem}</div>
            <div>수량 : {reservationStatus.quantity}</div>
          </div>
          <div className='flex text-xs items-end mb-4'>
            <div className='bg-[#d9d9d9] p-1 mx-1 rounded-md cursor-pointer'>
              수령 확인
            </div>
            <div className='bg-[#d9d9d9] p-1 mx-1 rounded-md cursor-pointer'>
              예약 취소
            </div>
          </div>
        </div>
        <div className="bg-[#000000] h-0.5"></div>
      </div>
    </div>
  )
}
