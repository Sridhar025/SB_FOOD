import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const { 
    setUsername, 
    setEmail, 
    setPassword, 
    setUsertype, 
    usertype, 
    setRestaurantAddress, 
    setRestaurantImage, 
    register 
  } = useContext(GeneralContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true); 

    try {
      await register();
      
    } catch (err) {
      setError('Registration failed. Please try again.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="text" 
          className="form-control" 
          id="floatingInput" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="email" 
          className="form-control" 
          id="floatingEmail" 
          placeholder="name@example.com" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="password" 
          className="form-control" 
          id="floatingPassword" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <select 
        className="form-select form-select-lg mb-3" 
        aria-label=".form-select-lg example" 
        onChange={(e) => setUsertype(e.target.value)} 
        required
      >
        <option value="">User type</option>
        <option value="admin">Admin</option>
        <option value="restaurant">Restaurant</option>
        <option value="customer">Customer</option>
      </select>

      {usertype === 'restaurant' && (
        <>
          <div className="form-floating mb-3 authFormInputs">
            <input 
              type="text" 
              className="form-control" 
              id="floatingAddress" 
              placeholder="Address" 
              onChange={(e) => setRestaurantAddress(e.target.value)} 
              required 
            />
            <label htmlFor="floatingAddress">Address</label>
          </div>
          <div className="form-floating mb-3 authFormInputs">
            <input 
              type="text" 
              className="form-control" 
              id="floatingImage" 
              placeholder="Image" 
              onChange={(e) => setRestaurantImage(e.target.value)} 
              required 
            />
            <label htmlFor="floatingImage">Thumbnail Image</label>
          </div>
        </>
      )}

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
      <p>
        Already registered? <span onClick={() => setIsLogin(true)}>Login</span>
      </p>
    </form>
  );
};

export default Register;
