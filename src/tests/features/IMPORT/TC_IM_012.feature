Feature: TC_IM_012

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case twelve 
    And User started creating Call for Proposal CFP as an initiator as per import case twelve
    Then CFP should be Published successfully as Expected from initiator as per import case twelve

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case twelve
    And User started placing Response to the CFP as per import case twelve
    Then CFP should be Placed successfully as Expected from responder as per import case twelve

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case twelve
    Then CFP for Awarding time should be expired successfully as Expected from initiator as per import case twelve
