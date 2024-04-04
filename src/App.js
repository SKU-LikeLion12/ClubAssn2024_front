import { Route, Routes } from "react-router-dom";
import './css/style.css'
import User from "./routes/User.jsx";
import Admin from "./routes/Admin.jsx";

function App() {
  return (
      <div className="App textFont">
        <Routes>
          <Route path="/user/*" element={<User/>} />
          <Route path="/admin/*" element={<Admin/>} />
        </Routes>
      </div>
  );
}
export default App;
