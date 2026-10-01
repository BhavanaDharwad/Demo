export class LIST {
    getProduct(product: string) {
        return cy.get('shop-list').contains('.title', product);
    }

    getNetworkWarning() {
        return cy.get('shop-network-warning');
    }

    getTryAgainButton() {
        return cy.get('shop-network-warning').contains('button', 'Try Again');
    }

    getItemCount() {
        return cy.get('shop-list').shadow().find('header span');
    }
}

export default new LIST();
