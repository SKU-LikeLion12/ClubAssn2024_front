import React, { useEffect, useState } from 'react';
import { BsList } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../utils/images';
import { AiOutlineUser } from "react-icons/ai";

export const MainNav = () => {
  const navigate = useNavigate();
  return (
    <ul className='flex justify-between items-center p-5'>
      <li><Link to='/'><img src={images.puzzle} className='w-8' /></Link></li>
      <div className='flex items-center'>
        <li><Link to='/login'><AiOutlineUser size={30} className='mr-2'/></Link></li>
        <li><Link to='/menu'><BsList size={30} /></Link></li>
      </div>
    </ul>
  )
}

export const MenuNav = ()=> {
  const navigate = useNavigate();
  return (
  <ul className='flex justify-between items-center p-5'>
    <li onClick={()=>{navigate(-1)}}><FaArrowLeft size={30} /></li>
    <li><Link to='/'><img src={images.puzzle} className='w-8' /></Link></li>
  </ul>
  )
}