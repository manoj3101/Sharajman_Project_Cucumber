Feature: TC_AD_003

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case three
    And New user logs into the application again and changes the password as per Admin case three
    Then New user begins the registration process as per Admin case three

  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case three
    And Admin approves the new discom user and assigns a subscription plan as per Admin case three
    Then Admin approves the payment and assigns rights to the new user as per Admin case three

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    And New User navigate to the Application and logged in as a discom user as initiator as per admin case three
    And New User started creating Call for Proposal CFP as an initiator as per admin case three
    Then Call for Proposal CFP should be Published successfully as per admin case three

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per admin case three
    And User started placing Response to the CFP as per admin case three
    Then Response CFP should be Placed successfully as per admin case three

  Scenario: Discom Member Responding to the  CFP as a Responder two.
    Given User navigate to the Application and logged in as a discom user as Responder two as per admin case three
    And Responder two started placing Response to the CFP as per admin case three
    Then Responder two Response CFP should be Placed successfully as per admin case three

  Scenario: Discom Member Responding to the  CFP as a Responder three.
    Given User navigate to the Application and logged in as a discom user as Responder three as per admin case three
    And Responder three started placing Response to the CFP as per admin case three
    Then Responder three Response CFP should be Placed successfully as per admin case three

  Scenario: New Discom Member Awarding CFP and couldn't Generating LOA.
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case three
    And New User started generating the award and verify that the application does not allow generating the LOA from initiator side as per admin case three
    Then New User can able to award and could not able to generate LOA as per admin case three





  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case three
    And User started creating Call for Proposal CFP as an initiator as per admin case three
    Then Call for Proposal CFP should be Published successfully as per admin case three

  Scenario: New Discom Member Responding to the  CFP as a Responder.
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case three
    And New User started placing Response to the CFP as per admin case three
    Then New User Response CFP should be Placed successfully as per admin case three

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case three
    And User started generating the award and generating the LOA from initiator side as per admin case three
    Then User Awarding and Generate LOA should be successfull as per admin case three

  Scenario: New Discom Member assigning mew user to him through Manage user.
    Given New user navigates to the application and logs in as an admin as per Admin Case three
    And New user adds a staff user and assigns rights to the new user as per Admin Case three
    Then Assigned new user successfully logs in as a staff member of the new member as per Admin Case three
