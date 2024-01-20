import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    return (
        <>
        <h1>{property.title}</h1>
            <div>
            {property.images &&
                    property.images.map((image) => (
                        <img
                            key={image.id}
                            src={`data:image/jpeg;base64,${image.data}`}
                            alt={`Property ${image.id}`}
                            style={{ maxWidth: '100%', maxHeight: '400px', margin: '10px' }}
                        />
                    ))}
            </div>
        <p>Description: {property.description}</p>
        <p>{property.location}</p>
        <p>{property.price}</p>
        <p>{property.status}</p>
        <div>
            <p>Amenities:</p>
            {property.amenities &&
                property.amenities.map((amenity, index) => (
                    <p key={index}>{amenity}</p>
                ))}
        </div>
        </>
    );
}

export default SingleProperty;
