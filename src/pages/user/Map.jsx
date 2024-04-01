import React from 'react';
import PageTitle from '../../components/PageTitle';
import Back from '../../components/shared/Back';
import '../../css/map.css'
import { Route, Routes, useNavigate, Outlet} from 'react-router-dom';
import { images } from '../../utils/images';

export const Map = () => {
  const navigate = useNavigate();

  return (
    <div className='relative min-h-screen'>
      <PageTitle title={'동아리'} title2={'미니맵'} Tcolor={'#DA8372'} Tcolor2={'#B45C4B'}/>
      <div className='flex w-11/12 mx-auto justify-center'>
        <button className='btnStyle' onClick={()=>{navigate('studentUnion')}}>학생회관</button> 
        <button className='btnStyle' onClick={()=>{navigate('studentCenter')}}>중생관</button> 
        <button className='btnStyle' onClick={()=>{navigate('clubSNS')}}>동아리 SNS</button>
      </div>
      <Outlet />

      {/* <div className='mapSmallTitle'>동아리 SNS</div>
      <ClubSNS /> */}
      <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
    </div>
  );
};

// 중생관 component
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

