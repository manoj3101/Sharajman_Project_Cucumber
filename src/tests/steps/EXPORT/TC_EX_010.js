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
Given('User navigate to the Application and logged in as a discom user as initiator as per export case ten', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_EX_010                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");

    await login.login(data.user1, data.user1_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per export case ten', async function () {
    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(data.EX_10.chooseCFP);

    await dashboardCFP.powerSwapping(data.EX_10.Power_swapping);

    await dashboardCFP.firstChoice(data.EX_10.Fisrt_choice);

    await dashboardCFP.resultPublish(data.EX_10.Result_Published);

    await dashboardCFP.importPeriod(data.EX_10.Quantum_value, data.EX_10.imp_start_date, data.EX_10.imp_end_date, data.EX_10.imp_start_time, data.EX_10.imp_end_time);

    await dashboardCFP.minimumQuantum(data.EX_10.Minimum_Quantum, data.EX_10.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(data.EX_10.exp_start_date, data.EX_10.exp_end_date, data.EX_10.exp_start_time, data.EX_10.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(data.EX_10.response_days, data.EX_10.response_hours, data.EX_10.response_mins);

    await dashboardCFP.awarding_time(data.EX_10.award_days, data.EX_10.award_hours, data.EX_10.award_mins);

    await dashboardCFP.loa_Issuance_time(data.EX_10.loa_issuance_days, data.EX_10.loa_issuance_hours, data.EX_10.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(data.EX_10.loa_acceptance_days, data.EX_10.loa_acceptance_hours, data.EX_10.loa_acceptance_mins);

    await dashboardCFP.otherDetails(data.EX_10.index, data.EX_10.Settlement_Price);

    await dashboardCFP.commentBox(data.EX_10.query_Box);

    await dashboardCFP.ceilingBaseReturn(data.EX_10.Ceiling_Base_Return, data.EX_10.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(data.EX_10.multiple_responder, data.responder);

    await dashboardCFP.custom_Guests(data.EX_10.custom_Guests);

    await dashboardCFP.remarks(data.EX_10.remarks);

});

Then('CFP should be Published as Expected from initiator as per export case ten', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    //CFP = dashboardCFP.CFP_Num;
    global.cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + global.cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as Responder  as per export case ten', async function () {

    // login = new Login(pageFixture.page);
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per export case ten', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('CFP should be Placed as Expected from responder as per export case ten', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.EX_10.minQuantumValue1, data.EX_10.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(data.EX_10.imp_start_date, data.EX_10.imp_end_date, data.EX_10.imp_start_time, data.EX_10.imp_end_time, data.EX_10.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(data.EX_10.exp_start_date, data.EX_10.exp_end_date, data.EX_10.exp_start_time, data.EX_10.exp_end_time, data.EX_10.ReturnValue1);


    console.log("--------------------Response CFP placed Successfully-----------------");

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating the award and generating the LOA from initiator side  as per export case ten', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    await pageFixture.page.waitForTimeout(885000);   //wait time for 15 minutes 

    console.log("Wait time is over Awarding CFP has started......");

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward(); //Generating Award 

});

Then('Awarding should be successfull and generate LOA Timeline should be Expired as per export case ten', { timeout: 160 * 1000 }, async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(data.EX_10.imp_start_date, data.EX_10.imp_end_date, data.EX_10.imp_start_time, data.EX_10.imp_end_time, data.EX_10.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(data.EX_10.exp_start_date, data.EX_10.exp_end_date, data.EX_10.exp_start_time, data.EX_10.exp_end_time, data.EX_10.ReturnValue1);

    await dashboardCFP.expired_initiator_LOA(cfpNumber);

    console.log("--------------------Awarding should be successfull anf generate LOA Timeline should be Expired-----------------");
    console.log("Initiator can't Uploaded the LOA documents. \n <<<<<<<<<<<Your LOA issuance timeline has been expired..>>>>>>>>>>>>>>");

});





