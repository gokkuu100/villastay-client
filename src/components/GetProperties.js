import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

function GetProperties() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/villas/listings');
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
      <div className="flex flex-wrap -mx-4 ml-4">
        {listings.map((property) => (
          <div key={property.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="shadow-md rounded-md flex flex-col">
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
              <div className="text-container mt-4 flex flex-col items-start">
                <p className="text-lg font-semibold mb-2">{property.title}</p>
                <p className="text-gray-600 mb-2">{property.location}, Kenya</p>
                <p className="text-gray-600 mb-2">{property.price} night</p>
                <p className="text-gray-600 mb-2">Status: {property.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetProperties;
