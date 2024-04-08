import { Route, Routes } from "react-router-dom";
import './css/style.css'
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { useEffect } from "react";
import ScrollToTop from "./components/shared/ScrollToTop.jsx";

function App() {
  return (
    <LoginProvider>
      <div className="App textFont">
        <Routes>
          <Route path="/*" element={<User/>} />
          <Route path="/admin/*" element={<Admin/>} />
        </Routes>
      </div>
      <ScrollToTop />
    </LoginProvider>
  );
}
export default App;
