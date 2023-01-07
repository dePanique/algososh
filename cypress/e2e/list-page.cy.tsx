import cypress from "cypress";

describe('should test list-page', () => {
    beforeEach('should enter list page', () => {
        cy.visit('http://localhost:3000/list')
        cy.get('[data-cy="addToHead"]').as('addToHead')
        cy.get('[data-cy="addToTail"]').as('addToTail')
        cy.get('[data-cy="deleteHead"]').as('deleteHead')
        cy.get('[data-cy="deleteTail"]').as('deleteTail')
        cy.get('[data-cy="insertAt"]').as('insertAt')
        cy.get('[data-cy="deleteAt"]').as('deleteAt')
        cy.get('[data-cy="inputValue"]').as('inputValue')
        cy.get('[data-cy="inputIndex"]').as('inputIndex')
    })

    it('should test addToHead status', () => {
        cy.get('@addToHead').should('be.disabled')

        cy.get('@inputValue').type('22')
        cy.get('@addToHead').should('not.be.disabled')
    })

    it('should test addToTail status', () => {
        cy.get('@addToTail').should('be.disabled')

        cy.get('@inputValue').type('22')
        cy.get('@addToTail').should('not.be.disabled')
    })

    it('should test addToHead result', () => {
        cy.reload()

        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('@inputValue').type('22')
        cy.get('@addToHead').click()

        cy.get(`@circle0`)
            .should('contain', 22)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)

        cy.get('@smallCircle')
            .should('have.attr', 'data-test', '22 changing')

        cy.wait(700)

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@smallCircle').should('not.exist')

        cy.get('@circle0')
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 0 modified')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')

        cy.get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.wait(700)

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@smallCircle').should('not.exist')

        cy.get('@circle0')
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')

        cy.get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.get('@inputValue').type('33')
        cy.get('@addToHead').click()

        cy.get(`[data-cy="smallCircle"]`)
            .as(`smallCircle`)
            .should('contain', 33)

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@circle0')
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')

        cy.get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.wait(700)

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@circle0')
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '33 0 modified')

        cy.get('@circle1')
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 3 default')

        cy.get(`@circle4`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 4 default')


        cy.get(`[data-cy="circle5"]`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 5 default')

        cy.get('@smallCircle').should('not.exist')
    })

    it('should test addToTail result', () => {
        cy.reload()

        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('@inputValue').type('22')
        cy.get('@addToTail').click()

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('contain', 22)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.wait(700)

        cy.get(`@smallCircle`).should('not.exist')

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '22 4 modified')

        cy.wait(700)

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '22 4 default')
    })

    it('should test deleteHead status', () => {
        cy.reload()

        cy.get('@deleteHead')
            .should('not.be.disabled')
            .click()
            .wait(700)
            .click()
            .wait(700)
            .click()
            .wait(700)
            .click()
            .wait(1000)
            .should('be.disabled')
    })

    it('should test deleteHead result', () => {
        cy.reload()

        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('@deleteHead').click()

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)
            .should('have.attr', 'data-test', '0 changing')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '  0 default')

        cy.wait(700)

        cy.get('@smallCircle').should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 2 default')

        cy.get('@deleteHead').click()

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)
            .should('have.attr', 'data-test', '4 changing')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '  0 default')

        cy.wait(700)

        cy.get('@smallCircle').should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 1 default')
    })

    it('should test deleteTail status', () => {
        cy.reload()

        cy.get('@deleteTail')
            .should('not.be.disabled')
            .click()
            .wait(700)
            .click()
            .wait(700)
            .click()
            .wait(700)
            .click()
            .wait(1000)
            .should('be.disabled')
    })

    it('should test deleteTail result', () => {
        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('@deleteTail').click()

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)
            .should('have.attr', 'data-test', '8 changing')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '  3 default')

        cy.wait(700)

        cy.get('@smallCircle').should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get('@deleteTail').click()

        cy.get(`[data-cy="smallCircle"]`).as(`smallCircle`)
            .should('have.attr', 'data-test', '31 changing')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')

        cy.get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '  2 default')

        cy.wait(700)

        cy.get('@smallCircle').should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')

        cy.get(`@circle1`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
    })

    it('should test insertAt status', () => {
        cy.get('@insertAt').should('be.disabled')
        cy.get('@inputValue').type('99')
        cy.get('@insertAt').should('be.disabled')
        cy.get('@inputIndex').type('2')
        cy.get('@insertAt').should('not.be.disabled')
        cy.get('@inputIndex').type(' ')
    })

    it('should test insertAt result', () => {
        cy.reload()

        //First test
        cy.get('@inputValue').type('22')
        cy.get('@inputIndex').type('2')

        cy.get('@insertAt').click()

        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('[data-cy="smallCircle0"]')
            .should('have.attr', 'data-test', '22 0 changing')
            .as('smallCircle0')
            .should('exist')
            .get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('[data-cy="smallCircle1"]')
            .should('have.attr', 'data-test', '22 1 changing')
            .as('smallCircle1')
            .should('exist')
            .get('@smallCircle0')
            .should('not.exist')
            .get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')

        cy.get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')
            .get('[data-cy="smallCircle2"]')
            .as('smallCircle2')
            .should('have.attr', 'data-test', '22 2 changing')
            .should('exist')
            .get('@smallCircle0')
            .should('not.exist')
            .get('@smallCircle1')
            .should('not.exist')
            .get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@smallCircle0')
            .should('not.exist')
            .get('@smallCircle1')
            .should('not.exist')
            .get('@smallCircle2')
            .should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 2 modified')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        //Second test
        cy.get('@inputValue').type('33')
        cy.get('@inputIndex').type('2')

        cy.get('@insertAt').click()

        for (let i = 0; i < 5; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.get('[data-cy="smallCircle1"]')
            .should('have.attr', 'data-test', '33 1 changing')
            .as('smallCircle1')
            .should('exist')
            .get('@smallCircle0')
            .should('not.exist')
            .get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        cy.get('[data-cy="smallCircle2"]')
            .as('smallCircle2')
            .should('have.attr', 'data-test', '33 2 changing')
            .should('exist')
            .get('@smallCircle0')
            .should('not.exist')
            .get('@smallCircle1')
            .should('not.exist')
            .get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 4 default')

        for (let i = 0; i < 6; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get('@smallCircle0')
            .should('not.exist')
            .get('@smallCircle1')
            .should('not.exist')
            .get('@smallCircle2')
            .should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '33 2 modified')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 4 default')
            .get(`@circle5`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 5 default')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '33 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '22 3 default')
            .get(`@circle4`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 4 default')
            .get(`@circle5`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 5 default')
    })

    it('should test deleteAt status', () => {
        cy.reload()

        cy.get('@deleteAt').should('be.disabled')

        cy.get('@inputIndex').type('2')

        cy.get('@deleteAt').should('not.be.disabled')
    })

    it('should test deleteAt result', () => {
        cy.reload()

        cy.get('@inputIndex').type('1')

        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy="circle${i}"]`).as(`circle${i}`)
        }

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('@deleteAt').click()

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 changing')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 changing')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '4 1 changing')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('[data-cy="smallCircle"]')
            .as('smallCircle')
            .should('have.attr', 'data-test', '4 1 changing')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 changing')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '  1 changing')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 2 default')
            .get(`@circle3`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 3 default')

        cy.get('smallCircle').should('not.exist')

        cy.get(`@circle0`)
            .should('contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '0 0 default')
            .get(`@circle1`)
            .should('not.contain', 'head')
            .should('not.contain', 'tail')
            .should('have.attr', 'data-test', '31 1 default')
            .get(`@circle2`)
            .should('not.contain', 'head')
            .should('contain', 'tail')
            .should('have.attr', 'data-test', '8 2 default')
    })
})