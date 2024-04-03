import React, { useState } from 'react';

const initialData  = {
  "results":[
    {
      name : "신민서",
      numberId : "20220994",
      group : "멋사12기",
      product : "기도방석",
      count : "2개",
      dueDate : "24/04/03",
      overDue : "2번"
    },
    {
      name : "노승희",
      numberId : "20220994",
      group : "멋사12기",
      product : "기도방석",
      count : "2개",
      dueDate : "24/04/03",
      overDue : "2번"
    }
  ]
}
const ItemRentalStatus = () => {
  const [data, setData] = useState(initialData);

  const handleReturn = (index) => {
    const newData = {...data};
    newData.results.splice(index, 1);
    setData(newData);
  };
  const hasData = data.results.length > 0;
  
  return (
    <div className='mt-20 mx-8'>
      <div className='title mb-4'>
      <p className='text-2xl'>물품 대여 현황</p>
      </div>
      <div className='bg-gray-500 w-full h-[2px] rounded-xl'/>
      <div className='mt-4 mx-1'>
      {hasData ? ( 
          <div>
            {data.results.map((result, index) => (
              <div key={index} className="mt-4">
                <p>이름 : {result.name}</p>
                <p>학번 : {result.numberId}</p>
                <p>소속 동아리 : {result.group}</p>
                <p>대여 물품 : {result.product}</p>
                <p>수량 : {result.count}</p>
                <p>반납일 : {result.dueDate}</p>
                <p>연체 횟수 : {result.overDue}</p>
                <div className='flex justify-end'>
                  <button className='bg-gray-200 p-1 px-3 rounded-lg' onClick={() => handleReturn(index)}>반납완료</button>
                </div>
                <div className='bg-gray-500 w-full h-[2px] rounded-xl mt-5'/>
              </div>
            ))}
          </div>
        ) : ( 
          <p className='text-gray-400'>대여 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ItemRentalStatus;