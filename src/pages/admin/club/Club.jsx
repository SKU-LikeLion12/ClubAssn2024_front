import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import { MdModeEditOutline } from "react-icons/md";

const Club = () => {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState([]);

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/club/all');
      const items = result.data;
      setGetItems(items);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=> {
    handleGetItem();
  },[])

  const handleEditNavigate = (itemName, itemDescription, itemLogo) => { 
    navigate('editClub', { state: { name: itemName, description: itemDescription, logo: itemLogo } });
  };

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6'>
      <div className='text-3xl'>동아리 관리</div>
      <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addclub')}>추가</button>
    </div>

    {getItems.map((item)=>{
      return (
      <div key={item.id} className='flex w-10/12 mx-auto border-y py-3 px-1 gap-2 border-[#12172B]'>
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
        {/* 파라미터에 로고 추가 1 */}
        <button onClick={() => handleEditNavigate(item.name, item.description, item.logo)} className='text-[#898989]'><MdModeEditOutline size={20}/></button>
      </div>
      )
    })}
  </div>
  );
};

export default Club;