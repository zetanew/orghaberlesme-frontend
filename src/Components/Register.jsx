import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://16.16.209.196/user/register', formData);

      if (response.status === 200) {
        alert('Success');
        navigate('/profile');
      }
    } catch (error) {
      setError("HATA : " + error.response.data.title);
      console.error('Failed to register:', error.response.data.title);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Kullanıcı Adı" /> <br />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Şifre" /> <br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" /> <br />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon 10 haneli" /> <br />
        <button type="submit">Kaydol</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} <br />
      <p>Zaten hesabınız varsa ? <Link to="/login">Giriş</Link></p>


    </div>
  );
};

export default Register;