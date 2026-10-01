export type CatalogueProduct = {
    name: string;
    title: string;
    price: number;
    image: string;
    description: string;
};

// Title is not in the live Men's Outerwear catalogue, so a missed stub cannot pass.
export const CATALOGUE_PRODUCT: CatalogueProduct = {
    name: 'Resilience+Test+Shell',
    title: 'Resilience Test Shell',
    price: 42,
    image: 'data/images/10-15068B.jpg',
    description: 'A catalogue item used to prove the list recovers after a network failure.'
};
