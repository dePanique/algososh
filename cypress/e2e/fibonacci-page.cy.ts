import cypress from "cypress";

describe('should test fibonacci page', () => {
    beforeEach('should enter fibonacci page', () => {
        cy.visit('http://localhost:3000/fibonacci');
        cy.get('[data-cy="button"]').as('button');
        cy.get('[data-cy="input"]').as('input');
    });

    it('should test button disable', () => {
        cy.get('@button')
            .should('have.attr', 'disabled')

        cy.get('@input')
            .type('4')
            .should('have.value', 4)

        cy.get('@button')
            .should('not.have.attr', 'disabled')

        cy.get('@input')
            .clear()

        cy.get('@button')
            .should('have.attr', 'disabled')
    });

    it('should test fibonacci alg', () => {
        cy.get('@input')
            .type('5')

        cy.get('@button')
            .click()

        cy.get('[data-cy="circle0"]').as('circle0')

        cy.get('[data-cy="circle1"]').as('circle1')
        cy.get('[data-cy="circle2"]').as('circle2')
        cy.get('[data-cy="circle3"]').as('circle3')
        cy.get('[data-cy="circle4"]').as('circle4')

        cy.get('@circle0')
            .should('have.text', '00');

        cy.get('@circle1')
            .should('have.text', '11');

        cy.get('@circle2')
            .should('have.text', '12');

        cy.get('@circle3')
            .should('have.text', '23');

        cy.get('@circle4')
            .should('have.text', '34');
    });
})
