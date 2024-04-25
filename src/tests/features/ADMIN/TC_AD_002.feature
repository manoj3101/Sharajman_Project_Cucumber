Feature: TC_AD_002

  Scenario: Admin changing the user Rights for Initiator and Responder.
    Given Admin User navigates to the application and logs in as an admin as per Admin case two
    And Admin user changing the rights for Initiator as per Admin case two
    Then Admin user changing the rights for Responder as per Admin case two

  Scenario: Initiator Creating the  CFP and Publishing the CFP.
    Given Initiator navigate to the Application and logged in as a discom user as per admin case two
    And Initiator started creating Call for Proposal CFP as an initiator as per admin case two
    Then Verify whether the Call for Proposal CFP is Published successfully as per admin case two

  Scenario: Responder is Responding to the CFP Published by the Initiator.
    Given Responder navigate to the Application and logged in as a discom user as per admin case two
    Then Verify whether Response CFP is Placed successfully as per admin case two

  Scenario: Initiator is Unable to Award the CFP which is Responded by the Responder.
    Given Initiator navigate to the Application and logged in as a discom user as per admin case two
    Then Verify whether the user is unable to Award the CFP as per admin case two

  Scenario: Admin user giving award Rights for Initiator
    Given Admin User navigates to the application and logs in as an admin as per Admin case two
    And Admin user giving award Rights for Initiator as per Admin case two

  Scenario: :Initiator is Awarding the CFP after admin gave the rights.
    Given Initiator navigate to the Application and logged in as a discom user as per admin case two
    And Verify whether the user is able to Award and Generate LOA after admin gave the rights to the initiator as per admin case two

  # Scenario: Discom Member Uploading the documents from Responder Side.
  #   Given Responder navigate to the Application and logged in as a discom user as per admin case two
  #   Then Responder Uploading the documents should be successfull as per admin case two

  # Scenario: New Discom Member Genarating Format D as initiator
  #   Given Initiator navigate to the Application and logged in as a discom user as per admin case two
  #   Then Format D should be successfully Generated from initiator side as per admin case two

  # Scenario: Discom Member Genarating Format D as Responder
  #   Given Responder navigate to the Application and logged in as a discom user as per admin case two
  #   Then Format D should be successfully Generated from Responder side as per admin case two




#  Scenario: New Discom Member assigning mew user to him through Manage user.
#     Given New user navigates to the application and logs in as an admin as per Admin Case two
#     And New user adds a staff user and assigns rights to the new user as per Admin Case two
#     Then Assigned new user successfully logs in as a staff member of the new member as per Admin Case two
