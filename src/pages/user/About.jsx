import React from 'react';
import { FaHandshakeSimple } from "react-icons/fa6";
import { images } from '../../utils/images';
import person from '../../utils/person.json';
import '../../css/style.css'
import PageTitle from '../../components/PageTitle';
import { MainNav, MenuNav} from '../../components/MainNav';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='bg-[#FFF4ED] aboutBold min-h-screen'>
      <PageTitle title={'Puzzle'} subTitle={'만든이들'} Tcolor={'#705441'}/>
      <AboutTitle color={'#705441'}/>
      <AboutPerson/>
    </div>
  );
};

export default About;

export const AboutTitle = ({color}) => {
  return(
    <div className={`text-[${color}] w-11/12 mx-auto text-center border-b-2 border-[#654F40] my-10`}>
      <div className='text-xs break-keep my-5'>
        제40대 Puzzle 동아리연합회에서 웹 사이트를 기획하였습니다.<br/>
        멋쟁이사자처럼에서 웹 사이트를 제작하였습니다.
      </div>
      
      <div className='my-3 flex items-center justify-center'>
        <div className='w-6/12'>
          <img src={images.puzzle} alt="puzzle" className='w-4/12 mx-auto'/>  
          <p className='text-xs mt-3'>성결대학교<br/>제40대 Puzzle 동아리연합회</p>
        </div>      
        <FaHandshakeSimple size={35} />
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
      <div className='w-10/12 mx-auto text-center mb-5'>
        <img src={images.puzzle} alt="puzzle" className='w-2/12 mx-auto mb-1'/>
        <p className='text-xs text-[#705441]'>성결대학교<br/>제40대 Puzzle 동아리연합회</p>
        <Link to='https://www.instagram.com/sku_dongari40/' target='_blank' className='text-xs text-[#705441]'>@sku_dongari40</Link>
      </div>

      <div className='grid grid-cols-3 text-white'>
        {person.filter(person => person.group === "puzzle").map((person)=>{
          return (
            <Person person={person} />
          )
        })}
      </div>
    </div>
  )
}

export const LikelionPerson = () => {
  return(
    <div className='mt-4 pb-8'>
      <div className='w-10/12 mx-auto text-center mb-5'>
        <img src={images.likelion} alt="likelion" className='w-2/12 mx-auto mb-1'/>
        <p className='text-xs text-[#705441]'>성결대학교<br/>멋쟁이사자처럼 12기</p>
        <Link to='https://www.instagram.com/likelion_sku/' target='_blank' className='text-xs text-[#705441]'>@likelion_sku</Link>
      </div>

      <div className='flex flex-wrap w-8/12 mx-auto text-white'>
        {person.filter(person => person.group === "likelion").map((person)=>{
          return (
            <Person person={person} />
          )
        })}
      </div>
    </div>
  )
}

export const Person = ({person}) => {
  return (
    <>
    <div className='text-[10px] text-center py-3 bg-[#654F40] rounded-xl w-[110px] mx-auto mb-3'>
      <div className='h-[75px] w-[75px] flex items-center mx-auto text-center'>
        <img src={person.image} className='h-full mx-auto'/>
      </div>
      <div className='flex items-center justify-center p-1'>
        <img src={person.logo} width={20}/>
        <div className='ml-1'>{person.name}</div>
      </div>
      <div className={`p-[1px] ${person.department === '미디어소프트웨어학과' && 'text-[8px]'}`}>{person.department}</div>
      <div className='p-1'>{person.position}</div>
      <hr className='p-1 w-10/12 mx-auto'/>
      <div className='text-[#FFCB67]'>{person.role}</div>
    </div>
    </>
  )
}