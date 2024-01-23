import React, { useState } from 'react'

function Booking() {
    const [formData, setFormData] = useState({
        checkOutDate: "",
        checkInDate: "",
        bookingDate: "",
        price: "",
        paymentStatus: "",
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
            <label htmlFor="checkOut">Check Out Date: </label>
            <input type='date' name='checkOutDate' value={formData.checkOutDate} onChange={handleChange}></input><br />
            <label htmlFor='checkIn'>Check In Date: </label>
            <input type='date' name='checkInDate' value={formData.checkInDate} onChange={handleChange}></input><br />
            <label htmlFor='booking'>Booking Date: </label>
            <input type='date' name='bookingDate' value={formData.bookingDate} onChange={handleChange}></input><br />
            <label htmlFor='price'>Price</label>
            <input type='number' name='price' value={formData.price} onChange={handleChange}></input><br />
            <label htmlFor='paymentStatus'>paymentStatus</label>
            <input type='text' name='paymentStatus' value={formData.paymentStatus} onChange={handleChange}></input><br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Booking