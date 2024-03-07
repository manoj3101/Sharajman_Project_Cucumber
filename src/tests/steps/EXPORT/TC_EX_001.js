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
Given('User navigate to the Application and logged in as a discom user as initiator as per export case one', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_EX_001                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    await login.login(data.user1, data.user1_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per export case one', async function () {
    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(data.EX_01.chooseCFP);

    await dashboardCFP.powerSwapping(data.EX_01.Power_swapping);

    await dashboardCFP.firstChoice(data.EX_01.Fisrt_choice);

    await dashboardCFP.resultPublish(data.EX_01.Result_Published);

    await dashboardCFP.importPeriod(data.EX_01.Quantum_value, data.EX_01.imp_start_date, data.EX_01.imp_end_date, data.EX_01.imp_start_time, data.EX_01.imp_end_time);

    await dashboardCFP.minimumQuantum(data.EX_01.Minimum_Quantum, data.EX_01.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(data.EX_01.exp_start_date, data.EX_01.exp_end_date, data.EX_01.exp_start_time, data.EX_01.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(data.EX_01.response_days, data.EX_01.response_hours, data.EX_01.response_mins);

    await dashboardCFP.awarding_time(data.EX_01.award_days, data.EX_01.award_hours, data.EX_01.award_mins);

    await dashboardCFP.loa_Issuance_time(data.EX_01.loa_issuance_days, data.EX_01.loa_issuance_hours, data.EX_01.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(data.EX_01.loa_acceptance_days, data.EX_01.loa_acceptance_hours, data.EX_01.loa_acceptance_mins);

    await dashboardCFP.otherDetails(data.EX_01.index, data.EX_01.Settlement_Price);

    await dashboardCFP.commentBox(data.EX_01.query_Box);

    await dashboardCFP.ceilingBaseReturn(data.EX_01.Ceiling_Base_Return, data.EX_01.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(data.EX_01.multiple_responder);

    await dashboardCFP.custom_Guests(data.EX_01.custom_Guests);

    await dashboardCFP.remarks(data.EX_01.remarks);

});

Then('Call for Proposal CFP should be Published successfully as per export case one', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    //CFP = dashboardCFP.CFP_Num;
    global.cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + global.cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as Responder as per export case one', async function () {

    // login = new Login(pageFixture.page);
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per export case one', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('Response CFP should be Placed successfully as per export case one', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.EX_01.minQuantumValue1, data.EX_01.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(data.EX_01.imp_start_date, data.EX_01.imp_end_date, data.EX_01.imp_start_time, data.EX_01.imp_end_time, data.EX_01.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(data.EX_01.exp_start_date, data.EX_01.exp_end_date, data.EX_01.exp_start_time, data.EX_01.exp_end_time, data.EX_01.ReturnValue1);


    console.log("--------------------Response CFP placed Successfully -----------------");

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating the award and generating the LOA from initiator side as per export case one', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started......");

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

});


Then('Awarding and Generate LOA should be successfull as per export case one', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(data.EX_01.imp_start_date, data.EX_01.imp_end_date, data.EX_01.imp_start_time, data.EX_01.imp_end_time, data.EX_01.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(data.EX_01.exp_start_date, data.EX_01.exp_end_date, data.EX_01.exp_start_time, data.EX_01.exp_end_time, data.EX_01.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------


Given('User started Uploading the documents from Responder Side as per export case one', async function () {

    await loaManagement.loaGeneration();

});



Then('Responder Uploading the documents should be successfull as per export case one', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating Format D from initiator side as per export case one', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

});


Then('Format D  should be successfully Generated as per export case one', async function () {

    await loaManagement.formatD(data.EX_01.GTAM, data.EX_01.source_of_generation, data.EX_01.RPO, data.EX_01.TGNA);

});


