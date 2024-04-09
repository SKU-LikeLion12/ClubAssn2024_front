import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { images } from '../../../utils/images';
import { IoCloseSharp } from "react-icons/io5";

const RentalBookFail = () => {
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
        <FailContent />
      </div> 
    </>
  );
};

export default RentalBookFail;

export const FailContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const onClickBtn = () => {
    navigate('/');
  };
  
  const errorMessage = location.state?.errorMessage || "알 수 없는 오류가 발생했습니다.";

  return (
    <>
      <div className="rentalBox flex flex-col absolute z-1 bg-[#FCF3CD] w-[90%] h-[60vh] rounded-3xl border-solid border-4 border-[#CEB341] top-0 left-0 right-0 bottom-0 mx-auto py-2 pr-2 pl-4 overflow-y-scroll">
        <div className='flex justify-end' onClick={onClickBtn}><IoCloseSharp size="25" color="#ceb421" /></div>
          <div className='text-center my-auto font-bold'>
            <div className='-mt-6'>
              {errorMessage}
            </div>
          </div>
      </div>
    </>
  );
};