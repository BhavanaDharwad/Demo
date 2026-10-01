export class ITEM_DETAIL {
    getItemName() {
        return cy.get('shop-detail').find('h1');
    }
    getQty() {
        return cy.get('shop-detail').find('#quantitySelect');
    }
    getPrice() {
        return cy.get('shop-detail').find('.price');
    }
    getSize() {
        return cy.get('shop-detail').find('#sizeSelect');
    }
    getAddToCartButton() {
        return cy.get('shop-detail').find('button[aria-label="Add this item to cart"]');
    }
    getViewCartButton() {
        return cy.get('shop-cart-modal').find('#viewCartAnchor');
    }
    getCheckoutButton() {
        return cy.get('shop-cart-modal').find('a[href="/checkout"]');
    }
}

export default new ITEM_DETAIL();
