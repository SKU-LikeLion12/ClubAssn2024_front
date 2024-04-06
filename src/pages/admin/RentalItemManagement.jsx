import React from 'react';
import AdminNav from '../../components/AdminNav';

const RentalItemManagement = () => {
  // 관리자가 대여 물품 추가 /admin/item
  const handleAddItem = () => {
    console.log('아직~')
  }

  return (
    <div className='min-h-screen'>
      <AdminNav />
      <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
        <div className='text-3xl'>물품 대여 관리</div>
        <button className='bg-[#d9d9d9] py-1 px-4 rounded-xl'
          onClick={handleAddItem}>추가</button>
      </div>

      <div className='flex w-10/12 mx-auto border-y py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex flex-col grow gap-1'>
          <div>
            <label htmlFor="물품명">물품명 :  </label>
            <input type="text" className='adminInput'/>
          </div>
          <div>
            <label htmlFor="총 수량">총 수량 : </label>
            <input type="text" className='adminInput'/>
          </div>
        </div>
        <div className='text-[#898989]'>수정</div>
      </div>
    </div>
  );
};

export default RentalItemManagement;