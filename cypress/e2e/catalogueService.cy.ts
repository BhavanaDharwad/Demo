import { CATALOGUE_PRODUCT } from '../fixtures/catalogue';
import { CATEGORIES } from '../fixtures/categories';
import homePage from '../support/pages/home-page';
import itemDetailPage from '../support/pages/item-detail-page';
import listPage from '../support/pages/list-page';

const category = CATEGORIES.mensOuterwear;
const catalogueUrl = `**/data/${category}.json`;

describe('Catalogue service resilience', () => {
    it('recovers from a failed catalogue request without leaving the list', () => {
        cy.intercept('GET', catalogueUrl, { forceNetworkError: true }).as('catalogueFailed');

        cy.visit('/');
        homePage.getCategoryLink(category).click();

        cy.wait('@catalogueFailed');
        cy.location('pathname').should('eq', `/list/${category}`);

        listPage.getNetworkWarning().should('be.visible');
        listPage.getNetworkWarning().contains("Couldn't reach the server").should('be.visible');
        listPage.getTryAgainButton().should('be.visible');
        listPage.getProduct(CATALOGUE_PRODUCT.title).should('not.exist');
        listPage.getItemCount().should('have.text', '');

        cy.intercept('GET', catalogueUrl, {
            statusCode: 200,
            body: [CATALOGUE_PRODUCT]
        }).as('catalogueRecovered');

        listPage.getTryAgainButton().click();

        cy.wait('@catalogueRecovered');
        listPage.getNetworkWarning().should('not.be.visible');
        listPage.getItemCount().should('have.text', '(1 item)');
        listPage.getProduct(CATALOGUE_PRODUCT.title).should('be.visible').click();

        itemDetailPage.getItemName().should('contain', CATALOGUE_PRODUCT.title);
    });
});
