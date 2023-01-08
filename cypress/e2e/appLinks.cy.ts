import cypress from "cypress";
import { localServerUrl } from './../../src/constants/e2eTests';


describe('test links', () => {
    beforeEach(() => {
        cy.visit(localServerUrl);
    })

    it('open recursion', () => {
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
    });

    it('open fibonacci', () => {
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    });

    it('open sorting', () => {
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива');
    });

    it('open Stack', () => {
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек');
    });

    it('open Queue', () => {
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь');
    });

    it('open LinckedList', () => {
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    });
})
