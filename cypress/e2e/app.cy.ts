import cypress from "cypress";
import { LOCAL_SERV_URL } from './../../src/constants/e2eTests';

describe('test routes', () => {
    it('open index', () => {
        cy.visit(LOCAL_SERV_URL);

        cy.visit(`${LOCAL_SERV_URL}/recursion`);
        cy.contains('Строка')
        cy.contains('К оглавлению').click();

        cy.visit(`${LOCAL_SERV_URL}/fibonacci`);
        cy.contains('Последовательность Фибоначчи')
        cy.contains('К оглавлению').click();

        cy.visit(`${LOCAL_SERV_URL}/sorting`);
        cy.contains('Сортировка массива')
        cy.contains('К оглавлению').click();

        cy.visit(`${LOCAL_SERV_URL}/stack`);
        cy.contains('Стек')
        cy.contains('К оглавлению').click();

        cy.visit(`${LOCAL_SERV_URL}/queue`);
        cy.contains('Очередь')
        cy.contains('К оглавлению').click();

        cy.visit(`${LOCAL_SERV_URL}/list`);
        cy.contains('Связный список')
        cy.contains('К оглавлению').click();
    })
})
