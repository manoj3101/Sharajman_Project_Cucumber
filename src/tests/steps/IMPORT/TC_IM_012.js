const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const Login = require("../../../pages/Member/Login");
const Home = require("../../../pages/Member/Home");
const DashboardCFP = require("../../../pages/Member/DashboardCFP");
const LOAManagement = require("../../../pages/Member/LOAManagement");

//setDefaultTimeout(120 * 1000);// Set global timeout for all actions
setDefaultTimeout({
    step: 90000,           // Timeout for actions like clicks, typing
    hook: 90000,           // Timeout for hooks
    timeout: 120000        // Timeout for scenarios and scenario outlines
});


//Object Instantiations
const login = new Login(pageFixture.page);
const home = new Home(pageFixture.page);
const dashboardCFP = new DashboardCFP(pageFixture.page);
const loaManagement = new LOAManagement(pageFixture.page);



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as initiator as per import case twelve', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_IM_012                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");

    await login.login(data.user1, data.user1_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per import case twelve', async function () {
    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(data.TC_12.chooseCFP);

    await dashboardCFP.powerSwapping(data.TC_12.Power_swapping);

    await dashboardCFP.firstChoice(data.TC_12.Fisrt_choice);

    await dashboardCFP.resultPublish(data.TC_12.Result_Published);

    await dashboardCFP.importPeriod(data.TC_12.Quantum_value, data.TC_12.imp_start_date, data.TC_12.imp_end_date, data.TC_12.imp_start_time, data.TC_12.imp_end_time);

    await dashboardCFP.minimumQuantum(data.TC_12.Minimum_Quantum, data.TC_12.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(data.TC_12.exp_start_date, data.TC_12.exp_end_date, data.TC_12.exp_start_time, data.TC_12.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(data.TC_12.response_days, data.TC_12.response_hours, data.TC_12.response_mins);

    await dashboardCFP.awarding_time(data.TC_12.award_days, data.TC_12.award_hours, data.TC_12.award_mins);

    await dashboardCFP.loa_Issuance_time(data.TC_12.loa_issuance_days, data.TC_12.loa_issuance_hours, data.TC_12.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(data.TC_12.loa_acceptance_days, data.TC_12.loa_acceptance_hours, data.TC_12.loa_acceptance_mins);

    await dashboardCFP.otherDetails(data.TC_12.index, data.TC_12.Settlement_Price);

    await dashboardCFP.commentBox(data.TC_12.query_Box);

    await dashboardCFP.ceilingBaseReturn(data.TC_12.Ceiling_Base_Return, data.TC_12.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(data.TC_12.multiple_responder);

    await dashboardCFP.custom_Guests(data.TC_12.custom_Guests);

    await dashboardCFP.remarks(data.TC_12.remarks);

});

Then('CFP should be Published successfully as Expected from initiator as per import case twelve', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    //CFP = dashboardCFP.CFP_Num;
    global.cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + global.cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as Responder as per import case twelve', async function () {

    // login = new Login(pageFixture.page);
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per import case twelve', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('CFP should be Placed successfully as Expected from responder as per import case twelve', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.TC_12.minQuantumValue1, data.TC_12.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(data.TC_12.imp_start_date, data.TC_12.imp_end_date, data.TC_12.imp_start_time, data.TC_12.imp_end_time, data.TC_12.Quantum_value);

    await dashboardCFP.energycalculation_responder(data.TC_12.exp_start_date, data.TC_12.exp_end_date, data.TC_12.exp_start_time, data.TC_12.exp_end_time, data.TC_12.ReturnValue1);


    console.log("--------------------Response CFP placed Successfully-----------------");

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Then('CFP for Awarding time should be expired successfully as Expected from initiator as per import case twelve', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started...................");

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await pageFixture.page.waitForTimeout(160 * 1000); //waiting for the cfp timeline expires

    console.log("Three Minutes Wait time is over...................");

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.CFP_Expire(); //CFP Expired 


});






