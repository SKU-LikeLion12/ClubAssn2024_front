import React from 'react';
import PageTitle from '../../components/PageTitle';
import MyInfo from '../../components/shared/MyInfo';
import Back from '../../components/shared/Back';

const CollectingPuzzle = () => {
  return (
    <div className='relative min-h-screen'>
      <PageTitle title={'퍼즐 조각'} title2={'모으기'} Tcolor={'#476832'} Tcolor2={'#B7C58B'} />
      <MyInfo />
      <Back left={'leftGreen'} right={'rightGreen'} />
    </div>
  );  
};

export default CollectingPuzzle;