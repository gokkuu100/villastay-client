import React, { useState } from 'react';

function CreateProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    amenities: '',
    status: '',
    images: [null, null, null], // Handle multiple images if needed
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

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    const updatedImages = [...formData.images]
    updatedImages[index] = files[0]
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const form = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach((image) => {
          form.append(`images`, image); 
        });
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/villas/create', {
        method: 'POST',
        body: form,
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
        <label>Select Image 1 </label>
        <input type="file" name="images[0]" accept="image/*" onChange={(e) => handleImageChange(e, 0)}  required /><br />
        <label>Select Image 2 </label>
        <input type="file" name="images[1]" accept="image/*" onChange={(e) => handleImageChange(e, 1)} required /><br />
        <label>Select Image 3 </label>
        <input type="file" name="images[2]" accept="image/*" onChange={(e) => handleImageChange(e, 2)} required /><br />
        <label>Owner ID:</label>
        <input type="text" name="admin_id" value={formData.admin_id} onChange={handleChange} required /><br />

        <input type="submit" value="Create Property" />
      </form>
    </div>
  );
}

export default CreateProperty;
