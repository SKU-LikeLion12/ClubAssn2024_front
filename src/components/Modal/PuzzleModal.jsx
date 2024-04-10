import React from 'react'
import { images } from '../../utils/images';
import { IoCloseSharp } from "react-icons/io5";

function PuzzleModal({setModalOpen, puzzleData}) {
    const closeModal =()=>{
        setModalOpen(false);
    };
  return (
    <div className='absolute z-50 top-0 bottom-0 inset-0'>
        <div className='relative flex justify-center items-center border-4 border-[#476832] rounded-2xl p-5 text-center bg-[#FCFFE3]'>
            <div className='inset-0'>
                <div className='flex justify-end items-start'>
                    <button onClick={closeModal}><IoCloseSharp size="25" color="#476832" /></button>
                </div>
                <div className='p-5 textFont'>
                    <div className='box w-2/3 h-2/3'></div>
                    <img src={puzzleData.image} className='mb-5 w-2/3 mx-auto'/>
                    <p className='text-xl'>{puzzleData.name}</p>
                    <p>{puzzleData.date}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PuzzleModal;