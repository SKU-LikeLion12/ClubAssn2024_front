import React from 'react';
import { MainNav } from '../../components/MainNav';
import Footer from "../../components/Footer";

const Main = () => {
  return (
    <div className='overflow-hidden'>
      <div className='relative'>
        <p>Puzzle</p>
        <div className='flex justify-end'>
          <img src="assets/images/puzzle/backPuzzleT.png" className='absolute z-0 w-2/5 h-auto '/>
        </div>
        <div className='textFont text-white text-lg mt-20'>
          <div className='grid grid-rows-1 grid-flow-col justify-center relative mb-[-68px] z-10'>
            <img src="assets/images/puzzle/puzzleG.png" className='w-auto h-32 ml-16 mr-1'/>
            <a href ="#" className='absolute text-center top-8 left-[5.5rem]'>퍼즐 조각 <br/> 모으기</a>
            <img src="assets/images/puzzle/puzzleY.png" className='w-32 h-auto mr-20 ml-1'/>
            <a href ="#" className='absolute text-center top-8 left-60'>물품<br/>대여</a>
          </div>
          <div className='grid grid-rows-1 grid-flow-col justify-center relative z-10'>
            <img src="assets/images/puzzle/puzzleR.png" className='w-32 h-auto ml-16 mb-20'/>
            <a href ="#" className='absolute text-center top-[4.5rem] left-[5.5rem]'>동아리<br/>미니맵</a>
            <img src="assets/images/puzzle/puzzleB.png" className='w-auto h-32 mr-36 ml-3 mt-[30px]'/>
            <a href ="#" className='absolute text-center top-[4.5rem] left-56'>강의실<br/>시간표</a>
          </div>
          <div className='flex justify-start'>
          <img src="assets/images/puzzle/backPuzzleB.png" className='absolute z-[-10] w-2/5 h-auto top-[18rem]'/>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Main;