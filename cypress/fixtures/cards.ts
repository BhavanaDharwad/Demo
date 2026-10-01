export type Card = {
    CardholderName: string;
    CardNumber: string | number;
    ExpiryMonth: string;
    ExpiryYear: string | number;
    CVV: string | number;
};

export const VALID_CARD: Card = {
    CardholderName: 'Bhavana Test',
    CardNumber: 4111111111111111,
    ExpiryMonth: 'Dec',
    ExpiryYear: 2026,
    CVV: 123
};

// Every value below fails the pattern the checkout form enforces on that field.
export const INVALID_CARD: Card = {
    CardholderName: 'B',
    CardNumber: 4111,
    ExpiryMonth: 'Dec',
    ExpiryYear: 2026,
    CVV: 1
};
