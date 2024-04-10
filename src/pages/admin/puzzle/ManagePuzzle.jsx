import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';
import { MdModeEditOutline } from "react-icons/md";

const ManagePuzzle = () => {
  const navigate = useNavigate();
  const [getItems, setGetItems] = useState([]);
  const [maxEvent, setMaxEvent] = useState();

  const handleGetItem = async () => {
    try {
      const result = await API().get('/admin/events/all');
      const items = result.data;
      setGetItems(items);
      const MAX = items.length >= 4 ? true : false
      setMaxEvent(MAX);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    handleGetItem();
  },[])

  const handleEditNavigate = (itemId, itemName, itemDate) => { 
    // 데이터들을 가지고 수정 페이지로 넘어감
    navigate('editPuzzle', { state: { id: itemId, name: itemName, date: itemDate} }); 
  };

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b border-[#12172B]'>
      <div className='text-3xl'>퍼즐 조각 관리</div>
      {!maxEvent && <button className='bg-[#12172B] text-white py-1 px-4 rounded-xl' onClick={()=>navigate('addPuzzle')}>추가</button>}
    </div>

    {getItems.sort((a, b) => a.id - b.id).map((item)=>{
      return (
      <div key={item.id} className='flex justify-between w-10/12 mx-auto border-b py-3 px-1 gap-2 border-[#12172B]'>
        <div className='flex items-center justify-center gap-3'>
          <div className='flex flex-col grow gap-1'>
            <div>
              <label htmlFor="name">행사명 :  </label>
              <span className='ml-2'>{item.name}</span>
            </div>
            <div className=''>
              <label htmlFor="count">날짜 : </label>
              <span className='ml-2'>{item.date}</span>
            </div>
          </div>
        </div>
        <button onClick={() => handleEditNavigate(item.id, item.name, item.date)} className='text-[#898989]'><MdModeEditOutline size={20}/></button>
      </div>
      )
    })}
  </div>
  );
};

export default ManagePuzzle;