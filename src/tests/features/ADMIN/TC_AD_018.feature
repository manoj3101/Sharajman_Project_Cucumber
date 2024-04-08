Feature: TC_AD_002

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case eighteen
    And New user logs into the application again and changes the password as per Admin case eighteen
    Then New user begins the registration process as per Admin case eighteen
    
  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case eighteen
    And Admin approves the new discom user and assigns a subscription plan as per Admin case eighteen
    Then Admin approves the payment and assigns rights to the new user as per Admin case eighteen

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    Given Admin navigate to the application and login and fetching the transaction fee formula as per admin case eighteen
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    And New User started creating Call for Proposal CFP as an initiator as per admin case eighteen
    Then Call for Proposal CFP should be Published successfully as per admin case eighteen

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    And User started placing Response to the CFP as per admin case eighteen
    Then Response CFP should be Placed successfully as per admin case eighteen

  Scenario: New Discom Member Awarding CFP and Generating LOA.
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    And New User started generating the award and generating the LOA from initiator side as per admin case eighteen
    Then Awarding and Generate LOA should be successfull as per admin case eighteen

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    Then Responder Uploading the documents should be successfull as per admin case eighteen

  Scenario: New Discom Member Genarating Format D as initiator
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    Then Format D should be successfully Generated from initiator side as per admin case eighteen

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    Then Format D should be successfully Generated from Responder side as per admin case eighteen






  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    And User started creating Call for Proposal CFP as an initiator as per admin case eighteen
    Then Call for Proposal CFP should be Published successfully as per admin case eighteen

  Scenario: New Discom Member Responding to the  CFP as a Responder.
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    And New User started placing Response to the CFP as per admin case eighteen
    Then New User Response CFP should be Placed successfully as per admin case eighteen

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    And User started generating the award and generating the LOA from initiator side as per admin case eighteen
    Then User Awarding and Generate LOA should be successfull as per admin case eighteen

  Scenario: New Discom Member Uploading the documents from Responder Side.
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    Then New User Responder Uploading the documents should be successfull as per admin case eighteen

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per admin case eighteen
    Then User Format D should be successfully Generated from initiator side as per admin case eighteen

  Scenario: New Discom Member Genarating Format D as Responder
    Given New User navigate to the Application and logged in as a discom user as Responder as per admin case eighteen
    Then New User Format D should be successfully Generated from Responder side as per admin case eighteen


 Scenario: New Discom Member assigning mew user to him
    Given New user navigates to the application and logs in as an admin as per Admin Case eighteen
    And New user adds a staff user and assigns rights to the new user as per Admin Case eighteen
    Then Assigned new user successfully logs in as a staff member of the new member as per Admin Case eighteen