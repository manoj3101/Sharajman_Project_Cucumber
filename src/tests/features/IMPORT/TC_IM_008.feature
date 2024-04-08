Feature: TC_IM_008

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given Admin navigate to the application and login and fetching the transaction fee formula as per import case eight
    Given User navigate to the Application and logged in as a discom user as initiator as per import case eight
    And User started creating Call for Proposal CFP as an initiator as per import case eight
    Then Call for Proposal CFP should be Published successfully as Expected as per import case eight

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case eight
    And User started placing Response to the CFP as per import case eight
    Then Response CFP should be Placed successfully as Expected as per import case eight

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case eight
    And User started generating the award and generating the LOA from initiator side as per import case eight
    Then Awarding and Generate LOA should be successfull as Expected as per import case eight

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case eight
    And User started Uploading the documents from Responder Side as per import case eight
    Then Responder Uploading the documents should be successfull as Expected as per import case eight

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per import case eight
    Then Format D should be successfully Generated from initiator side as per import case eight

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per import case eight
    Then Format D should be successfully Generated from Responder side as per import case eight
