import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import MyInfo from '../../components/shared/MyInfo';
import Back from '../../components/shared/Back';
import { images } from '../../utils/images';

const CollectingPuzzle = () => {
  const [code, setCode] = useState(''); // 코드번호 저장 변수
  
  const handleCode = () => {
    // 서버로 보내고
    setCode('') // input value 초기화
  }

  return (
    <div className='relative min-h-screen text-[#476832]'>
      <Back left={'leftGreen'} right={'rightGreen'} />
      <PageTitle title={'퍼즐 조각'} title2={'모으기'} Tcolor={'#476832'} Tcolor2={'#B7C58B'} />
      <MyInfo />
      <div className='text-center my-8'>퍼즐 조각을 모아 퍼즐을 완성해보세요!</div>

      <div className='relative w-9/12 h-[281.25px] mx-auto rounded-2xl bg-white border-1 border-[#476832] '>
        <img src={images.emptyPuzzle} alt="초기 빈 퍼즐" />
        {/* <img src={images.puzzle1} alt="" className='w-1/2 absolute top-0 left-0'/>
        <img src={images.puzzle2} alt="" className='w-1/2 absolute top-0 right-0'/>
        <img src={images.puzzle1} alt="" className='w-1/2 absolute top-0 left-0'/> */}
      </div>
      <div className='w-9/12 mx-auto text-center my-7'>
        <div className='mb-4'>코드를 입력해주세요.</div>
        <div className='relative'>
          <input value={code} onChange={(e)=>{ setCode(e.target.value);}}
            type="text" className='pl-6 rounded-2xl border-[#476832] w-full bg-[#FCFFE3] border-2 border-[#476832] border-solid p-1'/>
          <input onClick={()=>{ handleCode() }}
            type="submit" value='확인' className='absolute top-0 right-0 bg-[#476832] w-3/12 text-white rounded-2xl p-1 border-2 border-[#476832]'/>
        </div>
      </div>
      
    </div>
  );  
};

export default CollectingPuzzle;