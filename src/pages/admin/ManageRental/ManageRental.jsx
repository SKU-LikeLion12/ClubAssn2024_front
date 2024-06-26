import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminNav';
import { API } from '../../../api/API';

const ManageRental = () => {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/item/all')
      const items = result.data;
      setGetItems(items);
      setLoading(false); 
    } catch (error) {
      console.error(error)
      setLoading(false);
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          localStorage.clear();
          navigate('/admin/adminLogin')
        }
      }
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
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b border-[#12172B]'>
      <div className='text-3xl'>물품 대여 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addRental')}>추가</button>
    </div>

    {loading ? ( 
      <div className='w-10/12 mx-auto text-gray-400'>데이터를 불러오는 중입니다...</div>
    ) : getItems.map((item)=>{
      return (
      <div key={item.id} className='flex w-10/12 mx-auto border-b py-3 px-1 gap-2 border-[#12172B]'>
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