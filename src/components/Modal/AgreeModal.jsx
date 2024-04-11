import React from 'react';
import { API } from '../../api/API';

function AgreeModal({setModalOpen, studentInfo, handleLogin}) {
    const closeModal =()=>{
        setModalOpen(false);
    };

    // 동의했을 때
    const handleAgree = async () => {
        try {
            await API().post('/agree', studentInfo); // 성공적으로 처리되면
            handleLogin(studentInfo); // 다시 로그인 함수 호출
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className='absolute z-50 top-20 break-keep'>
            <div className='LoginModal flex justify-center items-center textFont border-2 border-[#AB7A67] rounded-2xl pt-10 pb-3 mx-4 bg-white h-[80vh] overflow-y-scroll'>
                <div className='text-center p-4'>
                    <div className=''>
                        <p className='text-xl text-[#AB7A67] mb-3'>Puzzle 웹사이트 사용을 위한<br/>개인정보 수집 이용 및 제공 동의서</p>
                        <p className='text-sm my-6'>동아리 연합회는 동아리에 소속된 학우에게 아래와 같이<br/>개인정보 수집이용 및 제3자에게 제공하고자 합니다.</p>
                        <p className='text-sm text-[#AB7A67] my-6'>내용을 자세히 읽으신 후,<br/>동의 여부를 결정하여 주십시오</p>
                    </div>
                    <div className='text-sm mb-10'>
                        <div className='flex justify-center border-2 border-[#AB7A67] rounded-3xl p-4 my-2'>
                            <p className='mr-4 text-[#AB7A67]'>수집이용 항목</p>
                            <p className='ml-4 '>이름, 학번, 행사 참여 명단</p>
                        </div>
                        <div className='flex justify-center border-2 border-[#AB7A67] rounded-3xl p-4 my-2'>
                            <p className='mr-4 text-[#AB7A67]'>수집이용 목적</p>
                            <p className='ml-4 '>행사 참여에 따른 대상자 관리</p>
                        </div>
                        <div className='flex justify-center items-center border-2 border-[#AB7A67] rounded-3xl p-2 my-2'>
                            <p className='mr-4 text-[#AB7A67]'>보유 기간</p>
                            <p className='ml-4 '>수집 이용 동의일부터 개인정보<br/>수집이용 목적을 달성할 때까지</p>
                        </div>
                    </div>
                    <p className='text-[#AB7A67] text-sm mb-5'>※ 위의 개인정보 수집&이용에 대한 동의를 거부할<br/>
                    권리가 있습니다. 그러나 동의를 거부할 경우<br/>
                    Puzzle 웹사이트 사용에 제한이 되어 이용하실 수 없습니다.</p>
                    <div className='p-3 border-2 border-[#AB7A67] rounded-3xl mx-5 mb-5'>
                        <p className='text-[#AB7A67] text-sm '>위와 같이 개인정보를 수집&이용하는데<br/>동의하십니까?</p>
                    </div>
                    <div>
                        <input type='button' 
                            onClick={handleAgree}
                            value='동의' className='bg-[#AB7A67] text-white rounded-2xl p-1 px-9 mr-2'/>
                        <input type='button' value='취소' className='text-[#AB7A67] border-2 border-[#AB7A67] rounded-2xl p-1 px-9 ml-2' onClick={closeModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgreeModal;