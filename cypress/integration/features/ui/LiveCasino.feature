@smoke
Feature: Validation of Live Casino game features

    Background:
        Given User login to the application

    
    Scenario: Verify if the user is able to place bets when there are enough credits in the account
        When User Initial Balance credits are stored
        Then User clicks on "Live Casino"
        When User choose the casino game selection as "Royal Gaming"
        And User clicks on "7 Up Down"
        Then User clicks on "Continue"
        When User places bet for "7Up" with Stake of "100"


        
