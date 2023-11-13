import { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://16.16.209.196/user/login', {
  username,
  password
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});
      console.log(response.data);
      // If login is successful, store the tempToken and redirect to select2fa page
      localStorage.setItem('tempToken', response.data.tempToken);
      navigate('/select2fa');
    } catch (error) {
      // If login fails, display an error message
      if (error.response && error.response.status === 401) {
        setError("hata");
       
      } else {
        setError("hata");
        
      }
      
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı Adı"
        /> <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
        /> <br />
        {error && <div style={{ color: 'red' }}>{error}</div>} <br />
        <button type="submit">Giriş</button> <br />
        <p>Hesabınız yoksa ? <Link to="/register">Kayıt Ol</Link></p>
      </form>
    </div>
  );
};

export default Login;