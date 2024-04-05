Feature: TC_IM_004

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given Admin navigate to the application and login and fetching the transaction fee formula as per import case four
    Given User navigate to the Application and logged in as a discom user as initiator as per import case four
    And User started creating Call for Proposal CFP as an initiator as per import case four
    Then Call for Proposal CFP should be Published successfully as per import case four

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case four
    And User started placing Response to the CFP as per import case four
    Then Response CFP should not be Placed successfully as per import case four

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case four
    And User started generating the award and generating the LOA from initiator side as per import case four
    Then Awarding and Generate LOA should be successfull as per import case four

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case four
    And User started Uploading the documents from Responder Side as per import case four
    Then Responder Uploading the documents should be successfull as per import case four

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per import case four
    Then Format D should be successfully Generated from initiator side as per import case four

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per import case four
    Then Format D should be successfully Generated from Responder side as per import case four
