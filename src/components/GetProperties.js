import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { Link } from 'react-router-dom';

function GetProperties() {
  const [listings, setListings] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    price: '',
    rating: '',
  })

  useEffect(() => {
    getListings();
  }, [searchParams]);

  const getListings = async () => {
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      let response = await fetch(`http://localhost:5000/api/villas/listings?${queryString}`);
      if (response.ok) {
        let data = await response.json();
        setListings(data);
      } else {
        throw new Error('Failed to fetch data', response.statusText);
      }
    } catch (error) {
      console.log(`Error fetching: ${error}`);
    }
  };

  const handleSearch = () => {
    const validRating = Math.min(5, Math.max(0, searchParams.rating))
    setSearchParams({ ...searchParams, rating: validRating})
    getListings();
  }

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  }

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <div className="custom-next-arrow" onClick={onClick} />;
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <div className="custom-prev-arrow" onClick={onClick} />;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <div>
        {/* Search bar UI */}
        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="flex flex-wrap -mx-4 ml-4">
        {Array.isArray(listings) && listings.length > 0 ? (
          listings.map((property) => (
            <div key={property.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
              <div className="shadow-md rounded-md flex flex-col">
                <Link to={`/villas/${property.id}`}>
                  <Slider {...settings}>
                    {property.images.map((image) => (
                      <div key={image.id} className="image-container">
                        <img
                          src={`data:image/png;base64,${image.data}`}
                          className="w-full h-[15rem] object-cover rounded-md"
                          alt={`${image.id}`}
                        />
                      </div>
                    ))}
                  </Slider>
                </Link>
                <div className="text-container mt-4 flex flex-col items-start">
                  <p className="text-lg font-semibold mb-2">{property.title}</p>
                  <p className="text-gray-600 mb-2">{property.location}, Kenya</p>
                  <p className="text-gray-600 mb-2">{property.price} night</p>
                  <p className="text-gray-600 mb-2">Status: {property.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
}

export default GetProperties;
