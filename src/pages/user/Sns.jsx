import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../utils/images';
import PageTitle from '../../components/PageTitle';

const Sns = () => {
  return (
    <div>
      <PageTitle title={'Puzzle'} subTitle={'SNS'} Tcolor={'#C7A266'}/>
      <div className='grid grid-cols-2 gap-5 mx-auto text-[#C7A266]'>
        <SnsContent image={'instagram'} title={'인스타그램'} sub={'@sku_dongari40'} url={'https://www.naver.com/'}/>
        <SnsContent image={'naverCafe'} title={'네이버 카페'} sub={'성결대학교 동아리연합회 카페'} url={'https://www.naver.com/'}/>
        <SnsContent image={'kakaotalk'} title={'카카오톡 채널'} sub={'성결대 동아리연합회'} url={'https://www.naver.com/'}/>
        <SnsContent image={'youtube'} title={'유튜브'} sub={'성결대학교 동아리연합회'} url={'https://www.naver.com/'}/>
      </div>
    </div>
  );
};

export default Sns; 

export const SnsContent = ({image, title, sub, url}) => {
  return (
    <Link to={url} className='flex flex-col items-center h-[200px] justify-evenly' target='_blank'>
      <div><img src={images[image]} alt=""  className='w-7/12 mx-auto'/></div>
      <div>{title}</div>
      <div className='break-keep text-xs'>{sub}</div>
    </Link>
  );
};