import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { images } from '../../../utils/images';
import MyInfo from '../../../components/shared/MyInfo';
import { API } from '../../../api/API';

const Rental = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();
  
  const fetchItems = async () => {
    try {
      const response = await API().get('/item-rent/list');
      const updatedItems = response.data.map(item => ({
        ...item,
        image: `data:image/jpeg;base64,${item.image}`
      }));
      setItems(updatedItems); 
    } catch (error) {
      console.error('물품 목록을 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [location.state]); 

  return (
    <>
      <PageTitle title='물품대여' Tcolor='#B79A5F' />
      <MyInfo />
      <div className="relative min-h-screen">
        <div className="flex justify-end">
          <img src={images.RYP} alt="오른쪽퍼즐" className='w-[140px]' />
        </div>
        <div>
          <img src={images.LYP} alt="왼쪽퍼즐" className='w-[140px]' />
        </div>
        <div className="rentalBox mt-8 absolute z-1 bg-[#FCF3CD] w-[80%] h-[80vh] rounded-3xl border-solid border-4 border-[#CEB341] top-0 left-0 right-0 bottom-0 mx-auto py-5 pl-2 overflow-y-scroll">
          <div className="w-full grid grid-cols-2 my-4">
            {items.map((item) => (
              <Article key={item.id} article={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );  
};

export default Rental;

export const Article = ({ article }) => {
  return (
    <div className='textFont font-black px-4 my-4'>
      <div className='mx-auto my-auto w-9/12'>
        <img className='my-2 h-[90px] mx-auto object-cover border-[3px] border-[#ceb341] rounded-md' src={article.image} alt="물품사진" />
      </div>
      <div className="text-center text-[18px] mb-2">{article.name}</div>
      <div className='w-10/12 mx-auto'>
        <div className='flex justify-between'>
          <div>총 수량 :</div>
          <div>{article.count}</div>
        </div>
        <div className="flex justify-between">
          <div>대여중 :</div>
          <div>{article.rentingCount}</div>
        </div>
        <div className="flex justify-between">
          <div>예약중 :</div>
          <div>{article.bookingCount}</div>
        </div>
      </div>
      <Link to={`/user/rentalBook?image=${encodeURIComponent(article.image)}&name=${encodeURIComponent(article.name)}&itemId=${article.id}`}>
        <div className='text-center text-white bg-[#ceb341] mt-2 mx-4 rounded py-1'>
          예약하기
        </div>
      </Link>
    </div>
  );
};