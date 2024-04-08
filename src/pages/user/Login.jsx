import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Footer from "../../components/Footer";
import AgreeModal from '../../components/AgreeModal';
import FailModal from '../../components/FailModal';
import Back from '../../components/shared/Back';
import { API }from '../../api/API';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    studentId: '',
    name: ''
  });

  const showModal =() =>{
    if(studentInfo.studentId === '' || studentInfo.name ===''){
    setFailModalOpen(true);
    } else {
      setModalOpen(true);
    }
  }

// 이름,학번 입력
const handleInputChange = (e) => {
  setStudentInfo({
    ...studentInfo,
    [e.target.name]: e.target.value
  })
}

// 로그인
const handleLogin = async () => {
  try {
    console.log(studentInfo)
    const result = await API().post('/login', studentInfo); // 로그인 성공
    navigate('/user/myPage'); 
    localStorage.clear()
    localStorage.setItem('Token', result.data.accessToken)
    setIsLoggedIn(true);
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 400) { // 400 : 학번 or 이름 틀렸을 경우
        setFailModalOpen(!failModalOpen);
        setStudentInfo({
          studentId: '',
          name: ''
        });
      } else { // 401 : 개인정보 동의하지 않았을 경우
        setModalOpen(!modalOpen);
      }
    }
  }
};

  return (
      <div className='relative'>
        <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'} />
        <div className='flex justify-center text-center textFont text-[#AB7A67] my-8'>
          <div className='py-14 px-8 bg-white rounded-xl border-2 border-[#AB7A67]'>
            <p className='mb-6'>
              학번:
              <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" name='studentId' value={studentInfo.studentId} onChange={handleInputChange}/> </p>
            <p>
              이름:
              <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" name='name' value={studentInfo.name} onChange={handleInputChange}/> </p>
            <input type='button' value='로그인' className='mt-10 bg-[#AB7A67] p-2 px-6 rounded-lg text-white border-[#AB7A67]' onClick={handleLogin}/>
          </div>
        </div>

        {modalOpen&&<AgreeModal studentInfo={studentInfo} handleLogin={handleLogin} setModalOpen={setModalOpen}/>} {/* 401 동의 */}
        {failModalOpen && <FailModal setFailModalOpen={setFailModalOpen}/>} {/* 400 실패 */}
        <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
        <Footer/>
      </div>
  );
};

export default Login;
