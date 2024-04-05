import React from 'react';
import { images } from '../../utils/images';
import { Link } from 'react-router-dom';
import '../../css/menu.css';
import Back from '../../components/shared/Back';
import { MenuNav } from '../../components/MainNav';
import PageTitle from '../../components/PageTitle';
import MyInfo from '../../components/shared/MyInfo';

const Menu = () => {
  return (
    <div className='relative min-h-screen'>
    <PageTitle title={'Puzzle'} title2={'Menu'} Tcolor={'#AB7A67'} Tcolor2={'#C19589'} />
    <div className='Menu flex text-sm text-white'>
      <div className='relative w-10/12 mx-auto'>
        <img src={images.menuPuzzle} className='absolute -z-10' />
        <div className='flex text-center justify-between mt-[5px]'>
          <Link to='/user/sns'><div className='w-[100px] h-[100px] flex justify-start pl-6 items-center'>SNS</div></Link>
          <Link to='/user/clubintro'><div className='w-[100px] h-[100px] flex justify-center items-center'>동아리연합회<br/>소개</div></Link>
          <Link to='/user/about'><div className='w-[100px] h-[100px] flex justify-end pr-2 items-center'>만든이들</div></Link>
        </div>
      </div>
    </div>
    <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
    </div>
  );
};

export default Menu;