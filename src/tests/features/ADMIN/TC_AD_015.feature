Feature: TC_AD_015

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case fifteen
    And New user logs into the application again and changes the password as per Admin case fifteen
    Then New user begins the registration process as per Admin case fifteen
    
  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case fifteen
    And Admin approves the new discom user and assigns a subscription plan as per Admin case fifteen
    Then Admin approves the payment and assigns rights to the new user as per Admin case fifteen

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case fifteen


  