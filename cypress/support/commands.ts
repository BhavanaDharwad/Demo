/// <reference types="cypress" />

import checkoutPage from './pages/checkout-page';
import homePage from './pages/home-page';
import itemDetailPage from './pages/item-detail-page';
import listPage from './pages/list-page';
import type { User } from '../fixtures/user';
import type { Card } from '../fixtures/cards';
import type { Category } from '../fixtures/categories';

type CheckoutDetails = {
    user: User;
    card: Card;
};

type ProductOptions = {
    category: Category;
    product: string;
    size: string;
    quantity: number;
};

Cypress.Commands.add('fillCheckoutForm', ({ user, card }: CheckoutDetails) => {
    checkoutPage.getEmail().type(String(user.Email));
    checkoutPage.getPhoneNumber().type(String(user.Phone));
    checkoutPage.getAddress().type(user.address);
    checkoutPage.getCity().type(user.City);
    checkoutPage.getState().type(user.State);
    checkoutPage.getZipCode().type(user.ZipCode);
    checkoutPage.getCountry().select(user.Country);

    checkoutPage.getCardholderName().type(card.CardholderName);
    checkoutPage.getCardNumber().type(String(card.CardNumber));
    checkoutPage.getExpiryMonth().select(String(card.ExpiryMonth));
    checkoutPage.getExpiryYear().select(String(card.ExpiryYear));
    checkoutPage.getCVV().type(String(card.CVV));
});

Cypress.Commands.add(
    'addProductToCart',
    ({ category, product, size, quantity }: ProductOptions) => {
        homePage.getCategoryLink(category).click();
        listPage.getProduct(product).click();
        itemDetailPage.getSize().select(size);
        itemDetailPage.getQty().select(String(quantity));
        itemDetailPage.getAddToCartButton().click();
    }
);

declare global {
    namespace Cypress {
        interface Chainable {
            fillCheckoutForm(details: CheckoutDetails): Chainable<void>;
            addProductToCart(options: ProductOptions): Chainable<void>;
        }
    }
}
