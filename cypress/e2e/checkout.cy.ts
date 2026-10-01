import { VALID_CARD, INVALID_CARD } from '../fixtures/cards';
import { CATEGORIES } from '../fixtures/categories';
import { BHAVANA_TEST } from '../fixtures/user';
import cartPage from '../support/pages/cart-page';
import checkoutPage from '../support/pages/checkout-page';
import itemDetailPage from '../support/pages/item-detail-page';

const product = {
    category: CATEGORIES.ladiesOuterwear,
    name: "Ladies Colorblock Wind Jacket",
    size: 'S',
    quantity: 1
};

describe('Checkoutjourney', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.addProductToCart({
            category: product.category,
            product: product.name,
            size: product.size,
            quantity: product.quantity
        });
    });
    it('Customer sees product in cart', () => {
        itemDetailPage.getViewCartButton().click();

        cartPage.getItemName().should('contain', product.name);
        cartPage.getSize().should('contain', product.size);
        cartPage.getQty().should('have.value', String(product.quantity));
        cartPage.getPrice().invoke('text').should('match', /\$\d/);

        cartPage.getTotal().invoke('text').then((cartTotal) => {
            const total = cartTotal.match(/\$[\d.]+/)?.[0];
            cartPage.getCheckoutButton().click();
            checkoutPage.getOrderTotal().should('have.text', total);
        });
    });

    it('Valid order is submitted', () => {
        itemDetailPage.getCheckoutButton().click();
        cy.fillCheckoutForm({user: BHAVANA_TEST, card: VALID_CARD});

        checkoutPage.getPlaceOrderButton().click();
        checkoutPage.getCheckOutSuccessMessage().should('have.text', 'Demo checkout process complete.');
        checkoutPage.getCheckoutSuccessButton().should('be.visible');
    });

    it('Attempt to submit Invalid order', () => {
        itemDetailPage.getCheckoutButton().click();
        cy.fillCheckoutForm({user: BHAVANA_TEST, card: INVALID_CARD});
        checkoutPage.getInvalidCardHolderNameErrorMessage().should('be.visible');
        checkoutPage.getInvalidCardNumberErrorMessage().should('be.visible');
        checkoutPage.getInvalidCVVErrorMessage().should('be.visible');

        checkoutPage.getPlaceOrderButton().click();
        checkoutPage.getCheckoutSuccessButton().should('not.be.visible');
    });
});
