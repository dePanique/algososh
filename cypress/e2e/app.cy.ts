import cypress from "cypress"

describe('test routes', () => {
    it('open index', () => {
        cy.visit('http://localhost:3000');

        cy.visit('http://localhost:3000/recursion');
        cy.contains('Строка')
        cy.contains('К оглавлению').click();

        cy.visit('http://localhost:3000/fibonacci');
        cy.contains('Последовательность Фибоначчи')
        cy.contains('К оглавлению').click();

        cy.visit('http://localhost:3000/sorting');
        cy.contains('Сортировка массива')
        cy.contains('К оглавлению').click();

        cy.visit('http://localhost:3000/stack');
        cy.contains('Стек')
        cy.contains('К оглавлению').click();

        cy.visit('http://localhost:3000/queue');
        cy.contains('Очередь')
        cy.contains('К оглавлению').click();

        cy.visit('http://localhost:3000/list');
        cy.contains('Связный список')
        cy.contains('К оглавлению').click();
    })
})