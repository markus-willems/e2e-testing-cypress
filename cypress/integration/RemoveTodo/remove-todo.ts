import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open the todo interface', () => {
    cy.visit('/');
});

When('I press the {string} button for {string}', (deleteButton: string, todoTitle: string) => {
    cy.findByText(todoTitle).parent().findByText(new RegExp(deleteButton, 'i')).click();
});

Then('{string} is deleted from the todo list', (todoTitle: string) => {
    cy.findByText(todoTitle).should('not.exist');
});
