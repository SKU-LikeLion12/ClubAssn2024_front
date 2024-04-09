import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNav from './../../components/AdminNav';
import PageTitle from './../../components/PageTitle';
import { useAuth } from '../../components/AuthContext';

const User = {
  id: 'puzzle40',
  pw: 'dlatjdwn4040'
}

const AdminLogin = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);
  
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$/;
    if(regex.test(e.target.value)) {
      setIdValid(true);
    }else{
      setIdValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const confirmMessage = () => {
    if(id === User.id && pw === User.pw) {
      setIsAuthenticated(true);
      alert('로그인에 성공했습니다.');
      navigate('/admin/adminMain')
    }else {
      alert('등록되지 않은 회원입니다.');
    }
  }

  return (
    <>
      <AdminNav />
      <div>
        <PageTitle title='Puzzle' Tcolor='#12172B' />
        <div className='flex flex-col justify-center mx-auto mt-12 p-5 w-10/12 border-2 border-[#12172b] rounded-md '>
          <div className='text-3xl text-center'>로그인</div>
          <div className='flex mt-8 mb-4 justify-center'>
            <div className='w-3/12 my-auto text-center mr-2'>아이디</div>
            <input type="text" 
                   className='border-2 p-2 rounded-md'
                   placeholder='아이디를 입력해주세요.'
                   value={id}
                   onChange={handleId}/>
          </div>
          <div className='flex mt-4 mb-8 justify-center'>
            <div className='w-3/12  my-auto text-center mr-2'>비밀번호</div>
            <input type="password" 
                   className='border-2 p-2 rounded-md' 
                   placeholder='비밀번호를 입력해주세요.'
                   value={pw}
                   onChange={handlePw}/>
          </div>
          <button className='adminLoginBtn text-xl text-[#ffffff] border-2 bg-[#12172b] px-2 py-1 mx-auto text-center rounded-md w-5/12 
                          hover:bg-[#ffffff] hover:text-[#12172b] hover:border-2 hover:border-[#12172b] cursor-pointer
                          disabled:bg-[#dadada] disabled:text-[#ffffff]'
               disabled={notAllow} 
               onClick={confirmMessage}>
            로그인
          </button>
        </div>
      </div> 
    </>
  );
};

export default AdminLogin;