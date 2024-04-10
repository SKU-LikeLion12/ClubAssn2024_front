import React, { useEffect, useState } from 'react';
import AdminNav from './../../components/AdminNav';
import { API } from '../../api/API';

const ItemReservationStatus = () => {
  const [reserveStatus, setReserveStatus] = useState([]);
  const fetchReserveStatus = async () => {
    try {
      const response = await API().get('/admin/item-rent/book-list');
      if (response.status === 200) {
        setReserveStatus(response.data); 
      }
    } catch (error) {
      console.error('예약 현황 로드 실패', error);
    }
  };
  
  useEffect(() => {
    fetchReserveStatus();
  }, []);

  const handleReceiveSuccess = (itemRentId) => {
    // 성공적으로 수령 처리된 예약 정보를 상태에서 제거
    setReserveStatus(currentStatus => currentStatus.filter(reservation => reservation.itemRentId !== itemRentId));
  };
  const handleCancelSuccess = (itemRentId) => {
    // 성공적으로 예약 취소 처리된 예약 정보를 상태에서 제거
    setReserveStatus(currentStatus => currentStatus.filter(reservation => reservation.itemRentId !== itemRentId));
  };

  return (
    <>
      <AdminNav />
      <div className='min-h-screen'>
        <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b-2 border-[#12172B]'>
          <div className='text-3xl'>물품 예약 현황</div>
        </div>
        {reserveStatus.length === 0 ? (
          <div className='text-gray-400 mx-auto w-10/12 mt-4'>예약 정보가 없습니다.</div>
        ) : (
          reserveStatus.map((reservation) => (
            <ReserveStatus 
              key={reservation.itemRentId} 
              reservationStatus={reservation}
              onReceiveSuccess={() => handleReceiveSuccess(reservation.itemRentId)}
              onCancelSuccess={() => handleCancelSuccess(reservation.itemRentId)} />
          ))
        )}
      </div>
    </>
  );
};

export default ItemReservationStatus;

export const ReserveStatus = ({reservationStatus, onReceiveSuccess, onCancelSuccess}) => {
  const formattedBookTime = new Date(reservationStatus.bookTime).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const handleReceiveClick = async () => {
    try {
      const body = { itemRentId: reservationStatus.itemRentId };
      const response = await API().post('/admin/item-rent', body);
      if (response.status === 200) {
        alert('수령완료 처리되었습니다.');
        onReceiveSuccess();
      }
    } catch (error) {
      console.error('수령 처리 실패', error);
      alert('수령 처리에 실패하였습니다.');
    }
  };

  const handleCancelClick = async () => {
    try {
      const body = { itemRentId: reservationStatus.itemRentId };
      const response = await API().delete('/admin/item-rent', { data: body });
      if (response.status === 200) {
        alert('예약이 취소되었습니다.');
        onCancelSuccess();
      }
    } catch (error) {
      console.error('예약 취소 처리 실패', error);
      alert('예약 취소 처리에 실패하였습니다.');
    }
  };

  return (
    <div className='w-full'>
      <div key={reservationStatus.id} className='w-10/12 mx-auto border-b border-[#000000]'>
        <div className='flex justify-between px-1'>
          <div className="my-4">
            <div>예약날짜 : {formattedBookTime}</div>
            <div>이름 : {reservationStatus.name}</div>
            <div>학번 : {reservationStatus.studentId}</div>
            <div>동아리 : {reservationStatus.iconClub}</div>
            <div>예약 물품 : {reservationStatus.itemName}</div>
            <div>수량 : {reservationStatus.count}</div>
          </div>
          <div className='flex text-xs items-end mb-4'>
            <div className='bg-[#12172B] text-[#ffffff] p-1 mx-1 rounded-md cursor-pointer ' onClick={handleReceiveClick}>
              수령 확인
            </div>
            <div className='bg-[#d9d9d9] p-1 mx-1 rounded-md cursor-pointer' onClick={handleCancelClick}>
              예약 취소
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
