import cypress from "cypress"

describe('should test StringComponent', () => {
    beforeEach('should enter queue page', () => {
        cy.visit('http://localhost:3000/queue')
        cy.get('[data-cy="addButton"]').as('addButton')
        cy.get('[data-cy="deleteButton"]').as('deleteButton')
        cy.get('[data-cy="clearButton"]').as('clearButton')
        cy.get('[data-cy="input"]').as('input')
        for (let i = 0; i < 7; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                .should('not.contain', 'head')
                .should('not.contain', 'tail')
                .should('have.attr', 'data-test', ` default ${i}`)
        }
    });

    it('should test addButton Queue page', () => {
        cy.get('@input').should('have.value', '')
        cy.get('@addButton').should('be.disabled')

        cy.get('@input').type('33');
        cy.get('@addButton').should('not.be.disabled')

        cy.get('@input').clear()
        cy.get('@addButton').should('be.disabled')
    });

    it('should test circle state and adding order', () => {
        cy.get('@input').type('31')
        cy.get('@addButton').click().then(() => { })

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` changing 0`)
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.wait(1500)

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 default 0`)
                    .contains('head')
                    .parent()
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.get('@input').type('32');
        cy.get('@addButton').click().then(() => { })

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 default 0`)
                    .contains('head')
                    .parent()
                    .contains('tail')
            } else if(i === 1) {
                cy.get(`@circle1`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` changing 1`)
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.wait(1500)

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 default 0`)
                    .contains('head')
                    .parent()
                    .should('not.contain', 'tail')
            } else if(i === 1) {
                cy.get(`@circle1`)
                    .should('not.contain', 'head')
                    .should('have.attr', 'data-test', `32 default 1`)
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }
    });

    it('should test deleting order', () => {
        cy.get('@input').type('31')
        cy.get('@addButton').click()
        cy.wait(1500)
        cy.get('@input').type('32')
        cy.get('@addButton').click()

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 default 0`)
                    .contains('head')
                    .parent()
                    .should('not.contain', 'tail')
            } else if (i === 1) {
                cy.get(`@circle1`)
                    .should('not.contain', 'head')
                    .should('have.attr', 'data-test', `32 default 1`)
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.get('@deleteButton').click()

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 changing 0`)
                    .contains('head')
                    .parent()
                    .should('not.contain', 'tail')
            } else if (i === 1) {
                cy.get(`@circle1`)
                    .should('not.contain', 'head')
                    .should('have.attr', 'data-test', `32 default 1`)
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.wait(1500)

        for (let i = 0; i < 7; i++) {

            if (i === 1) {
                cy.get("@circle1")
                    .should('have.attr', 'data-test', `32 default 1`)
                    .contains('head')
                    .parent()
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.get('@deleteButton').click()

        for (let i = 0; i < 7; i++) {

            if (i === 1) {
                cy.get("@circle1")
                    .should('have.attr', 'data-test', `32 changing 1`)
                    .contains('head')
                    .parent()
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.wait(1500)

        for (let i = 0; i < 7; i++) {

            if (i === 1) {
                cy.get("@circle1")
                    .should('have.attr', 'data-test', ` default 1`)
                    .contains('head')
                    .parent()
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

    });

    it('should test clearButton', () => {
        cy.get('@input').type('31')
        cy.get('@addButton').click()
        cy.wait(1500)
        cy.get('@input').type('32')
        cy.get('@addButton').click()

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                cy.get(`@circle0`)
                    .should('have.attr', 'data-test', `31 default 0`)
                    .contains('head')
                    .parent()
                    .should('not.contain', 'tail')
            } else if (i === 1) {
                cy.get(`@circle1`)
                    .should('not.contain', 'head')
                    .should('have.attr', 'data-test', `32 default 1`)
                    .contains('tail')
            } else {
                cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                    .should('not.contain', 'head')
                    .should('not.contain', 'tail')
                    .should('have.attr', 'data-test', ` default ${i}`)
            }
        }

        cy.get('@clearButton').click()

        for (let i = 0; i < 7; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
                .should('not.contain', 'head')
                .should('not.contain', 'tail')
                .should('have.attr', 'data-test', ` default ${i}`)
        }
    });
})
