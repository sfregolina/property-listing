import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);

    const endpoint = `${import.meta.env.VITE_API_ENDPOINT_LOCAL}/properties`;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setProperties(data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchProperties();
    }, [endpoint]);

    return (
        <ul className="PropertyListing">
            {properties.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
