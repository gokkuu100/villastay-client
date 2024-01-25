import React, { useState, useEffect } from 'react';
import './styles.css';

function Reviews() {
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    guest_id: 2,
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
        window.location.reload();
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
        <div className="flex flex-col ">
          <label htmlFor="comment">Make a review</label>
          <input
            className='w-[30rem] h-[4rem] border border-black mb-2'
            name="comment"
            type='text'
            value={formData.comment}
            onChange={handleChange}
          />
          <div className="flex mb-2">
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
                  checked={formData.rating === value || hoverRating >= value}
                  onChange={handleChange}
                  className="hidden"
                />
                {formData.rating >= value || hoverRating >= value ? "★" : "☆"}
              </label>
            ))}
          </div>
          <button type='submit' className="bg-blue-500 text-white py-2 px-4 mt-2 w-[10rem] rounded">Submit Review</button>
        </div>
      </form>
      <div>
        <h3>Date: {currentDate}</h3>
      </div>
    </div>
  );
}

export default Reviews;
