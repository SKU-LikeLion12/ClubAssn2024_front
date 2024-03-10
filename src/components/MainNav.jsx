import React, { useEffect, useState } from 'react';
import { GoHome } from "react-icons/go";
import { BsList } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

export const MainNav = () => {
  return (
    <ul className='flex justify-between items-center p-5'>
      <li><Link to='/'><BsList size={30} /></Link></li>
      <li><Link to='/login'><FaUser size={25} /></Link></li>
    </ul>
  )
}

export const PageNav = () => {
  return (
    <ul className='flex justify-between items-center p-5'>
      <li><Link to='/'><BsList size={30} /></Link></li>
      <li><Link to='/'><GoHome size={30} /></Link></li>
    </ul>
  );
};

export const BackNav = ()=> {
  const navigate = useNavigate();
  return (
  <ul className='flex justify-between items-center p-5'>
    <li onClick={()=>{navigate(-1)}}><FaArrowLeft size={30} /></li>
    <li><Link to='/'><GoHome size={30} /></Link></li>
  </ul>
  )
}