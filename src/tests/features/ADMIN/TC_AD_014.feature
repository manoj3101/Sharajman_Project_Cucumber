Feature: TC_AD_014

  Scenario: New Member Signing Up for the OTC Platform
    Given New user navigates to the application and initiates the sign-up process as per Admin case fourteen
    And New user logs into the application again and changes the password as per Admin case fourteen
    Then New user begins the registration process as per Admin case fourteen
    
  Scenario: Admin Approving the New Member and Assigning Subscription Plan and Rights
    Given Admin User navigates to the application and logs in as an admin as per Admin case fourteen
    And Admin rejects the new discom user as per Admin case fourteen

  Scenario: New Discom Member Create CFP and Publishing the CFP.
    Given New User navigate to the Application and logged in as a discom user as initiator as per admin case fourteen
    And New User verifying the registration status as per admin case fourteen

 