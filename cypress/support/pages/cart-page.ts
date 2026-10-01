export class CART {
    getItemName() {
        return cy.get('.flex .name');
    }
    getQty() {
        return cy.get('.pickers #quantitySelect');
    }
    getPrice() {
        return cy.get('.flex .price');
    }
    getSize() {
        return cy.get('.flex .size');
    }
    getCheckoutButton() {
        return cy.get('.checkout-box shop-button a[href="/checkout"]');
    }
    getTotal() {
        return cy.get('.checkout-box .subtotal');
    }
}

export default new CART();
