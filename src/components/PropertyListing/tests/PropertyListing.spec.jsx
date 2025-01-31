import React from 'react';
import { render, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';

const mockedProperty = {
    id: 73864112,
    bedrooms: 3,
    summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
    propertyType: 'Flat',
    price: 1950000,
    branchName: 'M2 Property, London',
    propertyUrl: '/property-for-sale/property-73864112.html',
    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
    propertyTitle: '3 bedroom flat for sale',
    mainImage:
        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
};

const mockedProperties = Array(10).fill(mockedProperty);

describe('PropertyListing', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockedProperties),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render ten property cards', async () => {
        render(<PropertyListing />);

        await waitForElementToBeRemoved(screen.queryByText('Loading properties...'));

        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(10);
    });

    it('should render an error message if peroperties request fails', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: false,
            status: 500,
            json: () => Promise.resolve({ message: 'Internal Server Error' }),
        });

        render(<PropertyListing />);

        await waitFor(() => {
            expect(screen.getByText('Oops! There was an issue loading the properties!')).toBeInTheDocument();
        });
    });
});
