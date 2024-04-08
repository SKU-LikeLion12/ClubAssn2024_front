import React, { useEffect, useState } from 'react';
import { API } from '../../api/API';
import AdminNav from '../../components/AdminNav';

// const initialData  = {
//   "results":[
//     {
//       name : "신민서",
//       numberId : "20220994",
//       group : "멋사12기",
//       product : "기도방석",
//       count : "2개",
//       dueDate : "24/04/03",
//       overDue : "2번"
//     },
//     {
//       name : "노승희",
//       numberId : "20220994",
//       group : "멋사12기",
//       product : "기도방석",
//       count : "2개",
//       dueDate : "24/04/03",
//       overDue : "2번"
//     }
//   ]
// }
const ItemRentalStatus = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        console.log(token);
        const config = {
          headers: {
            'Authorization': `${token}`
          }
        };
        const expirationTime = token.exp * 1000;
        const currentTime = new Date().getTime();

        if (currentTime >= expirationTime) {
          console.log('토큰이 만료되었습니다. 재로그인이 필요합니다.');
        } else {
          console.log('토큰이 유효합니다.');
        }
        const response = await API().get('/admin/item-rent/rent-list', config);
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('권한 없음. 관리자 토큰을 확인해주세요.');
        } else {
          console.error(error);
        }
        setError(error);
      }
    };
    fetchData();
  }, []);

  const hasData = data?.results?.length > 0;

  const handleReturn = async (itemRentId) => { //삭제 기능
    try {
      await API().delete(`/admin/item/${itemRentId}`); 
      const newData = { ...data };
      newData.results = newData.results.filter(item => item.id !== itemRentId);
      setData(newData);
    } catch (error) { 
      console.error(error);
    }
  };
  return (
    <div>
      <AdminNav />
      <div className='mt-32 mx-8'>
        <div className='title mb-4'>
          <p className='text-2xl'>물품 대여 현황</p>
        </div>
        <div className='bg-gray-500 w-full h-[2px] rounded-xl' />
        <div className='mt-4 mx-1'>
          {error ? (
            <p className='text-gray-400'>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
          ) : data === null ? (
            <p className='text-gray-400'>데이터를 불러오는 중입니다...</p>
          ) : hasData ? (
            <div>
              {data.results.map((result) => (
                <div key={result.itemRentId} className="mt-4">
                  <p>이름 : {result.name}</p>
                  <p>학번 : {result.studentId}</p>
                  <p>소속 동아리 : {result.iconClub}</p>
                  <p>대여 물품 : {result.itemName}</p>
                  <p>수량 : {result.count}</p>
                  <p>물품 수령 시간 : {result.rentTime}</p>
                  <p>현재 상태 : {result.status}</p>
                  <div className='flex justify-end'>
                    <button className='bg-gray-200 p-1 px-3 rounded-lg' onClick={() => handleReturn(result.itemRentId)}>반납완료</button>
                  </div>
                  <div className='bg-gray-500 w-full h-[2px] rounded-xl mt-5' />
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-400'>대여 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemRentalStatus;