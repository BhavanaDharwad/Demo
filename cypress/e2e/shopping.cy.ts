import { CATEGORIES } from '../fixtures/categories';
import cartPage from '../support/pages/cart-page';
import homePage from '../support/pages/home-page';
import itemDetailPage from '../support/pages/item-detail-page';
import listPage from '../support/pages/list-page';

const product = {
    category: CATEGORIES.mensOuterwear,
    name: "Men's Tech Shell Full-Zip",
    size: 'M',
    quantity: 2
};

describe('Product selection journey', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Customer selects product configuration', () => {
        homePage.getCategoryLink(product.category).click();
        listPage.getProduct(product.name).click();

        itemDetailPage.getItemName().should('contain', product.name);
        itemDetailPage.getSize().select(product.size).should('have.value', product.size);
        itemDetailPage
            .getQty()
            .select(String(product.quantity))
            .should('have.value', String(product.quantity));
        itemDetailPage.getPrice().invoke('text').should('match', /\$\d+/);
    });

    it('Product is added correctly to cart', () => {
        cy.addProductToCart({
            category: product.category,
            product: product.name,
            size: product.size,
            quantity: product.quantity
        });

        itemDetailPage.getViewCartButton().click();

        cartPage.getItemName().should('contain', product.name);
        cartPage.getSize().should('contain', product.size);
        cartPage.getQty().should('have.value', String(product.quantity));
        cartPage.getPrice().invoke('text').should('match', /\$\d/);
    });
});
