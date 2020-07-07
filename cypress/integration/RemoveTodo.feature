Feature: Remove todo item

    As a user I am able to remove a todo item

    Scenario: Remove a todo item
        Given I open the todo interface
        When I press the "delete" button for "Mow lawn"
        Then "Mow lawn" is deleted from the todo list