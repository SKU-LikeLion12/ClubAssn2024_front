import React from 'react';
import Footer from "../../components/Footer";

const Login = () => {
  return (
    <div className='overflow-hidden'>
      <div className='relative'>
        <p>Puzzle</p>
        <div className='flex justify-end'>
          <img src="assets/images/puzzle/backPuzzleT.png" className='absolute z-[-10] w-2/5 h-auto'/>
        </div>
        <div className='flex justify-center text-center textFont text-[#AB7A67] my-10'>
          <div className='py-14 px-8 bg-white rounded-xl border-2 border-[#AB7A67]'>
            <p className='mb-6'>학번: <input type="text" className="border-b-2 ml-2" /> </p>
            <p>이름: <input type="text" className="border-b-2 ml-2" /> </p>
            <input type='button' value='로그인' className='mt-10 bg-[#AB7A67] p-2 px-6 rounded-lg text-white border-[#AB7A67]'/>
          </div>
        </div>
        <div className='flex justify-start'>
          <img src="assets/images/puzzle/backPuzzleB.png" className='absolute z-[-10] w-2/5 h-auto top-[18rem]'/>
        </div>
        </div>
      <Footer/>
    </div>
  );
};

export default Login;