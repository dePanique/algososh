import cypress from "cypress";
import { localServerUrl } from './../../src/constants/e2eTests';

describe('should test stack page', () => {
    beforeEach('should open stack page', () => {
        cy.visit(`${localServerUrl}/stack`)
        cy.get('[data-cy="input"]').as('input')
        cy.get('[data-cy="addButton"]').as('addButton')
        cy.get('[data-cy="deleteButton"]').as('deleteButton')
        cy.get('[data-cy="clearButton"]').as('clearButton')
    });

    it('should test addButton', () => {
        cy.get('@addButton').should('be.disabled')

        cy.get('@input').type('33')
        cy.get('@addButton').should('not.be.disabled')

        cy.get('@input').clear()
        cy.get('@addButton').should('be.disabled')
    });

    it('should test deleteButton', () => {
        cy.get('@deleteButton').should('be.disabled')

        cy.get('@input').type('33')
        cy.get('@addButton').should('not.be.disabled')
        cy.get('@addButton').click()

        cy.get('@deleteButton')
            .should('not.be.disabled')
            .click()

        cy.get('@deleteButton').should('be.disabled')
        cy.get('@addButton').should('be.disabled')

        cy.get('@input').type('33')
        cy.get('@addButton').should('not.be.disabled')
        cy.get('@addButton').click()
        cy.get('@deleteButton').should('not.be.disabled')

        cy.get('@input').type('33')
        cy.get('@addButton').should('not.be.disabled')
        cy.get('@addButton').click()
        cy.get('@deleteButton').should('not.be.disabled')

        cy.get('@deleteButton').click()
        cy.get('@deleteButton').should('not.be.disabled')
        cy.get('@deleteButton').click()
        cy.get('@deleteButton').should('be.disabled')
    });

    it('should test clear button', () => {
        cy.get('@clearButton').should('be.disabled')

        cy.get('@input').type('33')
        cy.get('@addButton').click()
        cy.get('@input').type('33')
        cy.get('@addButton').click()
        cy.get('@input').type('33')
        cy.get('@addButton').click()

        cy.get('[data-cy="circle"]').as('circle')
        cy.get('@circle').should('have.length', 3)

        cy.get('@clearButton')
            .should('not.be.disabled')
            .click()
        cy.get('@circle').should('have.length', 0)
        cy.get('@clearButton').should('be.disabled')
    });

    it('should test circle', () => {
        cy.get('@input').type('31')
        cy.get('@addButton').click()

        cy.get('[data-cy="circle"]').as('circle')
        cy.get('@circle')
            .last()
            .should('have.attr', 'data-test', 'changing 31 0 top')

        cy.get('@circle')
            .last()
            .should('have.attr', 'data-test', 'default 31 0 top')

        cy.get('@input').type('34')
        cy.get('@addButton').click()

        cy.get('@circle').then(($el) => {
            cy.wrap($el[0])
                .should('have.attr', 'data-test',
                    'default 31 0')

            cy.wrap($el[1])
                .should('have.attr', 'data-test',
                    'changing 34 1 top')
        })

        cy.wait(500)

        cy.get('@circle').then(($el) => {
            cy.wrap($el[0])
                .should('have.attr', 'data-test',
                    'default 31 0')

            cy.wrap($el[1])
                .should('have.attr', 'data-test',
                    'default 34 1 top')
        })
    });
    
    it('should delete correct work', () => {
        cy.get('@input').type('31')
        cy.get('@addButton').click()
        
        cy.get('@input').type('32')
        cy.get('@addButton').click()
        cy.get('@input').type('33')
        cy.get('@addButton').click()
        
        cy.get('[data-cy="circle"]').as('circle')
        
        cy.get('@circle')
        .should('have.length', 3)
        .then(($el) => {
            cy.wrap($el[0])
                .should('have.attr', 'data-test',
                    'default 31 0')

            cy.wrap($el[1])
                .should('have.attr', 'data-test',
                    'default 32 1')

            cy.wrap($el[2])
                .should('have.attr', 'data-test',
                    'default 33 2 top')
        })
    
        cy.get('@deleteButton').click()
        cy.get('@circle').should('have.length', 2)
        cy.get('@circle').then(($el) => {
            cy.wrap($el[0])
                .should('have.attr', 'data-test',
                    'default 31 0')

            cy.wrap($el[1])
                .should('have.attr', 'data-test',
                    'default 32 1 top')
        })

        cy.get('@deleteButton').click()
        cy.get('@circle').should('have.length', 1)
        cy.get('@circle').then(($el) => {
            cy.wrap($el[0])
            .should('have.attr', 'data-test',
            'default 31 0 top')
        })
        
        cy.get('@deleteButton').click()
        cy.get('@circle').should('have.length', 0)
    });
})
