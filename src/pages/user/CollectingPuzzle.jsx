import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import MyInfo from '../../components/shared/MyInfo';
import Back from '../../components/shared/Back';
import { images } from '../../utils/images';
import { API } from '../../api/API';
import PuzzleModal from '../../components/Modal/PuzzleModal';
import PuzzleInfoModal from '../../components/PuzzleInfoModal';

const CollectingPuzzle = () => {
  const [code, setCode] = useState(''); // 코드 번호 저장 변수
  const [modalOpen, setModalOpen] = useState(false); // 이벤트 상세 모달
  const [infoModalOpen, setInfoModalOpen] = useState(false); // 이벤트 설명 모달
  const [puzzleData, setPuzzleData] = useState([]);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 변수
  const [puzzleLen, setPuzzleLen] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await API().post('/puzzle');
      const puzzleDataArray = result.data.map((item) => ({
        id: item.id,
        name: item.name,
        image: `data:image/jpeg;base64, ${item.image}`,
        date: item.date,
        joined: item.joined
      }));
      setPuzzleData(puzzleDataArray);
      setPuzzleLen(puzzleDataArray.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 데이터를 모두 처리한 후 로딩 상태를 해제
    }
  };

  const showModal = (id) => {
    const puzzleItem = puzzleData.find((data) => data.id === id);
    if (puzzleItem) {
      setSelectedPuzzle(puzzleItem);
      setModalOpen(true);
    }
  };

  const showInfoModal = () => {
    setInfoModalOpen(true);
  };

  const isJoined = (id) => {
    const puzzle = puzzleData.find((data) => data.id === id);
    return puzzle?.joined || false;
  };

  return (
    <div className='relative h-[120vh] text-[#476832]'>
      <Back left={'leftGreen'} right={'rightGreen'} />
      <PageTitle title={'퍼즐 조각'} title2={'모으기'} Tcolor={'#476832'} Tcolor2={'#B7C58B'} />
      <MyInfo />
      <div className='text-center mt-8 mb-5'>
        {puzzleLen === 4 ? (
          <>
            축하합니다 <span role="img" aria-label="축하합니다"> 🎉</span><br />
            퍼즐을 모두 완성하셨네요!
          </>
        ): '퍼즐 조각을 모아 퍼즐을 완성해보세요!'}
      </div>
        <div className='mx-auto w-5/6'>
          <div className='flex justify-end'>
            <button onClick={showInfoModal}><svg width="15" height="15" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.33 11.55C35.38 9.3 34.01 7.27 32.28 5.54C30.54 3.8 28.52 2.44 26.27 1.49C23.94 0.5 21.46 0 18.91 0C16.36 0 13.88 0.5 11.55 1.49C9.3 2.44 7.27 3.81 5.54 5.54C3.8 7.28 2.44 9.3 1.49 11.55C0.5 13.88 0 16.36 0 18.91C0 21.46 0.5 23.94 1.49 26.27C1.92 27.29 2.43 28.26 3.03 29.17L0.21 37.61L8.64 34.8C9.56 35.39 10.53 35.91 11.54 36.34C13.87 37.33 16.35 37.83 18.9 37.83C21.45 37.83 23.93 37.33 26.26 36.34C28.51 35.39 30.54 34.02 32.27 32.29C34.01 30.55 35.37 28.53 36.32 26.28C37.31 23.95 37.81 21.47 37.81 18.92C37.81 16.37 37.31 13.89 36.32 11.56L36.33 11.55ZM18.55 29.92C17.22 29.92 16.19 28.87 16.19 27.46C16.19 26.05 17.22 24.97 18.55 24.97C19.88 24.97 20.91 26.02 20.91 27.46C20.91 28.9 19.88 29.92 18.55 29.92ZM20.12 22.72H16.91C16.25 18.09 21.08 16.29 21.08 13.42C21.08 11.92 20.13 10.9 18.49 10.9C17.21 10.9 16.16 11.55 15.23 12.54L13.19 10.68C14.6 9.08 16.55 7.93 18.94 7.93C22.25 7.93 24.61 9.74 24.61 13.18C24.61 17.21 19.68 18.65 20.12 22.73V22.72Z" fill="#476832"/>
            </svg></button>
          </div>
        </div>
        <div className='relative w-9/12 h-9/12 mx-auto rounded-2xl bg-white border-1 border-[#476832] mb-10'>
        {loading ? (
          <div className='flex justify-center items-center h-full'>
          <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-90'>
            <p className='font-bold z-50'>퍼즐 조각을 불러오고 있습니다...</p>
          </div>
          <img src={images.emptyPuzzle} alt='초기 빈 퍼즐' className='opacity-50' />
         </div>
          ) : (
            <>
              <img src={images.emptyPuzzle} alt='초기 빈 퍼즐' />
              {/* 하나의 퍼즐 조각 예시 */}
              <button onClick={() => showModal(1)} style={{ display: isJoined(1) ? 'block' : 'none' }} disabled={loading}>
                <img src={images.puzzle1} alt="" className='w-[51%] absolute top-0 left-0 z-[3]'/>
              </button>
              <button onClick={() => showModal(2)} style={{ display: isJoined(2) ? 'block' : 'none' }} disabled={loading}>
            <img src={images.puzzle2} alt="" className='w-[64%] absolute top-0 right-0 z-[2]' />
          </button>
          <button onClick={() => showModal(3)} style={{ display: isJoined(3) ? 'block' : 'none' }} disabled={loading}>
            <img src={images.puzzle3} alt="" className='w-[63%] absolute top-[49%] left-0 z-[3]'/>
          </button>
          <button onClick={() => showModal(4)} style={{ display: isJoined(4) ? 'block' : 'none' }} disabled={loading}>
            <img src={images.puzzle4} alt="" className='w-[51%] absolute top-[37%] right-0 z-[2]'/>
          </button>
            </>
          )}
          {modalOpen && <PuzzleModal setModalOpen={setModalOpen} puzzleData={selectedPuzzle}/>}
          {infoModalOpen&&<PuzzleInfoModal setModalOpen={setInfoModalOpen}/>}
        </div>
        <div className='mb-[20vh]'></div>
      {/* <div className='w-9/12 mx-auto text-center my-7'>
        <div className='mb-4'>코드를 입력해주세요.</div>
        <div className='relative'>
          <input value={code} onChange={(e)=>{ setCode(e.target.value);}}
            type="text" className='pl-6 rounded-2xl border-[#476832] w-full bg-[#FCFFE3] border-2 border-[#476832] border-solid p-1'/>
          <input onClick={()=>{ handleCode() }}
            type="submit" value='확인' className='absolute top-0 right-0 bg-[#476832] w-3/12 text-white rounded-2xl p-1 border-2 border-[#476832]'/>
        </div>
      </div> */}
    </div>
  );  
};

export default CollectingPuzzle;