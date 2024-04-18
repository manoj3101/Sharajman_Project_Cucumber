Feature: TC_EX_011

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case eleven
    And User started creating Call for Proposal CFP as an initiator as per export case eleven
    Then CFP should be Published successfully as Expected from initiator as per export case eleven

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case eleven
    And User started placing Response to the CFP as per export case eleven
    Then CFP should be Placed successfully as Expected from responder as per export case eleven

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case eleven
    And User started generating the award and generating the LOA from initiator side as per export case eleven
    Then Awarding and Generate LOA should be successfull as Expected from initiator as per export case eleven

  Scenario: LOA acceptance timeline should get expired.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case eleven
    Then Verify whether the LOA acceptance timeline is expired as per export case eleven
