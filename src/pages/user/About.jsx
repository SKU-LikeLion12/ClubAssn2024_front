import React from 'react';
import { FaHandshakeSimple } from "react-icons/fa6";
import { images } from '../../utils/images';

const About = () => {
  return (
    <div>
      <AboutTitle />
      <AboutPerson />
    </div>
  );
};

export default About;

export const AboutTitle = () => {
  return(
    <div className='w-11/12 mx-auto text-center border-b-2 border-[#654F40] my-10'>
      <div className='text-xs break-keep my-5'>
        제40대 Puzzle 동아리연합회에서 웹 사이트를 기획하였습니다.<br/>
        멋쟁이사자처럼에서 웹 사이트를 제작하였습니다.
      </div>
      
      <div className='my-3 flex items-center justify-center'>
        <div className='w-6/12'>
          <img src={images.puzzle} alt="puzzle" className='w-4/12 mx-auto'/>  
          <p className='text-xs mt-3'>성결대학교<br/>제40대 Puzzle 동아리연합회</p>
        </div>      
        <FaHandshakeSimple size={35} color={'#654F40'}/>
        <div className='w-6/12'>
          <img src={images.likelion} alt="likelion" className='w-5/12 mx-auto'/>  
          <p className='text-xs mt-3'>성결대학교<br/>멋쟁이사자처럼 12기</p>
        </div> 
      </div>
    </div>
  )
}

export const AboutPerson = () => {
  return(
    <>
      <PuzzlePerson />
      <LikelionPerson />
    </>
  )
}

export const PuzzlePerson = () => {
  return(
    <div className='my-4'>
      <div className='w-10/12 mx-auto text-center'>
        <img src={images.puzzle} alt="puzzle" className='w-2/12 mx-auto mb-1'/>
        <p className='text-xs'>성결대학교<br/>제40대 Puzzle 동아리연합회</p>
      </div>
    <div></div>
    </div>
  )
}

export const LikelionPerson = () => {
  return(
    <div className='my-4'>
      <div className='w-10/12 mx-auto text-center'>
        <img src={images.likelion} alt="likelion" className='w-2/12 mx-auto mb-1'/>
        <p className='text-xs'>성결대학교<br/>멋쟁이사자처럼 12기</p>
      </div>
      <div></div>
    </div>
  )
}