import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Reviews from './Reviews';


function SingleProperty() {
  const [property, setProperty] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleBookClick = () => {
    navigate(`/booking/${id}`);
  };

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
                <div key={image.id} className="min-w-[25rem] min-h-[28rem]">
                  <img
                    src={`data:image/jpeg;base64,${image.data}`}
                    alt={`Property ${image.id}`}
                    className="w-[28rem] h-[20rem] object-cover rounded-md"
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
            <div>
              <p className='text-gray-800'>Amenities: {property.amenities && property.amenities.join(',')}</p>
            </div>
            <button onClick={handleBookClick} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">Book</button>
          </div>
          <div className='reviews'>
            <h3>Past reviews</h3>
            {property.reviews &&
              property.reviews.map((review) => (
                <div key={review.id} className=" border border-black w-[30rem] gap-[2rem] mb-4">
                  <div className='review-header flex justify-between bg-gray-200 p-2'>
                    <p className="text-gray-500">By {review.guest.fname}</p>
                    <p className="text-gray-500">{review.date}</p>
                  </div>
                  <div className="review-content flex p-1">
                    <p>{review.comment}</p>
                    <div className="ml-[4rem]">{renderRatingStars(review.rating)}</div>
                  </div>
                </div>
              ))}
          </div>
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default SingleProperty;
