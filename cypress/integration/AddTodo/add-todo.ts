import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I open the todo interface', () => {
    cy.visit('/');
});

When('I enter {string} into the input field', (todoTitle: string) => {
    cy.findByLabelText(/title/i).type(todoTitle);
});

And('press the "Add" button', () => {
    cy.findByText(/add/i).click();
});

Then('{string} is added to the todo list', (todoTitle: string) => {
    cy.findByText(todoTitle).should('exist');
});
