import React, { useState } from 'react'

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
        <h2>Booking Menu</h2>
        <form>
            <label htmlFor="checkOut" className="text-sm font-medium text-gray-600" >Check Out Date: </label>
            <input type='date' name='checkOutDate' value={formData.checkOutDate} onChange={handleChange} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='checkIn' className="text-sm font-medium text-gray-600" >Check In Date: </label>
            <input type='date' name='checkInDate' value={formData.checkInDate} onChange={handleChange} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='booking' className="text-sm font-medium text-gray-600">Booking Date: </label>
            <input type='date' name='bookingDate' value={formData.bookingDate} onChange={handleChange} className="mt-1 p-2 border rounded "></input><br />
            <label htmlFor='price' className="text-sm font-medium text-gray-600">Price</label><br />
            <label htmlFor='paymentStatus' className="text-sm font-medium text-gray-600">paymentStatus: </label>
            <label type='text' name='paymentStatus'>{formData.paymentStatus}</label><br />
            <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>
    </div>
  )
}

export default Booking