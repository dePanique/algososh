import cypress from "cypress";
import { localServerUrl } from './../../src/constants/e2eTests';

describe('test routes', () => {
    it('open index', () => {
        cy.visit(localServerUrl);

        cy.visit(`${localServerUrl}/recursion`);
        cy.contains('Строка')
        cy.contains('К оглавлению').click();

        cy.visit(`${localServerUrl}/fibonacci`);
        cy.contains('Последовательность Фибоначчи')
        cy.contains('К оглавлению').click();

        cy.visit(`${localServerUrl}/sorting`);
        cy.contains('Сортировка массива')
        cy.contains('К оглавлению').click();

        cy.visit(`${localServerUrl}/stack`);
        cy.contains('Стек')
        cy.contains('К оглавлению').click();

        cy.visit(`${localServerUrl}/queue`);
        cy.contains('Очередь')
        cy.contains('К оглавлению').click();

        cy.visit(`${localServerUrl}/list`);
        cy.contains('Связный список')
        cy.contains('К оглавлению').click();
    })
})
