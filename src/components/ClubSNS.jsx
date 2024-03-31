import React from 'react';
import club from '../utils/club.json';

const ClubSNS = () => {
  const groupedClubs = club.reduce((acc, club) => {
    const { category, clubName, clubImgUrl, color } = club;
    
    if (!acc[category]) {
      acc[category] = { color, clubs: [] };
    }
    
    acc[category].clubs.push({ clubName, clubImgUrl });
    
    return acc;
  }, {});

  // 객체를 배열로 변환
  const groupedClubsArray = Object.entries(groupedClubs).map(([category, { color, clubs }]) => ({ category, color, clubs }));
  console.log(groupedClubsArray);

  return (
    <div className='text-[8px] bg-[#FDEDEA] w-11/12 mx-auto p-3 m-2'>

     {groupedClubsArray.map(({ category, color, clubs }) => (
        <div key={category}>
          <div className={`w-[70px] text-[11px] text-center mx-1 bg-${color} rounded-2xl relative -bottom-2`}>{category}</div>
          <div className={`clubCategoryBox border border-${color} pt-2`}>
            {/* 각 카테고리별 동아리 출력 */}
            {clubs.map(({ clubName, clubImgUrl }) => (
              <div className='w-[70px] text-center break-keep my-2 mx-1'>
              <img src={clubImgUrl} alt="동아리 로고" className='w-[40px] mx-auto' />
              <div>{clubName}</div>
            </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubSNS;