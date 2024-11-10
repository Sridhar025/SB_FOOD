import React, { useState } from 'react';
import '../styles/Restaurants.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className='restaurant-item'>
      <div className="restaurant">
        <img src={restaurant.imageUrl || 'default-image-url.jpg'} alt={restaurant.title} />
        <div className="restaurant-data">
          <h6>{restaurant.title}</h6>
          <p>{restaurant.description || 'Description about product'}</p>
          <h5>Rating: <b>{restaurant.rating || 'N/A'}/5</b></h5>
        </div>
      </div>
    </div>
  );
};

const Restaurants = () => {
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState([]);


  const restaurants = [
    {
      id: 1,
      title: "Chicken Biryani",
      description: "Delicious spicy chicken biryani.",
      rating: 3.6,
      imageUrl: "https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg"
    },
    {
      "id": 2,
      "title": "Paneer Tikka",
      "description": "Grilled marinated paneer cubes with spices.",
      "rating": 4.2,
      "imageUrl": "https://odhi.in/image/cache/catalog/eat/paneer-tikka-odhi-in-eat-online-coimbatore-1000x1000.jpg"
  },
  {
      "id": 3,
      "title": "Vegetable Biryani",
      "description": "Fragrant rice with mixed vegetables and spices.",
      "rating": 4.0,
      "imageUrl": "https://odhi.in/image/cache/catalog/eat/vegetable-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg"
  },
  {
      "id": 4,
      "title": "Butter Chicken",
      "description": "Creamy and buttery chicken in a rich tomato sauce.",
      "rating": 4.5,
      "imageUrl": "https://odhi.in/image/cache/catalog/eat/butter-chicken-odhi-in-eat-online-coimbatore-1000x1000.jpg"
  },
  {
      "id": 5,
      "title": "Samosa",
      "description": "Crispy pastry filled with spiced potatoes and peas.",
      "rating": 4.3,
      "imageUrl": "https://odhi.in/image/cache/catalog/eat/samosa-odhi-in-eat-online-coimbatore-1000x1000.jpg"
  },
  {
      "id": 6,
      "title": "Fish Curry",
      "description": "Spicy fish cooked in a tangy coconut gravy.",
      "rating": 4.1,
      "imageUrl": "https://odhi.in/image/cache/catalog/eat/fish-curry-odhi-in-eat-online-coimbatore-1000x1000.jpg"
  }
  ];

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="restaurants-container">
      <div className="restaurants-filter">
        <h4>Filters</h4>
        <div className="restaurant-filters-body">
          <div className="filter-sort">
            <h6>Sort By</h6>
            <div className="filter-sort-body sub-filter-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOptions"
                  value="popularity"
                  checked={selectedSort === 'popularity'}
                  onChange={handleSortChange}
                  id="sort-popularity"
                />
                <label className="form-check-label" htmlFor="sort-popularity">
                  Popularity
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOptions"
                  value="rating"
                  checked={selectedSort === 'rating'}
                  onChange={handleSortChange}
                  id="sort-rating"
                />
                <label className="form-check-label" htmlFor="sort-rating">
                  Rating
                </label>
              </div>
            </div>
          </div>
          <div className="filter-categories">
            <h6>Categories</h6>
            <div className="filter-categories-body sub-filter-body">
              {['South Indian', 'North Indian', 'Chinese', 'Beverages', 'Ice Cream', 'Tiffins'].map(category => (
                <div className="form-check" key={category}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category}
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label" htmlFor={`category-${category}`}>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="restaurants-body">
        <h3>All Restaurants</h3>
        <div className="restaurants">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
