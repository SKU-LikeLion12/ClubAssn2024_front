import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { API }from '../../api/API';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import AdminNav from '../../components/AdminNav';
import { useAuth } from '../../components/AuthContext';
import AdminModal from '../../components/Modal/AdminModal';

const AdminLogin = () => {
  const { setIsAuthenticated } = useAuth();
  const { setIsLoggedIn } = useLogin();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    studentId: '',
    name: ''
  });

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
    const result = await API().post('/login', studentInfo); // 로그인 성공
    console.log(result)
    localStorage.clear()
    localStorage.setItem('Token', result.data.accessToken)
    setIsLoggedIn(true);
    setIsAuthenticated(true);

    if (result.data.role === "ROLE_ADMIN") { // 관리자 권한이면
      navigate('/admin/adminMain'); // 관리자 메인으로 이동
    } else {
      setModalOpen(!modalOpen);
    }
  } catch (error) {
    console.error(error)
    setModalOpen(!modalOpen);
  }
};

  return (
    <>
    <AdminNav />
    <div className='relative min-h-screen'>
      <PageTitle title={'Puzzle'} Tcolor={'#12172B'} />
      <div className='flex justify-center text-center textFont text-[#12172B] my-8'>
        <div className='py-14 px-8 bg-white rounded-xl border-2 border-[#12172B] w-2/3'>
          <div className='flex items-center justify-center'>
            <p className='pt-2'>학번 :</p>
            <input type="text" className="border-b-2 border-[#12172b] w-1/2 ml-2 p-1 focus:outline-none" name='studentId' value={studentInfo.studentId} onChange={handleInputChange}/> 
          </div>
          <div className='flex items-center justify-center mt-4'>
            <p className='pt-2'>이름 :</p>
            <input type="text" className="border-b-2 border-[#12172b] w-1/2 ml-2 p-1 focus:outline-none" name='name' value={studentInfo.name} onChange={handleInputChange}/> 
          </div>
          <input type='button' value='로그인' className='mt-10 bg-[#12172B] p-2 px-6 rounded-lg text-white border-[#12172B]' onClick={handleLogin}/>
        </div>
      </div>
    </div>
    {modalOpen && <AdminModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>} {/* 400 실패 */}
    </>
  );
};

export default AdminLogin;