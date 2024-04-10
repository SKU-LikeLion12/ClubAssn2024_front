import React from 'react';
import { MainNav } from '../../components/MainNav';
import Footer from "../../components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { images } from '../../utils/images';
import Back from '../../components/shared/Back';
import { useLogin } from '../../context/LoginContext';
import '../../css/animation.css';

const Main = () => {
  const { isLoggedIn } = useLogin();
  const linkPuzzle = isLoggedIn ? 'collectingpuzzle' : 'login';
  const linkRental = isLoggedIn ? 'rental' : 'login';
  
  const navigate = useNavigate()
  
  const moveCS = () => {
    navigate('/classroomSchedule');
  }

  return (
    <div>
      <div className='relative min-h-screen'>
        <div className='relative'>
          <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'}/>
          <div className='textFont text-white text-lg mt-16'>
            <div className='flex justify-center mb-10 relative'>
              <img src={images.mainPuzzle} className='absolute -z-10 w-2/3'/>
              <div className='grid grid-cols-2 mt-8 gap-9'>
                <Link to={linkPuzzle}><div className='flex w-[100px] h-[100px] text-center justify-center'>퍼즐 조각 <br/> 모으기</div></Link>
                <Link to={linkRental}><div className='flex w-[100px] h-[100px] text-center justify-center'>물품<br/>대여</div></Link>
                <Link to='map'><div className='flex w-[100px] h-[100px] text-center justify-center'>동아리<br/>미니맵</div></Link>
                <button onClick={moveCS}><div className='flex w-[100px] h-[100px] justify-center'>강의실<br/>시간표</div></button>
              </div>
            </div>
          </div>
        </div>
        <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
        <Footer/>
      </div>
    </div>
  );
};

export default Main;