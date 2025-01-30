import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logIn = (userData: any) => {
    localStorage.setItem('token', userData.token);
    setUser(userData.user);
    navigate('/rooms');
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/signin');
  };

  return { user, logIn, logOut };
};
