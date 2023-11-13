import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Select2fa = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const tempToken = localStorage.getItem('tempToken');
    if (!tempToken) {
      navigate('/login');
    }
  }, [navigate]);

 


  const selectMethod = async (method) => {
    const tempToken = localStorage.getItem('tempToken');

    try {
      await axios.post('http://16.16.209.196/user/select-2fa-method', {
        TempToken: tempToken,
        TwoFactorMethod: method
      });

      navigate('/verify');
    } catch (error) {
      console.error('Failed to select 2FA method:', error);
      setError('Failed to select 2FA method');
    }
  };

  return (
    <div>
      <h3>Lütfen onaylama yönteminizi seçiniz : </h3>
      <button onClick={() => {selectMethod('sms');}}>SMS</button>
      <button onClick={() => {selectMethod('email');}}>Email</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Select2fa;