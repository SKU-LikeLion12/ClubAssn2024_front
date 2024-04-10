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
    const ActiveColor = currentPath === '/myPage' ? myPageColor : currentPath === '/collectingpuzzle' ? CollectingPuzzleColor : RentalColor
    const FixedInfo = currentPath === '/rental' || currentPath === '/collectingpuzzle';
    const [isOpen, setIsOpen] = useState(false)
    const [showClubList, setShowClubList] = useState([]);
    const [isOne, setIsOne] = useState();
    const [loading, setLoading] = useState(true);
    // first show info
    const [myInfoData, setMyInfoData] = useState({
      logo: '',
      name: '',
      club: '',
    });
    const [saveList, setSaveList] = useState([])

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
        setLoading(false);
      } catch (error) {
        console.error(error)
        setLoading(false);
      }
    }

    // joined-list API -> 모든 동아리 리스트 보여주기
    const handleShowList = async () => {
      setIsOpen(!isOpen);
      // try {
      //   const result = await API().get('/joined-list');
      //   setShowClubList(result.data);
      // } catch (error) {
      //   console.log(error);
      // }
    }

    // 맨 처음 렌더링될 때 한 번 실행
    const handleisOneCheck = async () => {
      try {
        const result = await API().get('/joined-list');
        const show = result.data.length === 1 ? true : false
        setShowClubList(result.data)
        setIsOne(show);
      } catch (error) {
        console.log(error);
      }
    }

    // changeIconClub API ->  대표 동아리 변경
    const handleSelectList = async (clubName) =>{
      try {
        await API().post('/changeIconClub', { "clubName" : clubName }, {
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
      handleisOneCheck();
    }, [isOpen])

  return (
    <>
    {/* 대표 동아리만 보이기 */}
    {loading ? (
    <div className='text-center text-gray-400'>데이터를 불러오는 중입니다...</div>
    ) : (
    !isOpen ? (
      <div className='w-9/12 mx-auto relative'>
        <div className={`flex justify-center gap-5 items-center mb-3 p-2 rounded-xl border-[2px] ${ActiveColor}`}>
          <img src={myInfoData.logo} alt="동아리 로고" className='w-2/12' />
          <div className='flex flex-col text-center'>
            <div>{myInfoData.club}</div>
            <div className='text-xl'>{myInfoData.name}</div>
          </div>
          {!(FixedInfo || isOne) && (
            <button 
              onClick={handleShowList}
              className='absolute right-2 -bottom-2 text-xs'>
              대표 동아리 변경
            </button>
          )}
          </div>
      </div>
    ) : null
  )}

    {/* 전체 동아리 리스트 보이기 */}
    {isOpen && (
    <div className={`flex flex-col w-9/12 mx-auto mb-3 rounded-xl border-[2px] ${ActiveColor}`}>
      {saveList.map((item, index) => {
        return (
          <>
            <button key={item.index} onClick={() => { handleSelectList(item.name) }}
              className='flex items-center justify-center py-2 shadow-black h-[65px] w-full'>
              <img src={`data:image/jpeg;base64, ${item.logo}`} alt="동아리 로고" className='w-1/6' />
              <div className='w-1/2'>{item.name}</div>
            </button>
            {index !== showClubList.length - 1 && <hr className={`${ActiveColor} w-full mx-auto opacity-[0.5px] border-[1px]`} />}
          </>
        )})}
    </div>
    )}
  </>
  );
};

export default MyInfo;

//안씀.
export const FixedMyInfo = ({loading, ActiveColor, myInfoData}) => {
  return (
    <div>
      {loading ? (
      <div className='text-center text-gray-400'>데이터를 불러오는 중입니다...</div>
      ) : 
        <div className={`flex justify-center gap-5 items-center w-9/12 mx-auto mb-3 p-2 rounded-xl border-[2px] ${ActiveColor}`}>
          <img src={myInfoData.logo} alt="동아리 로고" className='w-2/12' />
          <div className='flex flex-col text-center'>
            <div>{myInfoData.club}</div>
            <div className='text-xl'>{myInfoData.name}</div>
          </div>
        </div>}
    </div>
  )
}