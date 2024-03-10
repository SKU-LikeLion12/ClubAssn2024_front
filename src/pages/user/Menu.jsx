import React from 'react';
import { images } from '../../utils/images';
import { Link } from 'react-router-dom';
import '../../css/menu.css';
import Back from '../../components/shared/Back';
import { MenuNav } from '../../components/MainNav';
import PageTitle from '../../components/PageTitle';

const Menu = () => {
  return (
    <div className='relative'>
    <PageTitle  Tcolor={'#AB7A67'} Tcolor2={'#C19589'} title={'Puzzle'} title2={'Menu'}/>
    <div className='Menu flex text-sm text-white min-h-screen'>
      <div className='relative w-10/12 mx-auto'>
        <img src={images.menuPuzzle} className='absolute -z-10' />
        <div className='flex text-center justify-between'>
          <Link to='/sns'><div className='w-[100px] h-[100px] flex justify-start pl-6 items-center'>SNS</div></Link>
          <Link to='/clubintro'><div className='w-[100px] h-[100px] flex justify-center items-center'>동아리연합회<br/>소개</div></Link>
          <Link to='/about'><div className='w-[100px] h-[100px] flex justify-end pr-2 items-center'>만든이들</div></Link>
        </div>
      </div>
    </div>
      <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
    </div>
  );
};

export default Menu;