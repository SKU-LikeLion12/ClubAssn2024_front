import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Footer from "../../components/Footer";
import AgreeModal from '../../components/AgreeModal';
import FailModal from '../../components/FailModal';
import Back from '../../components/shared/Back';

const Login = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const showModal =() =>{
    if(id === '' || name ===''){
    setFailModalOpen(true);
    } else {
      setModalOpen(true);
    }
  }

  return (
    <div className='overflow-hidden'>
      <div className='relative min-h-screen'>
      <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'} />
        <div className='flex justify-center text-center textFont text-[#AB7A67] my-8'>
          <div className='py-14 px-8 bg-white rounded-xl border-2 border-[#AB7A67]'>
            <p className='mb-6'>학번: <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" value={id} onChange={(e)=>setId(e.target.value)}/> </p>
            <p>이름: <input type="text" className="border-b-2 ml-2 p-1 focus:outline-none" value={name} onChange={(e)=>setName(e.target.value)}/> </p>
            <input type='button' value='로그인' className='mt-10 bg-[#AB7A67] p-2 px-6 rounded-lg text-white border-[#AB7A67]' onClick={showModal}/>
          </div>
        </div>
        {modalOpen&&<AgreeModal setModalOpen={setModalOpen}/>}
        {failModalOpen && <FailModal setFailModalOpen={setFailModalOpen}/>} {/* 실패 모달 렌더링 */}
        <Back left={'leftPinkMenu'} right={'rightPinkMenu'} />
        <Footer/>
        </div>
    </div>
  );
};

export default Login;