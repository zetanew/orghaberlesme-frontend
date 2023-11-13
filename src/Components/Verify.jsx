import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tempToken = localStorage.getItem('tempToken');
    if (!tempToken) {
      navigate('/login');
    }
  }, [navigate]);


  const verify = async () => {
    const tempToken = localStorage.getItem('tempToken');

    try {
      const response = await axios.post('http://16.16.209.196/user/verify', {
        TempToken: tempToken,
        TwoFactorCode: twoFactorCode
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.removeItem('tempToken');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Failed to verify:', error);
      setError('Failed to verify');
    }
  };

  return (
    <div>
      <p>Lütfen size gönderilen kodu 2 dakika içerisinde girin </p>
      <input type="text" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)} placeholder="Enter 2FA code" />
      <button onClick={verify}>Onayla</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Verify;