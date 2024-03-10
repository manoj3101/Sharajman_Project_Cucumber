Feature: TC_EX_009

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case nine 
    And User started creating Call for Proposal CFP as an initiator as per export case nine
    Then CFP should be Published successfully as Expected from initiator as per export case nine

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case nine
    And User started placing Response to the CFP as per export case nine
    Then CFP should be Placed successfully as Expected from responder as per export case nine

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case nine
    And User started generating the award and generating the LOA from initiator side as per export case nine
    Then Awarding and Generate LOA should be successfull as Expected from initiator Export

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case nine
    And User started Uploading the documents from Responder Side as per export case nine
    Then Responder should be able to reject the LOA successfully as per export case nine
