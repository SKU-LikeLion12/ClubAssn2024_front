import React from 'react';
import { GoHome } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

export default function AdminNav() {
  const navigate = useNavigate();
  const backBtn = () => {
    navigate(-1);
  };
  return (
    <>
      <div>
        <ul className='Nav flex justify-between items-center p-5 bg-[#12172B] fixed z-20 top-0 w-full'>
          <li onClick={backBtn}><FaArrowLeft size={30} color='#ffffff' /></li>
          <li><Link to='/admin/adminMain'><GoHome size={30} color='#ffffff' /></Link></li>
        </ul>
      </div>
    </>
  )
}
