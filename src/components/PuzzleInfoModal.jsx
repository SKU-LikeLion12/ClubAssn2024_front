import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

function PuzzleInfoModal({setModalOpen}) {
    const closeModal =()=>{
        setModalOpen(false);
    };
  return (
    <div className='absolute z-50 top-0 bottom-0 inset-0'>
      <div className='relative flex justify-center items-center border-4 border-[#476832] rounded-2xl p-5 text-center bg-[#FCFFE3]'>
        <div className='inset-0'>
          <div className='flex justify-end items-start'>
            <button onClick={closeModal}><IoCloseSharp size="25" color="#476832" /></button>
         </div>
         <div className='my-10 mb-12'>
          <p className='text-xl mb-8'>퍼즐 조각 모으기란?</p>
          <p>동아리연합회에서 주관하는 행사들에 참여하여 
            퍼즐 조각을 모아보아요! <br/> 퍼즐을 완성시킨다면 
            큰 상품이 기다릴지도...?</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PuzzleInfoModal;