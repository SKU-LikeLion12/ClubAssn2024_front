import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { images } from '../../../utils/images';
import { IoCloseSharp } from "react-icons/io5";

const RentalBook = () => {
  return (
    <>
      <PageTitle title='물품대여' Tcolor='#B79A5F' />
      <div className="textFont relative">
        <div className="flex justify-end">
          <img src={images.RYP} alt="오른쪽퍼즐" className='w-[140px]' />
        </div>
        <div>
          <img src={images.LYP} alt="왼쪽퍼즐" className='w-[140px]' />
        </div>
        <BookContent />
      </div>
    </>
  );
};

export default RentalBook;

export const BookContent = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  const moveRC = () => {
    if (!isChecked) {
      alert('체크박스를 체크해주세요.');
    } else {
      navigate("/rentalConfirm");
      console.log('페이지 이동 처리');
    }
  };
  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity - 1);
  };
  const [color, setColor] = useState('red');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    const isChecked = event.target.checked;

    setColor(isChecked ? '#ceb421' : 'red');
    setIsChecked(isChecked);
  };

  return (
    <>
      <div className="rentalBox absolute z-10 bg-[#FCF3CD] w-[90%] h-[80vh] rounded-3xl border-solid border-4 border-[#CEB341] top-0 left-0 right-0 bottom-0 mx-auto py-2 pr-2 pl-4 overflow-y-scroll">
          <div className='flex justify-end' onClick={onClickBtn}><IoCloseSharp size="25" color="#ceb421" /></div>
          <img className='w-4/12 mx-auto my-2' src={images.puzzle} alt="물품사진" />
          <div className='text-[20px] text-center font-bold'>기도 방석</div>
          <div className='my-3 w-5/12 flex justify-between mx-auto font-bold'>
            <button className='border-solid border-2 border-[#ceb421] rounded text-[#ceb421] w-[27px] bg-[#FFF0B3]' onClick={decreaseQuantity} disabled={quantity === 0}>-</button>
            <div className='pt-[2px]'>{quantity} 개</div>
            <button className='border-solid border-2 border-[#ceb421] rounded text-[#ceb421] w-[27px] bg-[#FFF0B3]' onClick={increaseQuantity}>+</button>
          </div>
          <div className='my-6'>
            <div className="text-[red] aboutEB text-[12px]">물품 대여 유의 사항 안내</div>
            <div className='text-[10px] aboutLight my-1'>
              - 물품 대여는 동아리원만 가능합니다. <br/>
              - 대여 및 반납은 동아리연합회 지킴이 시간에만 가능합니다. <br/>
              <div className="text-[8px]">
                * 지킴이 시간 (월요일~목요일: 10:00 ~ 17:30, 금요일: 10:00 ~ 15:00, 공휴일 제외) <br/>
              </div>
              - 예약 확정 후 안내되는 지킴이 운영 시간 안에 미대여 시 예약은 취소됩니다.<br/>
              - 대여 기간은 대여일 포함 7일입니다. (주말 및 공휴일 포함)<br/>
              - 대여 물품은 1인당 최대 3가지의 종류와 최대 5개의 물품만 대여 가능합니다.<br/>
              - 대여 물품은 1인당 최대 3가지의 종류와 최대 5개의 물품만 대여 가능합니다. <br/>
              - 연체 3회 및 미반남 1회 시 물품 대여가 제한됩니다.<br/>
              <div className="text-[8px]">
                * 연체: 반납일 기준으로 7일 이내 반납 / 미반납: 반납일 기준으로 7일 이후 반납
              </div>
              <div className="my-4 text-center">
                유의 사항을 숙지하여 주시고, <br />
                위반 시 대여자에게 불이익이 주어질 수 있습니다. <br />
                이에 따른 책임은 대여자에게 있습니다.
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-center'>
              <div style={{ color: color }}>* 물품 대여 유의 사항을 확인했습니다.</div>
              <div className='mt-[3px]'>
                <input 
                  className='rentalCheckBox ml-2'
                  type="checkbox" 
                  onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className='text-center text-[#ceb421] text-xl font-bold my-4'>
            예약하시겠습니까?
          </div>
          <div className="flex justify-evenly mb-8">
            <button className='w-4/12 border-solid border-[3px] border-[#ceb421] rounded text-[#ceb421] bg-[#FFF0B3] font-bold' onClick={moveRC}>예</button>
            <button className='w-4/12 border-solid border-[3px] border-[#ceb421] rounded text-[#ceb421] bg-[#FFF0B3] font-bold' onClick={onClickBtn}>아니오</button>
          </div>
        </div>
    </>
  );
};