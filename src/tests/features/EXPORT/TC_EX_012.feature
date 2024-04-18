Feature: TC_EX_012

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case twelve
    And User started creating Call for Proposal CFP as an initiator as per export case twelve
    Then CFP should be Published successfully as Expected from initiator as per export case twelve

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case twelve
    And User started placing Response to the CFP as per export case twelve
    Then Verify whether the CFP Placed successfully from responder as per export case twelve

  Scenario: CFP for awarding timne should get expired.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case twelve
    Then Verify whether the Awarding time is expired as Expected from initiator as per export case twelve

