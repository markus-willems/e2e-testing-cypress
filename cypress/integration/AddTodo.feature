Feature: Add todo item

    As a user I am able to add a todo item

    Scenario: Add a todo item
        Given I open the todo interface
        When I enter "Buy milk" into the input field
        And press the "Add" button
        Then "Buy milk" is added to the todo list