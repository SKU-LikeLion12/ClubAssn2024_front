import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import { MdModeEditOutline } from "react-icons/md";

const Club = () => {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/club/all');
      const items = result.data;
      setGetItems(items);
      setLoading(false); 
    } catch (error) {
      console.error(error)
      setLoading(false); 
    }
  }
  useEffect(()=> {
    handleGetItem();
  },[])

  const handleEditNavigate = (itemId, itemName, itemDescription, itemLogo) => { 
    navigate('editClub', { state: { id: itemId, name: itemName, description: itemDescription, logo: itemLogo } });
  };

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b border-[#12172b]'>
      <div className='text-3xl'>동아리 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addclub')}>추가</button>
    </div>

    {loading ? ( 
      <div className='w-10/12 mx-auto text-gray-400 mt-3'>데이터를 불러오는 중입니다...</div>
    ) : getItems.map((item)=> {
      return (
      <div key={item.id} className='flex w-10/12 mx-auto border-b py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex items-center justify-center gap-3'>
          <img src={`data:image/jpeg;base64, ${item.logo}`} alt="동아리 로고" className='w-2/12'/>
          <div className='flex flex-col grow gap-1'>
            <div>
              <label htmlFor="name">동아리명 :  </label>
              <span className='ml-2'>{item.name}</span> 
            </div>
            <div className='text-xs'>
              <label htmlFor="count">동아리 설명 : </label>
              <span className='ml-2'>{item.description}</span>
            </div>
          </div>
        </div>
        <button onClick={() => handleEditNavigate(item.id, item.name, item.description, item.logo)} className='text-[#898989]'><MdModeEditOutline size={20}/></button>
      </div>
      )
    })}
  </div>
  );
};

export default Club;