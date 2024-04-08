const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const Login = require("../../../pages/Member/Login");
const Home = require("../../../pages/Member/Home");
const DashboardCFP = require("../../../pages/Member/DashboardCFP");
const LOAManagement = require("../../../pages/Member/LOAManagement");
const TransactionFee = require("../../../pages/Admin/TransactionFee");

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
const transactionFee = new TransactionFee(pageFixture.page);


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('Admin navigate to the application and login and fetching the transaction fee formula as per import case nine', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_IM_009                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    await login.login(data.admin, data.admin_password);
    await transactionFee.click_Transaction_Fee(); //Click the transaction fee 
    await transactionFee.fetch_Transaction_Fee(data.feeName, data.TC_09.Quantum_value); // Fetch the transaction fee formula
    await login.logout(); //Logout
});

Given('User navigate to the Application and logged in as a discom user as initiator as per import case nine', async function () {
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(data.user1, data.user1_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per import case nine', async function () {
    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(data.TC_09.chooseCFP);

    await dashboardCFP.powerSwapping(data.TC_09.Power_swapping);

    await dashboardCFP.firstChoice(data.TC_09.Fisrt_choice);

    await dashboardCFP.resultPublish(data.TC_09.Result_Published);

    await dashboardCFP.importPeriod(data.TC_09.Quantum_value, data.TC_09.imp_start_date, data.TC_09.imp_end_date, data.TC_09.imp_start_time, data.TC_09.imp_end_time);

    await dashboardCFP.minimumQuantum(data.TC_09.Minimum_Quantum, data.TC_09.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(data.TC_09.exp_start_date, data.TC_09.exp_end_date, data.TC_09.exp_start_time, data.TC_09.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(data.TC_09.response_days, data.TC_09.response_hours, data.TC_09.response_mins);

    await dashboardCFP.awarding_time(data.TC_09.award_days, data.TC_09.award_hours, data.TC_09.award_mins);

    await dashboardCFP.loa_Issuance_time(data.TC_09.loa_issuance_days, data.TC_09.loa_issuance_hours, data.TC_09.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(data.TC_09.loa_acceptance_days, data.TC_09.loa_acceptance_hours, data.TC_09.loa_acceptance_mins);

    await dashboardCFP.otherDetails(data.TC_09.index, data.TC_09.Settlement_Price);

    await dashboardCFP.commentBox(data.TC_09.query_Box);

    await dashboardCFP.ceilingBaseReturn(data.TC_09.Ceiling_Base_Return, data.TC_09.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(data.TC_09.multiple_responder, data.responder);

    await dashboardCFP.custom_Guests(data.TC_09.custom_Guests);

    await dashboardCFP.remarks(data.TC_09.remarks);

});

Then('CFP should be Published successfully as Expected as per import case nine', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    //CFP = dashboardCFP.CFP_Num;
    global.cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + global.cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as Responder as per import case nine', async function () {

    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per import case nine', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('CFP should be Placed successfully as Expected as per import case nine', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.TC_09.minQuantumValue1, data.TC_09.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_09.imp_start_time, data.TC_09.imp_end_time, data.TC_09.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_09.exp_start_time, data.TC_09.exp_end_time, data.TC_09.ReturnValue1);


});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating the award and generating the LOA from initiator side as per import case nine', { timeout: 1200000 }, async function () {

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

Then('Awarding and Generate LOA should be successfull as Expected as per import case nine', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_09.imp_start_time, data.TC_09.imp_end_time, data.TC_09.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_09.exp_start_time, data.TC_09.exp_end_time, data.TC_09.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_09.imp_start_time, data.TC_09.imp_end_time, data.TC_09.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_09.exp_start_time, data.TC_09.exp_end_time, data.TC_09.ReturnValue1, data.TC_09.Settlement_Price, data.TC_09.loa_issuance_mins);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");
    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------

Given('User started Uploading the documents from Responder Side as per import case nine', async function () {

    await loaManagement.loaGeneration();

});



Then('Responder should be able to reject the LOA successfully as per import case nine', { timeout: 120 * 1000 }, async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    console.log("Waiting 2 minutes for the timeline expires.........");

    await pageFixture.page.waitForTimeout(90 * 1000);

    await loaManagement.responder_Rejects_loa(cfpNumber);

    console.log("Responder reject the LOA successfully");


});



