import cypress from "cypress";
import { localServerUrl } from './../../src/constants/e2eTests';

describe('should test StringComponent', () => {
    beforeEach('should enter StringComponent page', () => {
        cy.visit(`${localServerUrl}/recursion`);
        cy.get('[data-cy="button"]').as('button');
        cy.get('[data-cy="input"]').as('input');
    });

    it('should test empty string', () => {
        cy.get('@input').type(' ');
        cy.get('@button').click();
        cy.get('[data-cy="circle0"]').as('circle');

        cy.get('@circle')
            .should('have.attr', 'data-testid')
            .and('equal', 'modified');

        cy.get('@circle')
            .should('have.attr', 'data-test')
            .and('equal', ' ');
    });

    it('should test one char string', () => {
        cy.get('@input').type('t');
        cy.get('@button').click();
        cy.get('[data-cy="circle0"]').as('circle');

        cy.wait(200);

        cy.get('@circle')
            .should('have.attr', 'data-testid')
            .and('equal', 'modified');

        cy.get('@circle')
            .should('have.attr', 'data-test')
            .and('equal', 't');
    });

    it('should test even amount of chars', () => {
        cy.get('@input').type('qwer');
        cy.get('@button').click();

        cy.get('[data-cy="circle0"]').as('circle0');
        cy.get('[data-cy="circle1"]').as('circle1');
        cy.get('[data-cy="circle2"]').as('circle2');
        cy.get('[data-cy="circle3"]').as('circle3');

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'q');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'w');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'e');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'r');

        cy.wait(300)

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'r');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'w');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'e');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'q');

        cy.wait(300)

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'r');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'e');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'w');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'q');
    });

    it('should test even amount of chars', () => {
        cy.get('@input').type('qwert');
        cy.get('@button').click();

        cy.get('[data-cy="circle0"]').as('circle0');
        cy.get('[data-cy="circle1"]').as('circle1');
        cy.get('[data-cy="circle2"]').as('circle2');
        cy.get('[data-cy="circle3"]').as('circle3');
        cy.get('[data-cy="circle4"]').as('circle4');

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'q');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'w');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'e');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'r');

        cy.get('@circle4')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 't');

        cy.wait(300)

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 't');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'w');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'default')
            .should('have.text', 'e');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'changing')
            .should('have.text', 'r');

        cy.get('@circle4')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'q');

        cy.wait(300)

        cy.get('@circle0')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 't');

        cy.get('@circle1')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'r');

        cy.get('@circle2')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'e');

        cy.get('@circle3')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'w');

        cy.get('@circle4')
            .should('have.attr', 'data-testid', 'modified')
            .should('have.text', 'q');
    });
})
