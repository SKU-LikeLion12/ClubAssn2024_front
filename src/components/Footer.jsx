import React from 'react';
import { images } from '../utils/images';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className='flex justify-center text-center mb-10'>
        <div>
          {/* <img src="assets/images/logo/puzzle.png" className='w-1/3 mx-auto my-5'/> */}
          <img src={images.puzzle} alt="" className='w-1/3 mx-auto my-5'/>
          <p className='text-xl font-bold textFont text-[#AB7A67]'>제40대 Puzzle 동아리연<Link to='/admin/adminLogin'>합회</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;