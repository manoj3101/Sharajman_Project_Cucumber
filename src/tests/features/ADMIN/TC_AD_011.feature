Feature: TC_AD_011

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case eleven
    And New user logs into the application again and changes the password as per Admin case eleven
    Then New user begins the registration process as per Admin case eleven
    
  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case eleven
    And Admin approves the new discom user and assigns a subscription plan as per Admin case eleven
    Then Admin approves the payment and assigns rights to the new user as per Admin case eleven

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    # Given Admin navigate to the application and login and fetching the transaction fee formula as per admin case eleven
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eleven
    And New User verifying the registration status as per admin case eleven
    And New User started creating Call for Proposal CFP as an initiator as per admin case eleven
    Then Verify the user unable to publish CFP as per admin case eleven




 Scenario: New Discom Member assigning mew user to him
    Given New user navigates to the application and logs in as an admin as per Admin Case eleven
    And New user adds a staff user and assigns rights to the new user as per Admin Case eleven
    Then Assigned new user successfully logs in as a staff member of the new member as per Admin Case eleven


  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case eleven
    And User started creating Call for Proposal CFP as an initiator as per admin case eleven
    Then Call for Proposal CFP should be Published successfully as per admin case eleven

  Scenario: New Discom Member Responding to the  CFP as a Responder.
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case eleven
    Then New User can not Response CFP successfully as per admin case eleven

