import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [loadingProperties, setLoadingProperties] = useState(false);
    const [propertiesError, setPropertiesError] = useState(false);

    const endpoint = `${import.meta.env.VITE_API_BASE_URL_LOCAL}/properties`;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoadingProperties(true);

                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setProperties(data);
            } catch {
                setPropertiesError(true);
            } finally {
                setLoadingProperties(false);
            }
        };

        fetchProperties();
    }, [endpoint]);

    if (propertiesError) {
        return <p>Oops! There was an issue loading the properties!</p>;
    }

    if (loadingProperties) {
        return <p>Loading properties...</p>;
    }

    if (!properties.length) {
        return <p>There are no available properties.</p>;
    }

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
