import React from 'react'

function AdminModal({setModalOpen}) {
    const closeModal =()=>{
      setModalOpen(false);
    };

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-20'>
        <div className=''>
            <div className='flex justify-center items-center textFont border-2 border-[#12172B] rounded-xl mx-8 bg-white'>
                <div className='p-5'>
                    <div className='flex justify-end ml-4 mb-12'>
                        <button onClick={closeModal}>
                            <svg width="19" height="19" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M48.6935 49.9869C48.3601 49.9869 48.0268 49.8553 47.7704 49.5922L1.66782 2.27572C1.155 1.76269 1.155 0.907656 1.66782 0.394633C2.16782 -0.131544 3.00115 -0.131544 3.50115 0.394633L49.6165 47.7111C50.1294 48.2373 50.1294 49.0792 49.6165 49.6054C49.3601 49.8685 49.0268 50 48.6935 50V49.9869Z" fill="#12172B"/>
                                <path d="M1.30769 49.9869C0.974359 49.9869 0.641026 49.8553 0.384615 49.5922C-0.128205 49.066 -0.128205 48.2242 0.384615 47.698L46.5 0.394633C47.0128 -0.131544 47.8333 -0.131544 48.3461 0.394633C48.859 0.92081 48.859 1.76269 48.3461 2.28887L2.21795 49.5922C1.96154 49.8553 1.62821 49.9869 1.29487 49.9869H1.30769Z" fill="#12172B"/>
                            </svg>
                        </button>
                    </div>
                    <div className='aboutEB text-[#12172B] mb-16'>
                        <p>관리자만 로그인 할 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminModal;