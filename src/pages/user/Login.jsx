import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Footer from "../../components/Footer";
import AgreeModal from '../../components/AgreeModal';
import FailModal from '../../components/FailModal';
import Back from '../../components/shared/Back';
import * as API from '../../api/API';
import axios from 'axios';
import { APIClient } from '../../api/Auth';

const Login = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const showModal =() =>{
    if(studentNumber === '' || studentName ===''){
    setFailModalOpen(true);
    } else {
      setModalOpen(true);
    }
  }
  
// 로그인 에러 나는 부분 ㅠ
  const handleLogin = async () => {
    try {
        const response = await APIClient().post('/login/',
        {
                "studentId": studentNumber,
                "name": studentName
              });
      console.log(response.data); // 서버 응답 데이터 출력
        // setUpdateDate(response.data.date);
        // setUpdateTime(response.data.time);
    } catch (error) {
        console.error(error);
        console.error('에러 메시지:', error.message); // 오류 메시지 출력
      console.error('스택 트레이스:', error.stack); // 스택 트레이스 출력
      throw new Error('로그인 실패');
    }
}

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('https://test.sku-sku.com/login', {
  //       "studentId": studentNumber,
  //       "name": studentName
  //     });
  //     console.log(response.data); // 서버 응답 데이터 출력
  //     return response.data.token; // 예시: 서버 응답에서 토큰을 어떻게 추출하는지에 따라 수정 필요
  //   } catch (error) {
  //     console.error('에러 메시지:', error.message); // 오류 메시지 출력
  //     console.error('스택 트레이스:', error.stack); // 스택 트레이스 출력
  //     throw new Error('로그인 실패');
  //   }
  // };

  return (
    <div className='overflow-hidden'>
      <div className='relative min-h-screen'>
      <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'} />
        <div className='flex justify-center text-center textFont text-[#AB7A67] my-8'>
          <div className='py-14 px-8 bg-white rounded-xl border-2 border-[#AB7A67]'>
            <p className='mb-6'>
              학번: 
              <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" value={studentNumber} onChange={(e)=>setStudentNumber(e.target.value)}/> </p>
            <p>
              이름:
              <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" value={studentName} onChange={(e)=>setStudentName(e.target.value)}/> </p>
            <input type='button' value='로그인' className='mt-10 bg-[#AB7A67] p-2 px-6 rounded-lg text-white border-[#AB7A67]' onClick={handleLogin}/>
          </div>
        </div>
        {modalOpen&&<AgreeModal setModalOpen={setModalOpen}/>}
        {failModalOpen && <FailModal setFailModalOpen={setFailModalOpen}/>} {/* 실패 모달 렌더링 */}
        <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
        <Footer/>
        </div>
    </div>
  );
};

export default Login;