import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Select2fa from './Components/Select2fa';
import Verify from './Components/Verify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return localStorage.getItem('token') ? <button onClick={logout}>Çıkış</button> : null;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path='/select2fa' element={<Select2fa/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={token ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <LogoutButton />
    </Router>
  );
}

export default App;