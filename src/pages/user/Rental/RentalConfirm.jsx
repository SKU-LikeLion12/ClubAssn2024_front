import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { images } from '../../../utils/images';
import { IoCloseSharp } from "react-icons/io5";

const RentalConfirm = () => {
  return (
    <>
      <PageTitle title='물품대여' Tcolor='#B79A5F' />
      <div className="textFont relative min-h-screen">
        <div className="flex justify-end">
          <img src={images.RYP} alt="오른쪽퍼즐" className='w-[140px] -mt-12 relative -z-10' />
        </div>
        <div>
          <img src={images.LYP} alt="왼쪽퍼즐" className='w-[140px] -mt-16 relative -z-10' />
        </div>
        <ConfirmContent />
      </div> 
    </>
  );
};

export default RentalConfirm;

export const ConfirmContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, name } = location.state || { image: '', name: '' }; // 기본값 설정

  const onClickBtn = () => {
    navigate('/');
  };

  const [date, setDate] = useState('');

  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 7);

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const nextWeekDate = `${year}년 ${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일`;

    setDate(nextWeekDate);
  }, []);

  return (
    <>
      <div className="rentalBox absolute z-1 bg-[#FCF3CD] w-[90%] h-[60vh] rounded-3xl border-solid border-4 border-[#CEB341] top-0 left-0 right-0 bottom-0 mx-auto py-2 pr-2 pl-4 overflow-y-scroll">
        <div className='flex justify-end' onClick={onClickBtn}><IoCloseSharp size="25" color="#ceb421" /></div>
          <img className='w-4/12 mx-auto mt-8 mb-4 object-cover border-4 border-[#ceb341] rounded-md' src={image} alt="물품사진" />
          <div className='text-[20px] text-center font-bold'>{name}</div>
          <div className='text-[#ceb421] my-8 text-center font-bold'>
            <div className='text-xl my-8'>예약이 확정되었습니다!</div>
            <div>
              {date}까지 <br />
              동아리연합회실로 방문해주세요.
            </div>
          </div>
      </div>
    </>
  )
}