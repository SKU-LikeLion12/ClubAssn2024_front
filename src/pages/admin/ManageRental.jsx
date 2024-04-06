import React, { useEffect } from 'react';
import AdminNav from '../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/API';

const ManageRental = () => {
  const exGetItems = [
    {
      "id": 1,
      "name": "방석",
      "count": 14
    }, {
      "id": 2,
      "name": "방석2",
      "count": 14
    }
  ]
  const navigate = useNavigate();

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/item/all')
      const getItems = result.data;
      console.log(result);
      console.log(getItems);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    handleGetItem();
  },[])

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>물품 대여 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addRental')}>추가</button>
    </div>

    {exGetItems.map((item)=>{
      return (
      <div key={item.id} className='flex w-10/12 mx-auto border-y py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex flex-col grow gap-1'>
          <div>
            <label htmlFor="name">물품명 :  </label>
            <span className='ml-3'>{item.name}</span>
          </div>
          <div>
            <label htmlFor="count">총 수량 : </label>
            <span className='ml-3'>{item.count}</span>
          </div>
        </div>
        <button onClick={()=>navigate('editRental')} className='text-[#898989]'>수정</button>
      </div>
      )
    })}
  </div>
  );
};

export default ManageRental;