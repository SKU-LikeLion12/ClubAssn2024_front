import React, { useEffect, useState } from 'react';
import { GoHome } from "react-icons/go";
import { BsList } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul className='flex justify-between items-center p-5'>
        <li><Link to='/'><BsList size={30} /></Link></li>
        <li><Link to='/'><GoHome size={30} /></Link></li>
      </ul>
    </div>
  );
};

export default Nav;

const MainNav = () => {
  return (
    <>
      <ul className='flex justify-between items-center p-5'>
        <li><Link to='/'><BsList size={30} /></Link></li>
        <li><Link to='/login'><FaUser size={25} /></Link></li>
      </ul>
    </>
  )
}