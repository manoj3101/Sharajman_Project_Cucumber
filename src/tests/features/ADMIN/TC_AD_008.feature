Feature: TC_AD_008

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case eight
    And New user logs into the application again and changes the password as per Admin case eight
    Then New user begins the registration process as per Admin case eight
    
  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case eight
    And Admin approves the new discom user and assigns a subscription plan as per Admin case eight
    Then Admin approves the payment and assigns rights to the new user as per Admin case eight

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    # Given Admin navigate to the application and login and fetching the transaction fee formula as per admin case eight
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eight
    And New User verifying the registration status as per admin case eight
    And New User started creating Call for Proposal CFP as an initiator as per admin case eight
    Then Call for Proposal CFP should be Published successfully as per admin case eight

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per admin case eight
    And User started placing Response to the CFP as per admin case eight
    Then Response CFP should be Placed successfully as per admin case eight

  Scenario: New Discom Member unable to Award CFP and Generate LOA due to privilege action.
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eight
    And Verify the New User unable to generate the award and LOA from initiator side as per admin case eight





  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case eight
    And User started creating Call for Proposal CFP as an initiator as per admin case eight
    Then Call for Proposal CFP should be Published successfully as per admin case eight

  Scenario: New Discom Member Responding to the  CFP as a Responder.
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case eight
    Then New User can not Response CFP successfully as per admin case eight
