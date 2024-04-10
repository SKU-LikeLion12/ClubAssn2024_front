import React from 'react';
import PageTitle from '../../components/PageTitle';
import Back from '../../components/shared/Back';
import { useNavigate, Outlet} from 'react-router-dom';
import { images } from '../../utils/images';

const ClassroomSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className='relative min-h-screen'>
      <PageTitle title={'강의실'} title2={'시간표'} Tcolor={'#70a2d5'} Tcolor2={'#708CD5'}/>
      <div className='flex w-11/12 mx-auto justify-center'>
        <button className='w-full bg-[#d3edf9] m-[7px] p-[1px] rounded-md border-2 border-[#708cd5] text-[3708cd5]' /* onClick={()=>{navigate('studentCenter')}} */>중생관</button> 
        <button className='w-full bg-[#d3edf9] m-[7px] p-[1px] rounded-md border-2 border-[#708cd5] text-[3708cd5]' /* onClick={()=>{navigate('studentUnion')}} */>영암관</button> 
        <button className='w-full bg-[#d3edf9] m-[7px] p-[1px] rounded-md border-2 border-[#708cd5] text-[3708cd5]' /* onClick={()=>{navigate('studentMemorial')}} */>기념관</button>
      </div>
      <div className='text-center mt-20 text-3xl text-[#708cd5]'>서비스 준비 중입니다.</div>
      <Outlet />
{/*       <Back left={'leftPinkMenu'} right={'rightPinkMenu'} /> */}
    </div>
  );
};

export default ClassroomSchedule;

/* // 중생관 component
export const StudentCenter = () => {
  return (
    <div>
      <div className='mapSmallTitle'>중생관</div>
      <img src={images.center} alt="중생관 배치도" />
    </div>
  );
};

// 학생회관 component
export const StudentUnion = () => {
  return (
    <div>
      <div className='mapSmallTitle'>학생회관 3F</div>
      <img src={images.union3F} alt="학생회관 3층" />

      <div className='mapSmallTitle'>학생회관 1F</div>
      <img src={images.union1F} alt="학생회관 1층" />
    </div>
  );
};

// 기념관 component
export const StudentMemorial = () => {
  return (
    <div>
      <div className='mapSmallTitle'>학생회관 3F</div>
      <img src={images.union3F} alt="학생회관 3층" />

      <div className='mapSmallTitle'>학생회관 1F</div>
      <img src={images.union1F} alt="학생회관 1층" />
    </div>
  );
}; */
