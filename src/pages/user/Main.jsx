import React from 'react';
import { MainNav } from '../../components/MainNav';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { images } from '../../utils/images';
import Back from '../../components/shared/Back';
import { useLogin } from '../../context/LoginContext';
import '../../css/animation.css';

const Main = () => {
  const { isLoggedIn } = useLogin();
  const linkPuzzle = isLoggedIn ? 'collectingpuzzle' : 'login';
  const linkRental = isLoggedIn ? 'rental' : 'login';

  const navigate = useNavigate();

  const moveCS = () => {
    navigate('/classroomSchedule');
  };

  return (
    <div>
      <div className="relative min-h-screen">
        <div className="relative">
          <div className="relative -z-20">
            <img src={images.rightPinkMenu} alt="오른쪽퍼즐" className="absolute right-0 w-1/2 mt-[100px]" />
            <img src={images.leftPinkMenu} alt="왼쪽퍼즐" className="absolute left-0 w-1/2 mt-[280px]" />
          </div>
          <PageTitle title={'Puzzle'} Tcolor={'#AB7A67'} />
          <div className="textFont text-white text-lg mt-16">
            <div className="flex justify-center mb-10 relative">
              <img src={images.mainPuzzle} className="absolute -z-10 w-[250px]" />
              <div className="grid grid-cols-2 items-center justify-center w-[250px]">
                <Link to={linkPuzzle}>
                  <div className="flex w-[125px] h-[125px] text-center justify-center items-center">
                    퍼즐 조각 <br /> 모으기
                  </div>
                </Link>
                <Link to={linkRental}>
                  <div className="flex w-[125px] h-[125px] text-center justify-center items-center">
                    물품
                    <br />
                    대여
                  </div>
                </Link>
                <Link to="map">
                  <div className="flex w-[125px] h-[125px] text-center justify-center items-center">
                    동아리
                    <br />
                    미니맵
                  </div>
                </Link>
                <button onClick={moveCS}>
                  <div className="flex w-[125px] h-[125px] justify-center items-center">
                    강의실
                    <br />
                    시간표
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Back left={'leftPinkMenu'} right={'rightPinkMenu'} /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Main;
