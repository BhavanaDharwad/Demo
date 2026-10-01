export type User = {
    name: string;
    address: string;
    City: string;
    Email: string;
    Phone: string | number;
    State: string;
    ZipCode: string;
    Country: string;
};

export const BHAVANA_TEST: User = {
    name: 'Bhavana Test',
    address: '123 Test Street',
    City: 'New York',
    Email: 'bhavana.test@example.com',
    Phone: 2025550123,
    State: 'NY',
    ZipCode: '10001',
    Country: 'United States'
};

// Every value below fails the pattern the checkout form enforces on that field.
export const INVALID_INPUT_USER: User = {
    name: 'Invalid Input',
    address: '123',
    City: 'N',
    Email: 'not-an-email',
    Phone: '12345',
    State: 'N',
    ZipCode: '1',
    Country: 'United States'
};
