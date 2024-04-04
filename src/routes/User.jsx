import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Main from '../pages/user/Main.jsx';
import Login from "../pages/user/Login.jsx";
import Mypage from "../pages/user/Mypage.jsx";
import Rental from "../pages/user/Rental/Rental.jsx";
import {Map,StudentUnion,StudentCenter} from "../pages/user/Map.jsx";
import Sns from "../pages/user/Sns.jsx";
import ClubIntro from "../pages/user/ClubIntro.jsx";
import About from "../pages/user/About.jsx";
import {MainNav, MenuNav} from "../components/MainNav.jsx";
import Menu from "../pages/user/Menu.jsx";
import RentalBook from "../pages/user/Rental/RentalBook.jsx";
import RentalConfirm from "../pages/user/Rental/RentalConfirm.jsx";
import ClubSNS from "../components/ClubSNS.jsx";
import CollectingPuzzle from '../pages/user/CollectingPuzzle.jsx';

const User = () => {
  const location = useLocation();
  const path = location.pathname;  
  const navPaths = ['/menu', '/sns', '/clubintro', '/about'];
  const isNavPath = navPaths.includes(path);

  return (
      <div>
        {isNavPath ? <MenuNav /> : <MainNav />}
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/myPage" element={<Mypage/>}/>

          <Route path="/rental" element={<Rental/>}/>
          <Route path="/rentalBook" element={<RentalBook/>} />
          <Route path="/rentalConfirm" element={<RentalConfirm/>} />

          <Route path="/map/*" element={<Map />}>
            <Route index element={<StudentUnion />} />
            <Route index path="studentUnion" element={<StudentUnion />} />  
            <Route path="studentCenter" element={<StudentCenter />} />
            <Route path="clubSNS" element={<ClubSNS />} />
          </Route>

          <Route path="/menu" element={<Menu/>}/>
          <Route path="/sns" element={<Sns/>}/>
          <Route path="/clubIntro" element={<ClubIntro/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/collectingpuzzle" element={<CollectingPuzzle />}/>
        </Routes>
      </div>
  );
};

export default User;