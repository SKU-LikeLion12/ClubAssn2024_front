import { Route, Routes, useLocation } from "react-router-dom";
import Main from './pages/user/Main';
import Login from "./pages/user/Login";
import Mypage from "./pages/user/Mypage";
import Rental from "./pages/user/Rental/Rental.jsx";
import {Map,StudentUnion,StudentCenter} from "./pages/user/Map";
import Sns from "./pages/user/Sns";
import ClubIntro from "./pages/user/ClubIntro";
import About from "./pages/user/About";
import Nav from "./components/Nav";
import './css/style.css'
import {MainNav, MenuNav} from "./components/MainNav";
import Menu from "./pages/user/Menu";
import RentalBook from "./pages/user/Rental/RentalBook.jsx";
import RentalConfirm from "./pages/user/Rental/RentalConfirm.jsx";
import ClubSNS from "./components/ClubSNS.jsx";
import AdminMain from "./pages/admin/AdminMain.jsx";
import ItemReservationStatus from "./pages/admin/ItemReservationStatus.jsx";
import ItemRentalStatus from "./pages/admin/ItemRentalStatus.jsx";
import RentalItemManagement from "./pages/admin/RentalItemManagement.jsx";
import PuzzlePieceManagement from "./pages/admin/PuzzlePieceManagement.jsx";
import ClubMemberManagement from "./pages/admin/ClubMemberManagement.jsx";
import ClubManagement from "./pages/admin/ClubManagement.jsx";
import TimetableManagement from "./pages/admin/TimetableManagement.jsx";
function App() {
  const location = useLocation();
  const path = location.pathname;  
  const navPaths = ['/menu', '/sns', '/clubintro', '/about'];
  const isNavPath = navPaths.includes(path);

  return (
      <div className="App textFont">
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

          {/* admin */}
          <Route path="/adminMain" element={<AdminMain/>}/>
          <Route path="/ItemReservationStatus" element={<ItemReservationStatus />}/>
          <Route path="/ItemRentalStatus" element={<ItemRentalStatus />}/>
          <Route path="/RentalItemManagement" element={<RentalItemManagement/>}/>
          <Route path="/PuzzlePieceManagement" element={<PuzzlePieceManagement/>}/>
          <Route path="/ClubMemberManagement" element={<ClubMemberManagement/>}/>
          <Route path="/ClubManagement" element={<ClubManagement/>}/>
          <Route path="/TimetableManagement" element={<TimetableManagement/>}/>
        </Routes>
      </div>
  );
}
export default App;
