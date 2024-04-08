import React from 'react'

function PuzzleInfoModal({setModalOpen}) {
    const closeModal =()=>{
        setModalOpen(false);
    };
  return (
    <div className='absolute z-50 top-0 bottom-0 inset-0'>
      <div className='relative flex justify-center items-center border-4 border-[#476832] rounded-2xl p-5 text-center bg-[#FCFFE3]'>
        <div className='inset-0'>
          <div className='flex justify-end items-start'>
            <button onClick={closeModal}><svg width="20" height="20" viewBox="0 0 41 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.2022 44.5068C38.9338 44.5068 38.6655 44.3897 38.459 44.1555L1.34188 2.02623C0.929009 1.56945 0.929009 0.808151 1.34188 0.35137C1.74443 -0.117123 2.41535 -0.117123 2.8179 0.35137L39.9454 42.4806C40.3582 42.9491 40.3582 43.6987 39.9454 44.1672C39.7389 44.4014 39.4706 44.5186 39.2022 44.5186V44.5068Z" fill="#5C823B"/>
            <path d="M1.05282 44.5069C0.784456 44.5069 0.516089 44.3897 0.309654 44.1555C-0.103218 43.687 -0.103218 42.9374 0.309654 42.4689L37.4371 0.35137C37.85 -0.117123 38.5106 -0.117123 38.9235 0.35137C39.3363 0.819863 39.3363 1.56945 38.9235 2.03795L1.78567 44.1555C1.57923 44.3897 1.31087 44.5069 1.0425 44.5069H1.05282Z" fill="#5C823B"/>
          </svg></button>
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