import { Route, Routes } from "react-router-dom";
import './css/style.css'
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { useEffect } from "react";
import ScrollToTop from "./components/shared/ScrollToTop.jsx";
import { getCookie, setCookie } from './utils/cookie';
import axios from 'axios';


function App() {
  useEffect(() => {
    const cookie = getCookie('visitor');
    if (!cookie) {
      const currentDate = new Date();
      const expiresDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1, // 다음 날로 설정
        0, // 시간을 00시로 설정
        0, // 분을 00분으로 설정
        0, // 초를 00초로 설정
      );
      // 시차 보정
      setCookie('visitor', 'visitor', { path: './', expires: expiresDate, secure: true });
      callAPI();
    }
  }, []);

  const callAPI = () => {
    axios.get('https://api.sku-sku.com/visitors/puzzle')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('API Error: ', error);
      })
  }

  return (
    <LoginProvider>
      <div className="App textFont">
        <Routes>
          <Route path="/*" element={<User/>} />
          <Route path="/admin/*" element={<Admin/>} />
        </Routes>
      <ScrollToTop />
      </div>
    </LoginProvider>
  );
}
export default App;
