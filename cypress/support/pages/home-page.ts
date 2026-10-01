import { CATEGORIES, type Category } from '../../fixtures/categories';

export class HOME {
    getCategoryLink(category: Category) {
        return cy.get(`shop-button a[href="/list/${category}"]`);
    }
}

export default new HOME();
