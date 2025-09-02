import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify-otp" element={<VerifyOtp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
