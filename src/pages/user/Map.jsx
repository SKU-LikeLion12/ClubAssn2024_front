import React from 'react';
import PageTitle from '../../components/PageTitle';
import Back from '../../components/shared/Back';
import '../../css/map.css'
import { Route, Routes, useNavigate, Link, Outlet} from 'react-router-dom';
import StudentUnion from '../../components/map/StudentUnion';
import StudentCenter from '../../components/map/StudentCenter';

const Map = () => {
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <PageTitle title={'동아리'} title2={'미니맵'} Tcolor={'#DA8372'} Tcolor2={'#B45C4B'}/>
      <div className='flex w-9/12 mx-auto justify-center'>
        <button className='btnStyle' onClick={()=>{navigate('studentUnion')}}>학생회관</button> 
        <button className='btnStyle' onClick={()=>{navigate('studentCenter')}}>중생관</button> 
      </div>
      <Outlet />

      <div className='mapSmallTitle'>동아리 SNS</div>
      <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
    </div>
  );
};

export default Map;