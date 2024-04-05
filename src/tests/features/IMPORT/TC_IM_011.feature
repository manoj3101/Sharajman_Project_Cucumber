Feature: TC_IM_011

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given Admin navigate to the application and login and fetching the transaction fee formula as per import case eleven
    Given User navigate to the Application and logged in as a discom user as initiator as per import case eleven
    And User started creating Call for Proposal CFP as an initiator as per import case eleven
    Then CFP should be Published successfully as Expected from initiator as per import case eleven

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case eleven
    And User started placing Response to the CFP as per import case eleven
    Then CFP should be Placed successfully as Expected from responder as per import case eleven

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case eleven
    And User started generating the award and generating the LOA from initiator side as per import case eleven
    Then Awarding and Generate LOA should be successfull as Expected from initiator as per import case eleven

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case eleven
    And User started Uploading the documents from Responder Side as per import case eleven
    Then LOA acceptance timeline by the Responder as per import case eleven
