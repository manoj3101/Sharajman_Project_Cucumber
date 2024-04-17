Feature: TC_IM_005

  Scenario: Discom Member Create CFP and Publishing the CFP.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case five
    And User started creating Call for Proposal CFP as an initiator as per import case five
    Then Call for Proposal CFP should be Published successfully as per import case five

  Scenario: Discom Member Responding to the  CFP as a Responder.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case five
    And User started placing Response to the CFP as per import case five
    Then Response CFP should be Placed successfully as per import case five

  Scenario: Discom Member Responding to the  CFP as a Responder Two.
    Given User navigate to the Application and logged in as a discom user as Responder two as per import case five
    And Responder two started placing Response to the CFP as per import case five
    Then Responder two Response CFP should be Placed successfully as per import case five

  Scenario: Discom Member Responding to the  CFP as a Responder Three.
    Given User navigate to the Application and logged in as a discom user as Responder three as per import case five
    And Responder three started placing Response to the CFP as per import case five
    Then Responder three Response CFP should be Placed successfully as per import case five

  Scenario: Discom Member Awarding CFP and Generating LOA.
    Given User navigate to the Application and logged in as a discom user as initiator as per import case five
    And User started generating the award and generating the LOA from initiator side as per import case five
    Then Awarding and Generate LOA should be successfull as per import case five

  Scenario: Discom Member Uploading the documents from Responder Side.
    Given User navigate to the Application and logged in as a discom user as Responder as per import case five
    And User started Uploading the documents from Responder Side as per import case five
    Then Responder Uploading the documents should be successfull as per import case five

  Scenario: Discom Member Genarating Format D as initiator
    Given User navigate to the Application and logged in as a discom user as initiator as per import case five
    Then Format D should be successfully Generated from initiator side as per import case five

  Scenario: Discom Member Genarating Format D as Responder
    Given User navigate to the Application and logged in as a discom user as Responder as per import case five
    Then Format D should be successfully Generated from Responder side as per import case five
