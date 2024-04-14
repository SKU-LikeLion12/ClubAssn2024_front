import React from 'react';
import { images } from '../../utils/images';
import PageTitle from '../../components/PageTitle';

const ClubIntro = () => {
  return (
    <>
    <PageTitle title={'Puzzle'} subTitle={'동아리연합회 소개'} Tcolor={'#D98354'} />
    <div className='w-11/12 mx-auto text-center text-[#D98354]'>
      <ClubIntroElement title={'슬로건'} sub={'제40대 그대와의 추억 한 조각, Puzzle 동아리연합회'}/>
      <ClubIntroElement title={'의미'} sub={'대학 생활이라는 아름다운 그림을 퍼즐에 비유하여 동아리의 다양한 경험과 추억이 대학 생활의 퍼즐을 완성한다.'} />
      <ClubIntroElement title={'로고 의미'} sub={'6개의 분과를 퍼즐 조각에 비유하여 퍼즐 조각들이 모여 동아리 연합회라는 퍼즐이 완성되어 나간다.'} img={'puzzle'}/>
    </div>
    </>
  );
};

export default ClubIntro;

export const ClubIntroElement = ({title, sub, img}) => {
  return(
    <div className='mb-16 mt-4'>
      <p className='text-xl font-bold mb-3'>{title}</p>
      <p>
        <p><img src={images[img]} alt="" className='mx-auto w-[24%]'/></p>
        <p className='break-keep'>{sub}</p>
      </p>
    </div>
  )
}