Feature: TC_EX_002

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case two
    And User started creating Call for Proposal CFP as an initiator as per export case two
    Then Call for Proposal CFP should be Published successfully as per export case two

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case two
    And User started placing Response to the CFP as per export case two
    Then Response CFP should be Placed successfully as per export case two

  Scenario: Discom Member Responding to the  CFP as a Responder two.
    Given User navigate to the Application and logged in as a discom user as Responder two as per export case two
    And Responder two started placing Response to the CFP as per export case two
    Then Responder two Response CFP should be Placed successfully as per export case two

  Scenario: Discom Member Responding to the  CFP as a Responder three.
    Given User navigate to the Application and logged in as a discom user as Responder three as per export case two
    And Responder three started placing Response to the CFP as per export case two
    Then Responder three Response CFP should be Placed successfully as per export case two

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per export case two
    And User started generating the award and generating the LOA from initiator side as per export case two
    Then Awarding and Generate LOA should be successfull as per export case two

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per export case two
    And User started Uploading the documents from Responder Side as per export case two
    Then Responder Uploading the documents should be successfull as per export case two

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per export case two
    Then Format D should be successfully Generated from initiator side as per export case two

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per export case two
    Then Format D should be successfully Generated from Responder side as per export case two
