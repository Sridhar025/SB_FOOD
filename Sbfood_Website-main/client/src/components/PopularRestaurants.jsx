import React, { useEffect, useState } from 'react';
import '../styles/PopularRestaurants.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopularRestaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [promoteList, setPromoteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantsResponse, promotionsResponse] = await Promise.all([
          axios.get('http://localhost:3000/fetch-restaurants'),
          axios.get('http://localhost:3000/fetch-promoted-list'),
        ]);

        setRestaurants(restaurantsResponse.data);
        setPromoteList(promotionsResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Error message
  }

  const promotedRestaurants = restaurants.filter(restaurant => promoteList.includes(restaurant._id));

  return (
    <div className="popularRestaurantContainer">
      <h3>Popular Restaurants</h3>
      <div className="popularRestaurant-body">
        {promotedRestaurants.length > 0 ? (
          promotedRestaurants.map((restaurant) => (
            <div
              className="popularRestaurantCard"
              key={restaurant._id}
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
            >
              <img src={restaurant.mainImg} alt={restaurant.title} />
              <div className="popularRestaurantCard-data">
                <h6>{restaurant.title}</h6>
                <p>{restaurant.address}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No popular restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularRestaurants;
