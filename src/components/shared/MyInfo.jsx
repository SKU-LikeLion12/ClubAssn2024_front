import React from 'react';
import { images } from '../../utils/images';

const MyInfo = () => {
  return (
    <div className='flex justify-around items-center w-9/12 mx-auto m-5 p-2 bg-[#FFF] rounded-xl border-[2px] border-[#AB7A67] text-[#AB7A67]'>
      <img src={images.likelion} alt="동아리 로고" className='w-2/12' />
      <div className='flex flex-col text-center'>
        <select name="" id="" className='text-center text-sm'>
          <option value="성결대학교 멋쟁이사자처럼">성결대학교 멋쟁이사자처럼</option>
          <option value="세인트">세인트</option>
          <option value="애드마인">애드마인</option>
          <option value="라라라">라라라</option>
        </select>
        <div className='text-xl mt-1'>홍길동</div>
      </div>
    </div>
  );
};

export default MyInfo;