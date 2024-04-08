import React, { useEffect, useState } from 'react';
import { BsList } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../utils/images';
import { AiOutlineUser } from "react-icons/ai";
import { useLogin } from '../context/LoginContext';

// 메인, user에게 보이는 nav
export const MainNav = ({color}) => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const navLink = isLoggedIn ? 'myPage' : 'login';

  return (
    <ul className='Nav flex justify-between items-center p-5 fixed top-0 w-full backdrop-blur-sm'>
      <li><Link to='/user'><img src={images.puzzle} className='w-8' /></Link></li>
      <div className='flex items-center'>
        <li><Link to={navLink}><AiOutlineUser size={30} className='mr-2'/></Link></li>
        <li><Link to='menu'><BsList size={30} /></Link></li>
      </div>
    </ul>
  )
}

// 메뉴 페이지에서 보이는 nav
export const MenuNav = ()=> {
  const navigate = useNavigate();
  return (
  <ul className='Nav flex justify-between items-center p-5 fixed top-0 w-full backdrop-blur-sm z-10'>
    <li onClick={()=>{
      navigate(-1)
      if (window.history.length <= 1) {
        navigate('/user'); // 홈으로 이동
      }
    }}><FaArrowLeft size={30} /></li>
    <li><Link to='/user'><img src={images.puzzle} className='w-8' /></Link></li>
  </ul>
  )
}