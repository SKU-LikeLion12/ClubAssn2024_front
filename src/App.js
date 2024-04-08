import { Route, Routes } from "react-router-dom";
import './css/style.css'
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";
import { AuthProvider } from './components/AuthContext.jsx';
import { LoginProvider } from "./context/LoginContext.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <LoginProvider>
        <div className="App textFont">
          <Routes>
            <Route path="/user/*" element={<User/>} />
            <Route path="/admin/*" element={<Admin/>} />
          </Routes>
        </div>
      </LoginProvider>
    </AuthProvider>
  );
}
export default App;
