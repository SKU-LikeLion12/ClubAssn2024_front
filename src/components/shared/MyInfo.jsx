import React, { useEffect, useState } from 'react';
import { images } from '../../utils/images';
import { useLocation } from 'react-router';
import { API } from '../../api/API';

const MyInfo = () => {
    const location = useLocation();
    const currentPath = location.pathname; // 현재 경로
    const myPageColor = 'bg-[#FFF] border-[#AB7A67] text-[#AB7A67]'; // myPage 색상 
    const CollectingPuzzleColor = 'bg-[#FCFFE3] border-[#476832] text-[#476832]'; // 퍼즐조각 모으기 색상
    const RentalColor = 'bg-[#FCF3CD] border-[#CEB341] text-[#CEB341]'; // 대여사업 페이지 색상
    // 현재 경로에 맞는 색상 활성화
    const ActiveColor = currentPath === '/user/myPage' ? myPageColor : currentPath === '/user/collectingpuzzle' ? CollectingPuzzleColor : RentalColor
    const FixedInfo = currentPath === '/user/rental' || currentPath === '/user/collectingpuzzle';

    // first show info
    const [myInfoData, setMyInfoData] = useState({
      logo: '',
      name: '',
      club: '',
    });
    const [isOpen, setIsOpen] = useState(false)
    const [showClubList, setShowClubList] = useState([]);

    // mypage API -> 맨 처음 대표 동아리 
    const getMyInfo = async () => {
      try {
        const result = await API().get('/mypage');
        const base64String = result.data.logo;
        const imageDataURI = `data:image/jpeg;base64, ${base64String}`;
        setMyInfoData({
          logo: imageDataURI,
          name: result.data.name,
          club: result.data.clubName,
        });
      } catch (error) {
        console.error(error)
      }
    }

    // joined-list API -> 모든 동아리 리스트 보여주기
    const handleShowList = async () => {
      setIsOpen(!isOpen);
      try {
        const result = await API().get('/joined-list');
        setShowClubList(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    // changeIconClub API ->  대표 동아리 변경
    const handleSelectList = async (clubName) =>{
      try {
        const result = await API().post('/changeIconClub', {"clubName": clubName}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        getMyInfo(); // 대표 동아리 api 재호출
        setIsOpen(!isOpen);
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(()=> {
      getMyInfo();
    }, [isOpen])

  return (
    <>
    {/* 대표 동아리만 보이기 */}
    {!FixedInfo && !isOpen &&
    <div onClick={handleShowList} className=' w-9/12 mx-auto '>
      <div className={`flex justify-center gap-5 items-center mb-3 p-2 rounded-xl border-[2px] ${ActiveColor}`}>
        <img src={myInfoData.logo} alt="동아리 로고" className='w-2/12' />
        <div className='flex flex-col text-center'>
          <div>{myInfoData.club}</div>
          <div className='text-xl'>{myInfoData.name}</div>
        </div>
      </div>
    </div>}

    {/* 전체 동아리 리스트 보이기 */}
    {isOpen && <div className={`flex flex-col w-9/12 mx-auto mb-3 rounded-xl border-[2px] ${ActiveColor}`}>
    {isOpen && showClubList.map((item, index)=>{
      return(
        <>
        <button key={item.index} onClick={()=>{handleSelectList(item.name)}}
          className='flex items-center justify-center gap-5 py-2 shadow-black h-[70px]'>
          <img src={`data:image/jpeg;base64, ${item.logo}`} alt="동아리 로고" className='w-2/12' />
          <div>{item.name}</div>
        </button>
        {index !== showClubList.length - 1 && <hr className={`${ActiveColor} w-11/12 mx-auto opacity-[0.5px]`}/>}
        </>
        )})}
    </div>}
      
    {/* FixedInfo 보이기 */}
    {FixedInfo && <FixedMyInfo ActiveColor={ActiveColor} myInfoData={myInfoData} />}
    </>
  );
};

export default MyInfo;

export const FixedMyInfo = ({ActiveColor, myInfoData}) => {
  return (
    <div>
      <div className={`flex justify-center gap-5 items-center w-9/12 mx-auto mb-3 p-2 rounded-xl border-[2px] ${ActiveColor}`}>
        <img src={myInfoData.logo} alt="동아리 로고" className='w-2/12' />
        <div className='flex flex-col text-center'>
          <div>{myInfoData.club}</div>
          <div className='text-xl'>{myInfoData.name}</div>
        </div>
      </div>
    </div>
  )
}