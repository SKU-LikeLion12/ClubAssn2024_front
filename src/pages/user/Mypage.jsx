import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Footer from '../../components/Footer';
import MyInfo from '../../components/shared/MyInfo';
import axios from 'axios';

const Mypage = () => {
  const [isgoodsOpen, setIsgoodsOpen] = useState(false); // 물품 대여 현황
  const [isreserveOpen, setReserveOpen] = useState(false); // 물품 예약 현황
  const [rentalData, setRentalData] = useState(null); // 물품 대여 데이터
  const [reservation, setReservation] = useState(null); // 물품 대여 데이터
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false); // 예약 취소 확인창 상태
  const [isCancellationConfirmed, setIsCancellationConfirmed] = useState(false); // 예약 취소 확정 상태

  const openPopup = () => {
    setIsgoodsOpen(true);
    
  }

  const openReservation = () => {
    setReserveOpen(true);

    const reservation = { // 예약 현황
      // 임시데이터
      status: true,
      image: 'assets/images/기도방석.png',
      goodsname: '우산',
      count: "2/3",
    };
    setReservation(reservation);
  }
  
  const closePopup = () => {
    setIsgoodsOpen(false);
  }

  const closeReservation = () => {
    setReserveOpen(false);
  }

  const prevGoods = () => {

  }

  const nextGoods = () => {

  }

    // 예약 취소 확인창을 보여주는 함수
    const handleCancelClick = () => {
      setShowCancelConfirmation(true);
  };
  
  // 예약 취소를 확정하는 함수
  const confirmCancellation = () => {
      // 여기에 예약 취소 로직
      setShowCancelConfirmation(false); // 확인창을 닫는다.
      setIsCancellationConfirmed(true)
  };
  
  // 예약 취소 확인창을 닫는 함수
  const cancelCancellation = () => {
      setShowCancelConfirmation(false);
  };

  return (
    <div>
      <div className="relative -z-10">
        <img className="w-32 h-[20rem] absolute top-32 right-0" src='../assets/images/Bgpuzzle/rightPinkPuzzle.png' alt='puzzleT'/>
        <img className="w-32 h-[22rem] absolute top-[21rem]" src='../assets/images/Bgpuzzle/leftPinkPuzzle.png' alt='puzzleB'/>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <div>
        <PageTitle title={"Puzzle"} Tcolor="#AB7A67"/>
        </div>
        {/* <div className="mb-4">동아리소속,이름</div> */}
        <MyInfo />
        <div className="flex flex-col mt-7">
          {!isgoodsOpen && ( // 물품 대여 현황 누르기 전
            <div className="w-[17rem] h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer" onClick={openPopup}>
              <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">물품 대여 현황</div>
            </div>
          )}
        {isgoodsOpen && ( // 물품 대여 현황 눌렀을 때 
          <div className="bg-white border-primary border-2 font-bold font-['GyeonggiTitleM'] p-4 rounded-lg mb-8 w-[17rem] h-[18rem] relative">
            <div className="text-primary mb-4 text-center">물품 대여 현황</div>
            <img src="assets/images/Xbutton.png" alt="Xbutton" className="absolute top-0 right-0 mr-3 mt-4 w-[1rem] cursor-pointer" onClick={closePopup} />
            {rentalData ? ( // 대여현황이 있으면 렌더링 
              <div className="flex flex-col justify-center items-center text-center">
                <div className="w-[5rem] h-[6rem] border-2 border-primary rounded overflow-hidden mb-3">
                  <img src={rentalData.image} alt="물품 이미지" className="w-full h-full object-cover" />
                </div>
                <div className="text-primary p-1">{rentalData.goodsname}</div>
                <div className="text-primary font-medium text-[14px]">대여일: {rentalData.rentalDate}</div>
                <div className="text-primary font-medium text-[14px]">반납일: {rentalData.returnDate}</div>
                <div className="flex justify-center mt-3">
                  <img src="../assets/images/Mypage-polygon.png" alt="polygon" className="w-[0.7rem] ml-6 mr-6 cursor-pointer" onClick={prevGoods} />
                  <div className="text-primary">{rentalData.count}</div>
                  <img src="../assets/images/Mypage-polygon.png" alt="polygon2" className="w-[0.7rem] transform rotate-180 ml-6 mr-6 cursor-pointer" onClick={nextGoods} />
                </div>
              </div>
            ) : ( // 물품 대여 현황 없으면 렌더링
              <div className="flex justify-center items-center h-4/6">
              <div className="text-primary">대여중인 물품이 없습니다.</div>
            </div>
          )}
        </div>
        )}
        {!isreserveOpen && ( // 물품 예약 현황 누르기 전
          <div className="h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer" onClick={openReservation} >
            <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']" >물품 예약 현황</div>
          </div>
        )}
          {isreserveOpen && ( // 물품 예약 현황 눌렀을 때 
          <div className="bg-white border-primary border-2 font-bold font-['GyeonggiTitleM'] p-4 rounded-lg mb-8 w-[17rem] h-[20rem] relative">
            <div className="text-primary mb-4 text-center">물품 예약 현황</div>
            <img src="assets/images/Xbutton.png" alt="Xbutton" className="absolute top-0 right-0 mr-3 mt-4 w-[1rem] cursor-pointer" onClick={closeReservation} />
            {reservation ? ( // 예약현황이 있으면 렌더링 
              <div className="flex flex-col justify-center items-center text-center">
                <div className="w-[5rem] h-[6rem] border-2 border-primary rounded overflow-hidden mb-3">
                  <img src={reservation.image} alt="물품 이미지" className="w-full h-full object-cover" />
                </div>
            {showCancelConfirmation ? (
              isCancellationConfirmed ? (
          // 예약 취소가 확정된 상태
          <div className="bg-white p-4 rounded-lg text-center">
            <p className='text-primary text-[1rem] font-medium'>예약이 취소되었습니다.</p>
            <div className='mt-4'>
              <button onClick={confirmCancellation} className="border-primary rounded-2xl border-2 text-primary font-medium text-[0.9rem] w-[5rem]">확인</button>
            </div>
          </div>
        ) : (
          // 예약 취소를 묻는 상태
          <>
            <div className="bg-white p-4 rounded-lg">
              <p className='text-primary text-[1rem] font-medium'>예약을 취소하시겠습니까?</p>
              <div className='flex justify-between items-center mt-2'>
                <div className='border-primary rounded-2xl border-2 w-[5rem] m-4'>
                  <button onClick={confirmCancellation} className="text-primary font-medium text-[0.9rem] w-full">예</button>
                </div>
                <div className='border-primary rounded-2xl border-2 w-[5rem] m-4'>
                  <button onClick={cancelCancellation} className="text-primary font-medium text-[0.9rem] w-full">아니오</button>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
                  <>
                <div className="text-primary">{reservation.goodsname}</div>
                <p className="text-primary text-center text-[14px] font-medium font-['GyeonggiTitleM'] tracking-tighter">2024년 2월 16일까지 <br/>동아리연합회실로 방문해주세요.</p>
                    <div className="border-2 border-primary rounded-2xl w-[7rem] h-[2rem] mt-2">
                      <button onClick={handleCancelClick} className="mt-[3px] text-primary font-medium text-[0.9rem]">예약 취소</button>
                    </div>
                    <div className="flex justify-center mt-3">
                      <img src="assets/images/Mypage-polygon.png" alt="polygon" className="w-[0.7rem] ml-6 mr-6 cursor-pointer" onClick={prevGoods} />
                      <div className="text-primary">{reservation.count}</div>
                      <img src="assets/images/Mypage-polygon.png" alt="polygon2" className="w-[0.7rem] transform rotate-180 ml-6 mr-6 cursor-pointer" onClick={nextGoods} />
                    </div>
                  </>
                )}
              </div>
            ) : ( // 물품 예약 현황 없으면 렌더링
              <div className="flex justify-center items-center h-4/6">
              <div className="text-primary">예약중인 물품이 없습니다.</div>
            </div>
          )}
        </div>
        )}
          <div className="h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer">
            <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">퍼즐 조각 모으기</div>
          </div>
          <div className="h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8">
            <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">물품 대여</div>
          </div>
        </div>
        <Footer/>
      </div>
      </div>
  );
};

export default Mypage;
