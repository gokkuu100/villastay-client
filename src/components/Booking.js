import React, { useEffect, useState } from 'react'
import Home from './Home';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

function Booking() {
    const [formData, setFormData] = useState({
        checkOutDate: "",
        checkInDate: "",
        bookingDate: "",
        price: "",
        paymentStatus: "False",
        property_id: 1,
        guest_id: 1
    })  

    const location = useLocation();
    const property = location.state ? location.state.property : null;
    const currentDate = location.state ? location.state.currentDate : null;

    // useEffect to update formData when property changes
    useEffect(() => {
        if (property) {
            setFormData(prevFormData => ({
                ...prevFormData,
                property_id: property.id,
                price: property.price,  // You may want to update other fields as needed
                bookingDate: currentDate
            }));
        }
    }, [property, currentDate]);

    const paymentStatus = formData.paymentStatus.toLowerCase() === 'true';
    const updatedFormData = {
        ...formData,
        paymentStatus: paymentStatus,
    };
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({...prevFormData, [name]:value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            const response = await fetch (`http://localhost:5000/api/villas/booking`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedFormData)
            });
            if (response.ok) {
                const data = await response.json()
                console.log(formData, data)
                alert("Booking Successful!");
            } else {
                throw new Error('Something went wrong!', response.statusText);
            }
        } catch(error) {
            console.error("Error");
        }
    }

  return (
    <div>
        <Home />
        <h2>Booking Menu</h2>
        <p>Property Name: {property ? property.title : 'N/A'}</p>
        <p>Price: {property ? `Ksh ${property.price}` : 'N/A'}</p>
        <form className='mb-[11rem]'>
            <label htmlFor="checkOut" className="text-sm font-medium text-gray-600" >Check Out Date: </label>
            <input type='date' name='checkOutDate' value={formData.checkOutDate} min={currentDate} onChange={handleChange} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='checkIn' className="text-sm font-medium text-gray-600" >Check In Date: </label>
            <input type='date' name='checkInDate' value={formData.checkInDate} onChange={handleChange} min={currentDate} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='booking' className="text-sm font-medium text-gray-600">Booking Date: </label>
            <input type='date' name='bookingDate' value={formData.bookingDate} onChange={handleChange} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='price' className="text-sm font-medium text-gray-600">Price</label>
            <input type='text' name='price' value={formData.price} onChange={handleChange} className="mt-1 p-2 border rounded w-[4rem]" readOnly></input><br />
            <label htmlFor='paymentStatus' className="text-sm font-medium text-gray-600">paymentStatus: </label>
            <label type='text' name='paymentStatus'>{formData.paymentStatus}</label><br />
            <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>
        <Footer/>
    </div>
  )
}

export default Booking