export const CATEGORIES = {
    mensOuterwear: 'mens_outerwear',
    ladiesOuterwear: 'ladies_outerwear',
    mensTshirts: 'mens_tshirts',
    ladiesTshirts: 'ladies_tshirts'
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];
