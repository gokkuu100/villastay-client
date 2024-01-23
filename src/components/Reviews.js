import React, { useState, useEffect } from 'react';
import './styles.css';

function Reviews() {
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    guest_id: 1,
    property_id: 1
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return today.toLocaleDateString(undefined, options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const handleHover = (rating) => {
    setHoverRating(rating);
  };

  const handleClick = (rating) => {
    setFormData({ ...formData, rating });
    setHoverRating(rating); // Set hoverRating to the clicked rating
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/villas/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, formData);
      } else {
        throw new Error("Could not create a new review.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitReview}>
        <div className="flex flex-col items-center">
          <label htmlFor="comment">Make a review</label>
          <input
            className='w-[20rem] h-[8rem] border border-black mb-2'
            name="comment"
            type='text'
            value={formData.comment}
            onChange={handleChange}
          />
          <div className="flex items-center mb-2">
            <label htmlFor="rating" className="mr-2">Rate the Villa:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className="cursor-pointer mr-2"
                onClick={() => handleClick(value)}
                onMouseEnter={() => handleHover(value)}
                onMouseLeave={() => handleHover(0)}
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={hoverRating >= value}
                  onChange={handleChange}
                  className="hidden"
                />
                {hoverRating >= value ? "★" : "☆"}
              </label>
            ))}
          </div>
          <button type='submit' className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">Submit Review</button>
        </div>
      </form>
      <div>
        <h3>Date: {currentDate}</h3>
      </div>
    </div>
  );
}

export default Reviews;
