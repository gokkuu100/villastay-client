import React, { useState } from 'react';

function CreateProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    amenities: '',
    status: '',
    images: null, // Handle multiple images if needed
    admin_id: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = name === 'price' || name === 'admin_id' ? parseInt(value, 10) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: convertedValue,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          form.append('images', formData.images[i]);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/villas/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(formData);
        console.log('Property created successfully:', data);
        
        // Optionally, you can redirect or update state after successful submission
      } else {
        console.log(formData);
        console.log([...form.entries()]);
        console.error('Failed to create property:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mt-5">Create Property</h1>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required /><br />
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea><br />
        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required /><br />
        <label>Price</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required /><br />
        <label>Amenities</label>
        <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} required /><br />
        <label>Status</label>
        <input type='text' name='status' value={formData.status} onChange={handleChange} required></input><br />
        <label>Select Images: </label>
        <input type="file" name="images" accept="image/*" onChange={handleImageChange} multiple required /><br />
        <label>Owner ID:</label>
        <input type="text" name="admin_id" value={formData.admin_id} onChange={handleChange} required /><br />

        <input type="submit" value="Create Property" />
      </form>
    </div>
  );
}

export default CreateProperty;
