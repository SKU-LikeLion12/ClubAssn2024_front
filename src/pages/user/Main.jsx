import React from 'react';
import { MainNav } from '../../components/MainNav';
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { images } from '../../utils/images';
import Back from '../../components/shared/Back';
import { useLogin } from '../../context/LoginContext';
import '../../css/animation.css';

const Main = () => {
  const { isLoggedIn } = useLogin();
  const linkPuzzle = isLoggedIn ? 'collectingpuzzle' : 'login';
  const linkRental = isLoggedIn ? 'rental' : 'login';
  
  const showAlert = () => {
    alert("출시 예정");
  }

  return (
    <div>
      <div className='relative min-h-screen'>
      <div className='relative'>
          <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'}/>
          <div className='textFont text-white text-lg mt-20'>
            <div className='grid grid-rows-1 grid-flow-col justify-center relative mb-[-68px] z-10'>
              <Link to={linkPuzzle}>
              <img src="assets/images/puzzlePiece/puzzleG.png" className='w-auto h-32 ml-16 mr-1 slide-in-tl'/>
              <a className='absolute text-center top-8 left-[5.5rem] slide-in-tl'>퍼즐 조각 <br/> 모으기</a></Link>
              <Link to={linkRental}>
              <img src="assets/images/puzzlePiece/puzzleY.png" className='w-32 h-auto mr-20 ml-1 slide-in-tr'/>
              <a className='absolute text-center top-8 left-60 slide-in-tr'>물품<br/>대여</a></Link>
            </div>
            <div className='grid grid-rows-1 grid-flow-col justify-center relative z-10'>
              <Link to='map'>
              <img src="assets/images/puzzlePiece/puzzleR.png" className='w-32 h-auto ml-16 mb-20 slide-in-bl'/>
              <a className='absolute text-center top-[4.5rem] left-[5.5rem] slide-in-bl'>동아리<br/>미니맵</a></Link>
              <img onClick={showAlert}
              src="assets/images/puzzlePiece/puzzleB.png" className='w-auto h-32 mr-36 ml-3 mt-[30px] slide-in-br'/>
              <a className='absolute text-center top-[4.5rem] left-56 slide-in-br'>강의실<br/>시간표</a>
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