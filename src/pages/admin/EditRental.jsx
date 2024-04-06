import React, { useState } from 'react';
import AdminNav from '../../components/AdminNav';
import { API } from '../../api/API';
import { useLocation, useNavigate } from 'react-router-dom';

const EditRental = () => {
  const location = useLocation();
  const { id, name, count } = location.state;
  const [addItemData, setAddItemData] = useState({
    itemId: id,
    name: name,
    count: count,
    image: null,
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setAddItemData({ ...addItemData, [name]: value });
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAddItemData({ ...addItemData, image: file });
  };

  const handleDeleteItem = async (id) => {
    try {
      const result = await API().delete(`/admin/item/${id}`, id)
      console.log(result);
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleEditItem = async () => {
    const formData = new FormData();
    formData.append('itemId', addItemData.itemId); // 이름 추가
    formData.append('name', addItemData.name); // 이름 추가
    formData.append('count', addItemData.count); // 수량 추가
    formData.append('image', addItemData.image); // 이미지 파일 추가
    try {
      const result = await API().put('/admin/item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen'>
    <AdminNav />
    <div className='mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-2'>
      <div className='text-3xl'>대여 물품 수정</div>
    </div>

    <div className='flex w-10/12 mx-auto py-3 px-1 gap-2 textFont mt-1 border-[#12172B] border-y'>
      <div className='w-full'>
        <div className='flex'>
          <div className='flex flex-col grow gap-1'>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="물품명">물품명</label>
              <input type="text" className='adminInput grow' name='name' value={addItemData.name} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="총 수량">총 수량  </label>
              <input type="text" className='adminInput grow' name='count' value={addItemData.count} onChange={handleChangeValue}/>
            </div>
            <div className='flex justify-between items-end mt-1'>
              <label className='w-3/12' htmlFor="사진">사진 </label>
              <input type="file" className='text-xs grow ml-5' name='image' onChange={handleFileChange}/>
            </div>
          </div>
          <button onClick={()=>{handleDeleteItem(id)}} className='text-[red] w-2/12 ml-2'>삭제</button>
        </div>
        <div className='flex justify-center'>
          <button type='submit' onClick={handleEditItem}
          className='py-1 px-5 bg-[#12172B] text-white rounded-xl mt-6'>수정하기</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditRental;