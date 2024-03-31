import React from 'react';
import { images } from '../../utils/images';

const StudentUnion = () => {
  return (
    <div>
      <div className='mapSmallTitle'>학생회관 3F</div>
      <img src={images.union3F} alt="학생회관 3층" />

      <div className='mapSmallTitle'>학생회관 1F</div>
      <img src={images.union1F} alt="학생회관 1층" />
    </div>
  );
};

export default StudentUnion;