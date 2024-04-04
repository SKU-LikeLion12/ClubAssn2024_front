import { Route, Routes } from "react-router-dom";
import './css/style.css'
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";
import { AuthProvider } from './components/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="App textFont">
        <Routes>
          <Route path="/user/*" element={<User/>} />
            <Route path="/admin/*" element={<Admin/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
export default App;
