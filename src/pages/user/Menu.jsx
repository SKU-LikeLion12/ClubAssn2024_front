import React from 'react';
import { images } from '../../utils/images';
import { Link } from 'react-router-dom';
import Back from '../../components/shared/Back';
import PageTitle from '../../components/PageTitle';

const Menu = () => {
  return (
    <div className='relative min-h-screen'>
    <PageTitle title={'Puzzle'} title2={'Menu'} Tcolor={'#AB7A67'} Tcolor2={'#C19589'} />
    <div className='Menu flex text-sm text-white'>
      <div className='relative w-10/12 mx-auto'>
        <img src={images.menuPuzzle} className='absolute -z-10' alt='퍼즐이미지' />
        <div className='flex text-center justify-between mt-[5px]'>
          <Link to='/sns'><div className='w-[100px] h-[100px] flex justify-start pl-8 pb-1 items-center'>SNS</div></Link>
          <Link to='/clubintro'><div className='w-[100px] h-[100px] flex justify-center items-center'>동아리연합회<br/>소개</div></Link>
          <Link to='/about'><div className='w-[100px] h-[100px] flex justify-end pr-5 pb-2 items-center'>만든이들</div></Link>
        </div>
      </div>
    </div>
    <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
    </div>
  );
};

export default Menu;