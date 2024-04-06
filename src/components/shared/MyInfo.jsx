import React, { useEffect } from 'react';
import { images } from '../../utils/images';
import { useLocation } from 'react-router';
import { API } from '../../api/API';

const MyInfo = () => {
    const location = useLocation();
    const currentPath = location.pathname; // 현재 경로
    const myPageColor = 'bg-[#FFF] border-[#AB7A67] text-[#AB7A67]'; // myPage 색상 
    const CollectingPuzzleColor = 'bg-[#FCFFE3] border-[#476832] text-[#476832]'; // 퍼즐조각 모으기 색상
    const RentalColor = 'bg-[#FCF3CD] border-[#CEB341] text-[#CEB341]'; // 대여사업 페이지 색상

    // 현재 경로에 맞는 색상 활성화
    const ActiveColor = currentPath === '/user/myPage' ? myPageColor : currentPath === '/user/collectingpuzzle' ? CollectingPuzzleColor : RentalColor

    // const getMyInfo = async () => {
    //   try {
    //     const result = await API().get('/mypage');
    //     console.log(result)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    // useEffect(()=> {
    //   getMyInfo()
    // },[])

  return (
    <div className={`flex justify-around items-center w-9/12 mx-auto mb-3 p-2 rounded-xl border-[2px] ${ActiveColor}`}>
      <img src={images.likelion} alt="동아리 로고" className='w-2/12' />
      <div className='flex flex-col text-center'>
        <select name="" id="" className={`text-center text-sm ${ActiveColor}`}>
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