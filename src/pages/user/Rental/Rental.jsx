import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { images } from '../../../utils/images';
import articles from '../../../utils/article';

const Rental = () => {
  const articleIds = Array.from({ length: 19 }, (_, i) => i + 1);

  return (
    <>
      <PageTitle title='물품대여' Tcolor='#B79A5F' />
      <div className="relative">
        <div className="flex justify-end">
          <img src={images.RYP} alt="오른쪽퍼즐" className='w-[140px]' />
        </div>
        <div>
          <img src={images.LYP} alt="왼쪽퍼즐" className='w-[140px]' />
        </div>
        <div className="rentalBox absolute z-10 bg-[#FCF3CD] w-[90%] h-[80vh] rounded-3xl border-solid border-4 border-[#CEB341] top-0 left-0 right-0 bottom-0 mx-auto py-5 pr-2 pl-4 overflow-y-scroll">
          <div className="w-full grid grid-cols-2 my-4">
            {articleIds.map((id) => (
              <Article key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );  
};

export default Rental;


export const Article = ({id}) => {
  return(
    <div>
      {articles.map(article => (
        (article.id === id) && (
          <div className='textFont font-black px-4 my-4' key={article.id}>
            <img className='mx-auto my-2 w-9/12' src={article.image} alt="물품사진" />
            <div className="text-center text-[18px] mb-2">{article.name}</div>
            <div className='w-10/12 mx-auto'>
              <div className='flex justify-between'>
                <div>총 수량 :</div>
                <div>{article.total}</div>
              </div>
              <div className="flex justify-between">
                <div>대여중 :</div>
                <div>{article.renting}</div>
              </div>
              <div className="flex justify-between">
                <div>대여가능 :</div>
                <div>{article.available}</div>
              </div>
            </div>
            <Link to='/rentalBook'><div className='text-center text-white bg-[#ceb341] mt-2 mx-4 rounded py-1'>예약하기</div></Link>
          </div>
        )
      ))}
    </div>
  );
};