Feature: TC_AD_001


  Scenario: New Member Signing Up for the OTC Platform for initiator
    Given New Initiator user navigates to the application and initiates the sign-up process as per Admin case one
    And New Initiator user logs into the application again and changes the password as per Admin case one
    Then New Initiator user begins the registration process as per Admin case one

  Scenario: Admin Approving the Initiator and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case one
    And Admin approves the Initiator user and assigns a subscription plan as per Admin case one
    Then Admin approves the payment and assigns rights to the Initiator as per Admin case one

  Scenario: New Member Signing Up for the OTC Platform for responder
    Given New Responder user navigates to the application and initiates the sign-up process as per Admin case one
    And New Responder user logs into the application again and changes the password as per Admin case one
    Then New Responder user begins the registration process as per Admin case one

  Scenario: Admin Approving the Responder and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case one
    And Admin approves the Responder user and assigns a subscription plan as per Admin case one
    Then Admin approves the payment and assigns rights to the Responder as per Admin case one

  Scenario: Initiator Creates CFP and Publishing the CFP.
    Given Initiator user navigates to the Application and logged in as per admin case one
    And Initiator started creating Call for Proposal CFP as per admin case one
    Then Verify Call for Proposal CFP Published successfully as per admin case one

#------------


  Scenario: Responder Responding to the CFP
    Given Responder navigates to the Application and logged in as per admin case one
    Then Verify Response CFP should be Placed successfully as per admin case one

 
  Scenario: Initiator Awarding CFP and Generating LOA.
    Given Initiator user navigates to the Application and logged in as per admin case one
    And Initiator started generating the award and generating the LOA as per admin case one
    Then Verify Awarding and Generate LOA is successfull as per admin case one



  Scenario: Awarded Responder Uploading the documents.
    Given Responder navigates to the Application and logged in as per admin case one
    Then Verify Responder's Upload documents is successfull as per admin case one




  Scenario: Initator Member Genarating Format D as initiator
    Given Initiator user navigates to the Application and logged in as per admin case one
    Then Verify Format D is successfully Generated from initiator side as per admin case one

  Scenario: Responder Genarating Format D.
    Given Responder navigates to the Application and logged in as per admin case one
    Then Verify Format D is successfully Generated from Responder side as per admin case one


  Scenario: Initiator assigning new user to him through Manage user.
    Given Initator navigates to the application and logs in as an admin as per Admin Case One
    And Initator adds a staff user and assigns rights to the new user as per Admin Case One
    Then Verify assigned new user successfully logs in as a staff member of the new member as per Admin Case One
