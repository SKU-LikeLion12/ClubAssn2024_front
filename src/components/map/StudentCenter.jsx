import React from 'react';
import { images } from '../../utils/images';
import '../../css/map.css'

const StudentCenter = () => {
  return (
    <div>
      <div className='mapSmallTitle'>중생관</div>
      <img src={images.center} alt="중생관 배치도" />
    </div>
  );
};

export default StudentCenter;