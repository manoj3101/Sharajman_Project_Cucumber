Feature: TC_IM_007

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given Admin navigate to the application and login and fetching the transaction fee formula as per import case seven
    Given User navigate to the Application and logged in as a discom user as initiator as per import case seven
    And User started creating Call for Proposal CFP as an initiator as per import case seven
    Then Call for Proposal CFP should be Published successfully as per import case seven

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case seven
    And User started placing Response to the CFP as per import case seven
    Then Response CFP should be Placed successfully as per import case seven

  Scenario: Discom Member Responding to the  CFP as a Responder Seven.
    Given User navigate to the Application and logged in as a discom user as Responder two as per import case seven
    And Responder two started placing Response to the CFP as per import case seven
    Then Responder two Response CFP should be Placed successfully as per import case seven

  Scenario: Discom Member Responding to the  CFP as a Responder Seven.
    Given User navigate to the Application and logged in as a discom user as Responder three as per import case seven
    And Responder three started placing Response to the CFP as per import case seven
    Then Responder three Response CFP should be Placed successfully as per import case seven

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case seven
    And User started generating the award and generating the LOA from initiator side as per import case seven
    Then Awarding and Generate LOA should be successfull as per import case seven

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case seven
    And User started Uploading the documents from Responder Side as per import case seven
    Then Responder Uploading the documents should be successfull as per import case seven

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per import case seven
    Then Format D should be successfully Generated from initiator side as per import case seven

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per import case seven
    Then Format D should be successfully Generated from Responder side as per import case seven
