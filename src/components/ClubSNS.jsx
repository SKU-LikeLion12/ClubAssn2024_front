import React, { useState } from 'react';
import club from '../utils/club.json';
import clubModal from '../utils/clubModal.json';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { customModalStyles } from '../css/customModal'; 

const ClubSNS = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const groupedClubs = club.reduce((acc, club) => {
    const { category, clubName, clubImgUrl, color, snsLink } = club;
    
    if (!acc[category]) {
      acc[category] = { color, clubs: [] };
    }

    acc[category].clubs.push({ clubName, clubImgUrl, snsLink });
    
    return acc;
  }, {});

  // 객체를 배열로 변환
  const groupedClubsArray = Object.entries(groupedClubs).map(([category, { color, clubs }]) => ({ category, color, clubs }));

  const handleClick = (club) => {
    setSelectedClub(club);
    setModalIsOpen(true);
  };
  
  return (
    <div className='text-[8px] bg-[#FDEDEA] w-11/12 mx-auto p-3 m-2'>

     {groupedClubsArray.map(({ category, color, clubs }) => (
        <div key={category}>
          <div
            style={{ backgroundColor: color }}
            className={`w-[70px] text-[11px] text-center mx-1 rounded-2xl relative -bottom-2
              ${category==='동아리연합회' && 'mx-auto'}
            `}>
              {category}</div>
          <div 
            style={{ borderColor: color }}
            className={`clubCategoryBox border pt-2 ${category==='동아리연합회' ? 'grid-cols-1' : 'grid-cols-4'}`}>
            {/* 각 카테고리별 동아리 출력 */}
            {clubs.map(({ clubName, clubImgUrl, snsLink }) => (
              snsLink !== 'Modal' ?
              // SNS 링크로 이동하는 동아리
              <Link to={snsLink} target='_blank' key={clubName}>
                <div className={`w-[70px] text-center break-keep my-2 ${category==='동아리연합회' ? 'mx-auto' : 'mx-1'}`}>
                  <img src={clubImgUrl} alt="동아리 로고" className='w-[40px] mx-auto' />
                  <div>{clubName}</div>
                </div>
              </Link> :
              // 모달창 띄울 동아리
              <>
                <div
                  key={clubName}
                  onClick={()=> {handleClick(clubName);}}
                  className='w-[70px] text-center break-keep my-2 mx-1'>
                  <img src={clubImgUrl} alt="동아리 로고" className='w-[40px] mx-auto' />
                  <div>{clubName}</div>
                </div>

                {/* SNS 없는 동아리 모달창 */}
                <Modal
                  style={customModalStyles}
                  ariaHideApp={false}
                  onRequestClose={() => setModalIsOpen(false)}
                  isOpen={modalIsOpen}>
                  {clubModal.filter(i=>i.clubName === selectedClub).map((club)=>{
                    return (
                      <div className='flex flex-col items-end h-[100%]'>
                        <button onClick={() => setModalIsOpen(false)}>X</button>
                        <div className='flex flex-col justify-center items-center grow w-full'>
                          <img src={club.clubImgUrl} alt="동아리 로고" className='w-[100px] mx-auto' />
                          <div className='m-3 text-2xl text-bold'>{club.clubName}</div>
                          <div className='w-11/12 break-keep text-center'>{club.clubIntro}</div>
                        </div>
                      </div>
                    )
                  })}
                </Modal>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubSNS;