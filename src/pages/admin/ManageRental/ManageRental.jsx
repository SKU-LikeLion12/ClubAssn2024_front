import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { API } from '../../../api/API';

const ManageRental = () => {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState([]);

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/item/all')
      const items = result.data;
      setGetItems(items);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=> {
    handleGetItem();
  },[])

  const handleEditNavigate = (itemId, itemName, itemCount) => {
    navigate('editRental', { state: { id: itemId, name: itemName, count: itemCount } });
  };

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>물품 대여 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addRental')}>추가</button>
    </div>

    {getItems.map((item)=>{
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
        <button onClick={() => handleEditNavigate(item.id, item.name, item.count)} className='text-[#898989]'>수정</button>
      </div>
      )
    })}
  </div>
  );
};

export default ManageRental;