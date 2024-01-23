import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function SingleProperty() {
  const [property, setProperty] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProperty = async () => {
      try {
        let response = await fetch(`http://localhost:5000/api/villas/listings/${id}`);
        if (response.ok) {
          let data = await response.json();
          setProperty(data);
        } else {
          throw new Error('Failed to fetch data', response.statusText);
        }
      } catch (error) {
        console.error(`Fetch error ${error}`);
      }
    };

    getProperty();
  }, [id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <>
      <div className="p-4 ">
        <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
        <div className="card flex flex-col items-center">
          <div className="flex flex-wrap -mx-2 mb-4">
            {property.images &&
              property.images.map((image) => (
                <div key={image.id} className="w-full md:w-1/2  xl:w-1/1 px-55 mb-4">
                  <img
                    src={`data:image/jpeg;base64,${image.data}`}
                    alt={`Property ${image.id}`}
                    className="w-[30rem] h-[25rem] object-cover rounded-md"
                  />
                </div>
              ))}
          </div>
          <div className='details text-left'>
            <p className='font-bold text-3xl'>{property.description}</p>
            <p className='text-gray-800'>{property.location}, Nairobi</p>
            <div className='flex'>
            <p className='text-gray-800'>{property.bathroom} bathrooms. </p>
            <p className='text-gray-800'>{property.bedroom} bedrooms.</p>
            <p className='text-gray-800'>{property.price} night.</p>
            </div>
            <p>{property.status}</p>
            {property.reviews && property.reviews.map((review, index) => (<div key={index} className='ml-2'><p>{renderRatingStars(review.rating)}</p></div>))}
            <div>
              <p className='text-gray-800'>Amenities:</p>
              {property.amenities &&
                property.amenities.map((amenity, index) => (
                  <p className='text-gray-800' key={index}>{amenity}</p>
              ))}
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">Book</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProperty;
