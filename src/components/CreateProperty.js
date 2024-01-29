import React, { useState } from 'react';

function CreateProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    amenities: '',
    status: '',
    images: [null, null, null], 
    admin_id: localStorage.getItem('admin_id'),
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
    <div className="min-w-md mx-auto mt-10 p-4 border rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-center mt-5 text-2xl font-semibold mb-4">Create Property</h1>
        <div>
          <label className="mb-1 px-[2rem]">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-[8rem] p-2 border rounded" required />
        </div>
        <div>
          <label className="mb-1 px-[2rem]">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-[20rem] p-2 border rounded" required></textarea>
        </div>
        <div>
          <label className="mb-1 px-[2rem
          ]">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-[10rem] p-2 border rounded" required />
        </div>
        <div>
          <label className="mb-1 px-[2rem]">Price</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-[8rem] p-2 border rounded" required />
        </div>
        <div>
          <label className="mb-1 px-[2rem]">Amenities</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-[8rem] p-2 border rounded" required />
        </div>
        <div>
          <label className="mb-1 px-[2rem]">Status</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-[8rem] p-2 border rounded" required />
        </div>
        <label>Select Image 1 </label>
        <input type="file" name="images[0]" accept="image/*" onChange={(e) => handleImageChange(e, 0)}  required /><br />
        <label>Select Image 2 </label>
        <input type="file" name="images[1]" accept="image/*" onChange={(e) => handleImageChange(e, 1)} required /><br />
        <label>Select Image 3 </label>
        <input type="file" name="images[2]" accept="image/*" onChange={(e) => handleImageChange(e, 2)} required /><br />

        <div>
          <label className="mb-1 px-[2rem]">Owner ID:</label>
          <input type="text" name="admin_id" value={formData.admin_id} onChange={handleChange} className="w-[8rem] p-2 border rounded" required />
        </div>

        <input type="submit" value="Create Property" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer" />
      </form>
    </div>
  );
}

export default CreateProperty;
