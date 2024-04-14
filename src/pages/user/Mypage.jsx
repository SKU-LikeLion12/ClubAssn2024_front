import React, {useState, useEffect} from 'react';
import PageTitle from '../../components/PageTitle';
import Footer from '../../components/Footer';
import MyInfo from '../../components/shared/MyInfo';
import { API } from '../../api/API';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import Back from '../../components/shared/Back';

const Mypage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const navLink = isLoggedIn ? 'myPage' : 'login';

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false);
    navigate('/')
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-full relative">
        <PageTitle title={"Puzzle"} Tcolor="#AB7A67"/>
        <MyInfo />
        <div className="flex flex-col mt-7">
          <RentalStatus/>
          <ReserveStatus/>
          <Link to="/collectingpuzzle">
            <div className="h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer">
              <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">퍼즐 조각 모으기</div>
            </div>
          </Link>
          <Link to="/rental">
            <div className="h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8">
              <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">물품 대여</div>
            </div>
          </Link>
          <button onClick={handleLogout} className='h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8'>
            <div className="text-primary text-sm font-bold font-['GyeonggiTitleM']">
              로그아웃
            </div>
          </button>
          <Back left={'myPageLeftBack'} right={'myPageRightBack'} />
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Mypage;

export const RentalStatus = () => {
  // 상태 변수 선언 및 초기화
  const [rentalStatus, setRentalStatus] = useState([]); // 대여 상태 정보 배열
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // 상세 정보 표시 여부
  const [currentItemIndex, setCurrentItemIndex] = useState(0); // 현재 보고 있는 물품 인덱스

  // 대여 상태 정보 가져오는 API 호출 및 처리
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API().get('/item-rent/rent-list'); // 대여 목록 요청
        const data = response.data;

        // 날짜 포맷 변경
        const formattedData = data.map(item => ({
          ...item,
          rentTime: new Date(item.rentTime).toISOString().split('T')[0], // 대여일
          needReturnTime: new Date(item.needReturnTime).toISOString().split('T')[0], // 반납일
        }));

        // 대여 상태 업데이트
        setRentalStatus(formattedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    // 데이터 가져오기
    fetchData();
  }, []);

  // 상세 정보 토글 함수
  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  // 다음 물품 보기 함수
  const nextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % rentalStatus.length);
  };

  // 이전 물품 보기 함수
  const previousItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex - 1 + rentalStatus.length) % rentalStatus.length);
  };

  // 현재 보고 있는 물품 정보
  const currentItem = rentalStatus[currentItemIndex];

  // 연체 메시지 렌더링 함수
  const renderDelayMessage = (state) => {
    switch (state) {
      case 'DELAY':
        return `연체되었습니다. 
        빠른 시일 
        내에 반납해주세요.`;
      case 'LONG_DELAY':
        return '장기 연체 상태입니다. 즉시 반납해주세요.';
      default:
        return null;
    }
  };

  return (
    <>
      {/* 대여 현황 요약 보기 버튼 */}
      {!isDetailsVisible && (
        <div onClick={toggleDetails} className="w-[17rem] h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer">
          <div className="text-primary text-sm font-bold">물품 대여 현황</div>
        </div>
      )}
      {/* 대여 상세 정보 */}
      {isDetailsVisible && (
        <div className="bg-white border-primary border-2 p-4 rounded-lg mb-8 w-[17rem] overflow-y-auto relative">
          <div className="text-primary mb-4 text-center font-bold">물품 대여 현황</div>
          {/* 닫기 버튼 */}
          <img src="../../assets/images/mypage/Xbutton.png" alt="Xbutton" onClick={toggleDetails} className="absolute top-0 right-0 mr-3 mt-4 w-[1rem] cursor-pointer" />
          {/* 물품 정보 */}
          {currentItem && currentItem.count > 0 ? (
            <div className="flex flex-col justify-center items-center text-center">
              <div className="w-[5rem] h-[6rem] border-2 border-primary rounded overflow-hidden mb-3">
                <img src={`data:image/jpeg;base64, ${currentItem.image}`}alt="물품 이미지" className="w-full h-full object-cover" />
              </div>
              <div className="text-primary p-1">{currentItem.itemName}</div>
              <div className="text-primary px-1 pb-1 text-lg font-bold">수량 : {currentItem.count} 개</div>

              {/* 연체 메시지 */}
              {renderDelayMessage(currentItem.state) && (
                <div className="text-red-500 font-medium text-[14px]">
                  {renderDelayMessage(currentItem.state)}
                </div>
              )}

              {/* 대여 정보 */}
              {!renderDelayMessage(currentItem.state) && (
                <>
                  <div className="text-primary font-medium text-[14px]">대여일: {currentItem.rentTime}</div>
                  <div className="text-primary font-medium text-[14px]">반납일: {currentItem.needReturnTime}</div>
                </>
              )}

              {/* 이전/다음 물품 버튼 */}
              <div className="flex justify-center mt-3">
                <img src="../../assets/images/mypage/polygon.png" alt="polygon" onClick={previousItem} className="w-[0.7rem] ml-6 mr-6 cursor-pointer" />
                <div className="text-primary">{currentItemIndex + 1}/</div>
                <div className="text-primary">{rentalStatus.length}</div>
                <img src="../../assets/images/mypage/polygon.png" alt="polygon2" onClick={nextItem} className="w-[0.7rem] transform rotate-180 ml-6 mr-6 cursor-pointer" />
              </div>
            </div>
          ) : (
            // 대여 중인 물품이 없는 경우 메시지 출력
            <div className="flex justify-center items-center h-52">
              <div className="text-primary">대여중인 물품이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};


export const ReserveStatus = () => {
  // 예약 정보를 저장할 상태, 초기값은 빈 배열
  const [reservations, setReservations] = useState([]);
  // 상세 정보 표시 여부를 결정할 상태, 초기값은 false (표시하지 않음)
  const [detailsVisible, setDetailsVisible] = useState(false);
  // 현재 선택된 아이템의 인덱스를 저장할 상태, 초기값은 0
  const [currentIndex, setCurrentIndex] = useState(0);
  // 취소하려는 예약의 ID를 저장할 상태, 초기값은 null
  const [cancelId, setCancelId] = useState(null);
  // 예약 취소 확인 창의 표시 여부를 결정할 상태, 초기값은 false
  const [confirmVisible, setConfirmVisible] = useState(false);
  // 예약 취소가 성공적으로 완료되었는지를 나타내는 상태, 초기값은 false
  const [cancelSuccess, setCancelSuccess] = useState(false);

  // 컴포넌트 마운트 시 예약 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 예약 데이터를 가져오는 API 호출
        const response = await API().get('/item-rent/book-list');
        const data = await response.data;
        setReservations(data); // 가져온 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // 예약 취소 버튼 클릭 시 실행되는 함수
  const cancelReservation = (id) => {
    setCancelId(id); // 취소하려는 예약의 ID 설정
    setConfirmVisible(true); // 취소 확인 창 표시
  };

  // 예약 취소를 확정하는 함수
  const confirmCancel = async () => {
    try {
      // 예약 취소 API 호출
      await API().delete(`/item-rent`, { data: { itemRentId: cancelId } });
      // 취소 성공 시, 해당 예약을 목록에서 제거
      const updated = reservations.filter(item => item.itemRentId !== cancelId);
      setReservations(updated); // 업데이트된 예약 목록으로 상태 업데이트
      setCancelSuccess(true); // 취소 성공 상태를 true로 설정
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  // 예약 취소 성공 후 확인 버튼 클릭 시 실행되는 함수
  const onConfirm = () => {
    // 취소 관련 상태들을 초기화
    setCancelSuccess(false);
    setConfirmVisible(false);
    setCancelId(null);
  };

  // 예약 취소를 거부(아니오 버튼 클릭)하는 함수
  const denyCancel = () => {
    // 취소 관련 상태들을 초기화
    setCancelId(null);
    setConfirmVisible(false);
  };

  // 상세 정보 표시를 토글하는 함수
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  // 다음 아이템을 보기 위해 인덱스를 증가시키는 함수
  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % reservations.length);
    resetCancelState(); // 예약 취소 관련 상태 초기화
  };

  // 이전 아이템을 보기 위해 인덱스를 감소시키는 함수
  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + reservations.length) % reservations.length);
    resetCancelState(); // 예약 취소 관련 상태 초기화
  };

  // 예약 취소 관련 상태를 초기화하는 함수
  const resetCancelState = () => {
    setCancelId(null);
    setConfirmVisible(false);
  };

  // 날짜 포맷을 변경하는 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  // 현재 선택된 예약 정보
  const current = reservations[currentIndex];

  return (
    <>
      {!detailsVisible ? (
        // 상세 정보 표시 토글 버튼
        <div onClick={toggleDetails} className="w-[17rem] h-9 bg-white rounded-full border-2 border-primary flex justify-center items-center mb-8 cursor-pointer">
          <div className="text-primary text-sm font-bold">물품 예약 현황</div>
        </div>
      ) : (
        // 상세 정보 및 예약 취소 기능을 포함하는 컨테이너
        <div className="bg-white border-primary border-2 p-4 rounded-lg mb-8 w-[17rem] overflow-y-auto relative">
          <div className="text-primary mb-4 text-center font-bold">물품 예약 현황</div>
          <img src="../../assets/images/mypage/Xbutton.png" alt="Close" onClick={toggleDetails} className="absolute top-0 right-0 mr-3 mt-4 w-[1rem] cursor-pointer" />
          {cancelSuccess ? (
            // 예약 취소 성공 메시지 및 확인 버튼
            <div className="flex flex-col items-center">
              <p className="text-primary font-medium text-[14px] mb-4">예약이 취소되었습니다.</p>
              <button onClick={onConfirm} className="border-2 border-primary rounded-2xl w-[7rem] h-[2rem] text-primary font-medium text-[0.9rem]">확인</button>
            </div>
          ) : reservations.length > 0 && current ? (
            // 예약된 아이템의 상세 정보 및 조작 버튼
            <div className="flex flex-col justify-center items-center text-center">
              <div className="w-[5rem] h-[6rem] border-2 border-primary rounded overflow-hidden mb-3">
                <img src={`data:image/jpeg;base64,${current.image}`} alt="물품 이미지" className="w-full h-full object-cover" />
              </div>
              <div className="text-primary px-1 pt-1 text-lg font-bold">{current.itemName}</div>
              <div className="text-primary px-1 pb-1 text-lg font-bold">수량 : {current.count} 개</div>
              <div className="text-primary font-medium text-[14px]">{formatDate(current.needReceiveTime)}까지<br/>동아리 연합회실로 방문해주세요.</div>
              {confirmVisible && cancelId === current.itemRentId ? (
                // 예약 취소 확인 버튼
                <div className="flex flex-col justify-center mt-3">
                  <div className='text-center text-primary'>예약을 취소하시겠습니까?</div>
                  <div className='flex justify-center'>
                    <div className='bg-primary rounded-2xl w-[5rem] m-2'>
                      <button onClick={confirmCancel} className="text-white pt-1 font-medium text-[0.9rem] w-full">예</button>
                    </div>
                    <div className='border-primary rounded-2xl border-2 w-[5rem] m-2'>
                      <button onClick={denyCancel} className="text-primary font-medium text-[0.9rem] w-full">아니오</button>
                    </div>
                  </div>
                </div>
              ) : (
                // 예약 취소 버튼
                <div className="border-2 border-primary rounded-2xl w-[7rem] h-[2rem] hover:bg-primary mt-3 mb-2 text-primary font-medium text-[0.9rem] pt-1 hover:text-white" onClick={() => cancelReservation(current.itemRentId)}>
                  예약 취소
                </div>
              )}
              <div className="flex justify-center mt-3">
                <img src="../../assets/images/mypage/polygon.png" alt="Previous Item" onClick={prevItem} className="w-[0.7rem] ml-6 mr-6 cursor-pointer" />
                <div className="text-primary">{currentIndex + 1}/{reservations.length}</div>
                <img src="../../assets/images/mypage/polygon.png" alt="Next Item" onClick={nextItem} className="w-[0.7rem] transform rotate-180 ml-6 mr-6 cursor-pointer" />
              </div>
            </div>
          ) : (
            // 예약된 아이템이 없을 때의 메시지
            <div className="flex justify-center items-center h-48">
              <div className="text-primary mb-4">예약 중인 물품이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};