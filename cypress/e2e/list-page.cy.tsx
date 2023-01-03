import cypress from "cypress";

describe('should test list-page', () => {
    beforeEach('should enter list page', () => {
        cy.visit('http://localhost:3000/list')
        cy.get('[data-cy="addToHead"]').as('addToHead')
        cy.get('[data-cy="addToTail"]').as('addToTail')
        cy.get('[data-cy="inputValue"]').as('inputValue')
        cy.get('[data-cy="inputIndex"]').as('inputIndex')
    })

    // it('should test addToHead status', () => {
    //     cy.get('@inputValue').should('have.value', '')
    //     cy.get('@addToHead').should('be.disabled')

    //     cy.get('@inputValue').type('22')
    //     cy.get('@addToHead').should('not.be.disabled')

    //     cy.get('@inputValue').clear()
    //     cy.get('@addToHead').should('be.disabled')
    // })

    // it('should test addToTail status', () => {
    //     cy.get('@inputValue').should('have.value', '')
    //     cy.get('@addToTail').should('be.disabled')

    //     cy.get('@inputValue').type('22')
    //     cy.get('@addToTail').should('not.be.disabled')

    //     cy.get('@inputValue').clear()
    //     cy.get('@addToTail').should('be.disabled')
    // })

    // it('should test addToHead result', () => {
    //     cy.reload()

    //     for (let i = 0; i < 4; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get(`@circle0`)
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 3 default')

    //     cy.get('@inputValue').type('22')
    //     cy.get('@addToHead').click()

    //     cy.get(`@circle0`)
    //         .should('contain', 22)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')

    //     cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)

    //     cy.get('@smallCircle')
    //         .should('have.attr', 'data-test', '22 changing')

    //     cy.wait(700)

    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get('@smallCircle').should('not.exist')

    //     cy.get('@circle0')
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '22 0 modified')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 3 default')

    //     cy.get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 4 default')

    //     cy.wait(700)

    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get('@smallCircle').should('not.exist')

    //     cy.get('@circle0')
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '22 0 default')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 3 default')

    //     cy.get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 4 default')

    //     cy.get('@inputValue').type('33')
    //     cy.get('@addToHead').click()

    //     cy.get(`[data-cy="smallCircle"]`)
    //         .as(`smallCircle`)
    //         .should('contain', 33)

    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get('@circle0')
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '22 0 default')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 3 default')

    //     cy.get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 4 default')

    //     cy.wait(700)

    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get('@circle0')
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '33 0 modified')

    //     cy.get('@circle1')
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '22 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 3 default')

    //     cy.get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 4 default')


    //     cy.get(`[data-cy="circle5"]`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 5 default')

    //     cy.get('@smallCircle').should('not.exist')
    // })

    // it('should test addToTail result', () => {
    //     cy.reload()

    //     for (let i = 0; i < 4; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get(`@circle0`)
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 1 default')

    //     cy.get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 2 default')

    //     cy.get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 3 default')

    //     cy.get('@inputValue').type('22')
    //     cy.get('@addToTail').click()

    //     cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)

    //     cy.get(`@circle0`)
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')

    //     cy.get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 1 default')
    //         .get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 2 default')
    //         .get(`@circle3`)
    //         .should('contain', 22)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '8 3 default')

    //     cy.wait(700)

    //     cy.get(`@smallCircle`).should('not.exist')

    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
    //     }

    //     cy.get(`@circle0`)
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')
    //         .get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 1 default')
    //         .get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 2 default')
    //         .get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '8 3 default')
    //         .get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '22 4 modified')

    //     cy.wait(700)

    //     cy.get(`@circle0`)
    //         .should('contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '0 0 default')
    //         .get(`@circle1`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '4 1 default')
    //         .get(`@circle2`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '31 2 default')
    //         .get(`@circle3`)
    //         .should('not.contain', 'head')
    //         .should('not.contain', 'tail')
    //         .should('have.attr', 'data-test', '8 3 default')
    //         .get(`@circle4`)
    //         .should('not.contain', 'head')
    //         .should('contain', 'tail')
    //         .should('have.attr', 'data-test', '22 4 default')
    // })
})