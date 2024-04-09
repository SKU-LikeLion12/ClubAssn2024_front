import React, { useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../api/API';

const Addmemberpuzzle = () => {
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('date', formData.date);
    data.append('image', formData.image);

    try {
      const response = await API().post('/admin/events/add', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('성공적으로 제출되었습니다.');
      } else {
        alert('제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <AdminNav />
      <div className='mt-20 p-5'>
        <div className='text-3xl pb-4 font-bold'>동아리원 퍼즐 조각 추가</div>
        <div className="w-full mt-10 border border-black"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center mt-6 ml-8">
            <div className="mr-5 font-bold">행사명</div>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              required
              className="flex-1 border-0 border-b border-black focus:ring-0" 
            />
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-5 font-bold ml-8">날짜</div>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              value={formData.date}
              required
              className="input flex-1  border-0 border-b border-black focus:ring-0"
            />
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-5 font-bold ml-8">사진</div>
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                hidden
                id="file-input"
                className="input"
              />
              <label htmlFor="file-input" className="btn bg-zinc-300 rounded-full px-2 py-2 cursor-pointer text-sm font-bold">
                파일 선택
              </label>
              {fileName && <span className="ml-2">{fileName}</span>}
            </div>
          <div className="w-full mt-10 border border-black"></div>
          <div className="flex justify-end">
          <button type="submit" className="btn bg-zinc-300 rounded-md w-16 font-bold text-m py-2">확인</button>
        </div>
        </form>
      </div>
    </>
  );
};

export default Addmemberpuzzle;