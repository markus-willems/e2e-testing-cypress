Feature: Complete todo item

    As a user I am able to complete a todo item

    Scenario: Complete a todo item
        Given I open the todo interface
        When I press the "Done" button for "Take shower"
        Then "Take shower" is completed in the todo list