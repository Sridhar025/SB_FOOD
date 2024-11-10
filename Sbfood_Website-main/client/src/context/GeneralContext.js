import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    usertype: '',
    restaurantAddress: '',
    restaurantImage: '',
  });
  
  const [productSearch, setProductSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get('http://localhost:3000/fetch-cart');
        setCartCount(response.data.filter(item => item.userId === userId).length);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    }
  };

  const handleSearch = () => {
    navigate('#products-body');
  };

  const navigateBasedOnUserType = (usertype) => {
    if (usertype === 'customer') {
      navigate('/');
    } else if (usertype === 'admin') {
      navigate('/admin');
    } else if (usertype === 'restaurant') {
      navigate('/restaurant');
    }
  };

  const login = async () => {
    try {
      const { email, password } = userInfo;
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { _id, usertype, username, email: userEmail } = response.data;

      localStorage.setItem('userId', _id);
      localStorage.setItem('userType', usertype);
      localStorage.setItem('username', username);
      localStorage.setItem('email', userEmail);
      navigateBasedOnUserType(usertype);
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', userInfo);
      const { _id, usertype, username, email: userEmail } = response.data;

      localStorage.setItem('userId', _id);
      localStorage.setItem('userType', usertype);
      localStorage.setItem('username', username);
      localStorage.setItem('email', userEmail);
      navigateBasedOnUserType(usertype);
    } catch (error) {
      alert("Registration failed!");
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{
      login,
      register,
      logout,
      userInfo,
      setUserInfo,
      setProductSearch,
      productSearch,
      handleSearch,
      cartCount,
      fetchCartCount,
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
