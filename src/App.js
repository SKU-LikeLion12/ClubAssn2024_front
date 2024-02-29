import { Route, Routes } from "react-router-dom";
import Main from './pages/user/Main';
import Login from "./pages/user/Login";
import Mypage from "./pages/user/Mypage";
import Rental from "./pages/user/Rental";
import Map from "./pages/user/Map";
import Sns from "./pages/user/Sns";
import ClubIntro from "./pages/user/ClubIntro";
import About from "./pages/user/About";
import './css/style.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/myPage" element={<Mypage/>}/>
        <Route path="/rental" element={<Rental/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/sns" element={<Sns/>}/>
        <Route path="/clubIntro" element={<ClubIntro/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
