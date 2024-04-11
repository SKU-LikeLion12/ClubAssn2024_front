import React from 'react'

function ReservationCancelModal({modalOpen, setModalOpen, onCancel}) {
  const closeModal =()=>{
    setModalOpen(false);
  };

return (
  <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-20'>
    <div>
      <div className='flex justify-center items-center textFont border-2 border-[#12172B] rounded-xl bg-white w-[300px] mx-auto'>
        <div className='p-10 my-aut0'>
          <div className='aboutEB text-[#12172B] mb-8'>
            <p className='text-lg'>예약을 취소하시겠습니까?</p>
          </div>
          <div className="flex justify-evenly w-full mx-auto">
          <button
            className='text-center bg-[#12172b] text-white py-2 px-4 mx-1 text-[14px] rounded-md w-full'
            onClick={() => {
              onCancel();
              setModalOpen(false);
            }}>
            예약 취소
          </button>
            <button className='text-center bg-gray-200 py-2 px-4 mx-1 text-[14px] rounded-md w-full' onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default ReservationCancelModal;
