const { Given } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const { home, cfpNumber, dashboardCFP } = require("./TC_AD_006");

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------
Given('New User started generating the award and generating the LOA from initiator side as per admin case six', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started......");

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

});
