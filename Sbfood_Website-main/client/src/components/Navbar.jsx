import React, { useContext, useEffect, useState } from 'react';
import { BsCart3, BsPersonCircle } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');
  const { logout, cartCount } = useContext(GeneralContext);
  
  const [productSearch, setProductSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-categories');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMessage('Failed to fetch categories. Please try again later.');
    }
  };

  const handleSearch = () => {
    if (searchResults.includes(productSearch)) {
      navigate(`/category/${productSearch}`);
    } else {
      setErrorMessage('No items found. Try searching for Biriyani, Pizza, etc.');
    }
  };

  return (
    <div className="navbar">
      <h3 onClick={() => navigate('')}>SB Foods</h3>
      <div className="nav-content">
        <div className="nav-search">
          <input
            type="text"
            name="nav-search"
            id="nav-search"
            placeholder="Search Restaurants, cuisine, etc."
            onChange={(e) => setProductSearch(e.target.value)}
            aria-label="Search"
          />
          <FcSearch className="nav-search-icon" onClick={handleSearch} />

          {errorMessage && (
            <div className='search-result-data'>
              {errorMessage}
              <ImCancelCircle
                className='search-result-data-close-btn'
                onClick={() => setErrorMessage('')}
              />
            </div>
          )}
        </div>

        {!usertype ? (
          <button className='btn btn-outline-primary' onClick={() => navigate('/auth')}>
            Login
          </button>
        ) : (
          <div className='nav-content-icons'>
            <div className="nav-profile" onClick={() => navigate('/profile')}>
              <BsPersonCircle className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile" />
              <p>{username}</p>
            </div>
            <div className="nav-cart" onClick={() => navigate('/cart')}>
              <BsCart3 className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cart" />
              <div className="cart-count">{cartCount}</div>
            </div>
          </div>
        )}
      </div>

      {/* Admin or Restaurant User Types */}
      {usertype === 'admin' && (
        <div className="navbar-admin">
          <h3 onClick={() => navigate('/admin')}>SB Foods (Admin)</h3>
          <ul>
            <li onClick={() => navigate('/admin')}>Home</li>
            <li onClick={() => navigate('/all-users')}>Users</li>
            <li onClick={() => navigate('/all-orders')}>Orders</li>
            <li onClick={() => navigate('/all-restaurants')}>Restaurants</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        </div>
      )}

      {usertype === 'restaurant' && (
        <div className="navbar-admin">
          <h3 onClick={() => navigate('/restaurant')}>SB Foods (Restaurant)</h3>
          <ul>
            <li onClick={() => navigate('/restaurant')}>Home</li>
            <li onClick={() => navigate('/restaurant-orders')}>Orders</li>
            <li onClick={() => navigate('/restaurant-menu')}>Menu</li>
            <li onClick={() => navigate('/new-product')}>New Item</li>
            <li onClick={() => logout()}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
