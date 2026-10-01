export class CHECKOUT {
    getEmail() {
        return cy.get('#accountEmail');
    }
    getPhoneNumber() {
        return cy.get('#accountPhone');
    }
    getAddress() {
        return cy.get('#shipAddress');
    }
    getCity() {
        return cy.get('#shipCity');
    }
    getState() {
        return cy.get('#shipState');
    }
    getZipCode() {
        return cy.get('#shipZip');
    }
    getCountry() {
        return cy.get('#shipCountry');
    }
    getCardholderName() {
        return cy.get('#ccName');
    }
    getCardNumber() {
        return cy.get('#ccNumber');
    }
    getExpiryMonth() {
        return cy.get('#ccExpMonth');
    }
    getExpiryYear() {
        return cy.get('#ccExpYear');
    }
    getCVV() {
        return cy.get('#ccCVV');
    }
    getPlaceOrderButton() {
        return cy.get('#submitBox');
    }
    getOrderTotal() {
        return cy.get('.total-row div').eq(1);
    }
    getInvalidCardHolderNameErrorMessage() {
        return cy.get('shop-input [error-message="Invalid Cardholder Name"]');
    }
    getInvalidCardNumberErrorMessage() {
        return cy.get('shop-input [error-message="Invalid Card Number"]');
    }
    getInvalidCVVErrorMessage() {
        return cy.get('shop-input [error-message="Invalid CVV"]');
    }
    getCheckOutSuccessMessage() {
        return cy.get('[state="success"] p');
    }
    getCheckoutSuccessButton() {
        return cy.get('[state="success"] shop-button');
    }
}

export default new CHECKOUT();
