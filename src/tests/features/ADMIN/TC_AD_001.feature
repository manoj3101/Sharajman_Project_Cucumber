Feature: TC_AD_001

  Scenario: New Member SignUp
    Given User navigate to the application and signUp
    And Login Again
    And Login Again after Change Password
    And PreRegistration

  Scenario: New Member PreRegistration
    Given User navigate to the application and signUp
    And Login Again
    And Login Again after Change Password
    And PreRegistration
