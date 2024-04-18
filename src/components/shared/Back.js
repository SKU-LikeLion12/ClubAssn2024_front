import React from 'react';
import { images } from '../../utils/images';

const Back = ({left, right}) => {
  return (
    <>
      <img src={images[left]} className='absolute w-1/2 left-0 top-[350px] -z-20'/>
      <img src={images[right]} className='absolute w-1/2 right-0 top-[200px] -z-20 '/>
    </>
  );
};

export default Back;