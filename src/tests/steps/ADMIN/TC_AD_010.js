const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const ad_data = require('../../../helper/utils/admin_data.json');
const SignUp = require('../../../pages/Admin/SignUp');
const Registration = require('../../../pages/Admin/Registration');
const Manage_Member = require('../../../pages/Admin/Manage_Member');
const Member_Assistance = require('../../../pages/Admin/Member_Assistance')
const Payment_Approval = require('../../../pages/Admin/Payment_Approval');
const Login = require("../../../pages/Member/Login");
const Home = require("../../../pages/Member/Home");
const DashboardCFP = require("../../../pages/Member/DashboardCFP");
const LOAManagement = require("../../../pages/Member/LOAManagement");
const Manage_User = require('../../../pages/Member/Manage_User');
const TransactionFee = require("../../../pages/Admin/TransactionFee");


//setDefaultTimeout(120 * 1000);// Set global timeout for all actions
setDefaultTimeout({
    step: 90000,           // Timeout for actions like clicks, typing
    hook: 90000,           // Timeout for hooks
    timeout: 120000        // Timeout for scenarios and scenario outlines
});

//Object Instantiations
const signUp = new SignUp(pageFixture.page);
const registration = new Registration(pageFixture.page);
const manage_Member = new Manage_Member(pageFixture.page);
const member_Assistance = new Member_Assistance(pageFixture.page);
const payment_Approval = new Payment_Approval(pageFixture.page);

const login = new Login(pageFixture.page);
const home = new Home(pageFixture.page);
const dashboardCFP = new DashboardCFP(pageFixture.page);
const loaManagement = new LOAManagement(pageFixture.page);
const manage_User = new Manage_User(pageFixture.page);
const transactionFee = new TransactionFee(pageFixture.page);


//Variables
let name = signUp.Name;
let email_id = signUp.email_id;
let password = signUp.new_pass;
let org_name = signUp.org_name;
let ADDUSER_NAME = manage_User.addUser_Name;
let ADDUSER_EMAILID = manage_User.addUser_Email_id;
let cfpNumber;
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('New user navigates to the application and initiates the sign-up process as per Admin case ten', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_AD_010                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    await signUp.signup(); //Sign Up
});

Then('New user logs into the application again and changes the password as per Admin case ten', async function () {

    await signUp.login_Again("oldpassword"); //Login Again after SignUp
    await signUp.changePasswordAndTFA(); //Change Password & Two Factor Autentication
    await signUp.login_Again("newpassword"); //Login Again after Change Password
    await signUp.OTP(); //Fill OTP
    await signUp.inactiveTFA();


});

Then('New user begins the registration process as per Admin case ten', async function () {

    await signUp.login_Again("newpassword"); //Login Again after Change Password
    await registration.NOAR_Details(ad_data.AD_10.NOAR); //NOAR Details 
    await registration.basic_Details(org_name, ad_data.AD_10.natureofapplicant, ad_data.AD_10.gsttype); //Basic Details
    await registration.connection_Details(ad_data.AD_10.discomType, ad_data.AD_10.Max_Inj_Cap, ad_data.AD_10.Max_Draw_Cap); //Connection Details
    await registration.bank_Details(name); //Bank Details
    await registration.upload_Documents(); //Document Upload

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------

Given('Admin User navigates to the application and logs in as an admin as per Admin case ten', async function () {
    await login.login(ad_data.admin, ad_data.admin_password); //Login as a admin 
    // await signUp.OTP(); //OTP Validation 

});

Then('Admin approves the new discom user and assigns a subscription plan as per Admin case ten', async function () {

    await manage_Member.click_Manage_Member(); //Manage Member
    await manage_Member.approve_Member(org_name, ad_data.AD_10.Manage_member);  //Member assitance
    await member_Assistance.clickMemberAssitance();
    await member_Assistance.subscription_Plan_Selection(org_name); //Subscription Plan Selection

});

Then('Admin approves the payment and assigns rights to the new user as per Admin case ten', async function () {

    await payment_Approval.clickPaymentApproval(); //Payment Approval
    await payment_Approval.paymentApproval(org_name, ad_data.AD_10.Payment_approval);
    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(org_name, ad_data.AD_10.selectall, ad_data.AD_10.Home, ad_data.AD_10.Registration, ad_data.AD_10.Manage_User, ad_data.AD_10.FormatD, ad_data.AD_10.LOA_Generation, ad_data.AD_10.Award, ad_data.AD_10.Respond, ad_data.AD_10.Initiate);
});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------


Given('New User navigate to the Application and logged in as a discom user as initiator as per admin case ten', async function () {

    //New user as a Initiator
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(email_id, password);

});

Given('New User verifying the registration status as per admin case ten', async function () {

    //New user verifying  the registration status
    await home.clickRegistration();

    await home.checkRegistration();

    await home.clickHome();
});

Given('New User started creating Call for Proposal CFP as an initiator as per admin case ten', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_10.chooseCFP);

    await dashboardCFP.powerSwapping(ad_data.AD_10.Power_swapping);

    await dashboardCFP.firstChoice(ad_data.AD_10.Fisrt_choice);

    await dashboardCFP.resultPublish(ad_data.AD_10.Result_Published);

    await dashboardCFP.importPeriod(ad_data.AD_10.Quantum_value, ad_data.AD_10.imp_start_date, ad_data.AD_10.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time);

    await dashboardCFP.minimumQuantum(ad_data.AD_10.Minimum_Quantum, ad_data.AD_10.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(ad_data.AD_10.exp_start_date, ad_data.AD_10.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_10.response_days, ad_data.AD_10.response_hours, ad_data.AD_10.response_mins);

    await dashboardCFP.awarding_time(ad_data.AD_10.award_days, ad_data.AD_10.award_hours, ad_data.AD_10.award_mins);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_10.loa_issuance_days, ad_data.AD_10.loa_issuance_hours, ad_data.AD_10.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_10.loa_acceptance_days, ad_data.AD_10.loa_acceptance_hours, ad_data.AD_10.loa_acceptance_mins);

    await dashboardCFP.otherDetails(ad_data.AD_10.index, ad_data.AD_10.Settlement_Price);

    await dashboardCFP.commentBox(ad_data.AD_10.query_Box);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_10.Ceiling_Base_Return, ad_data.AD_10.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(ad_data.AD_10.multiple_responder, data.responder);

    await dashboardCFP.custom_Guests(ad_data.AD_10.custom_Guests);

    await dashboardCFP.remarks(ad_data.AD_10.remarks);

});



Then('Verify the user unable to publish Call for Proposal as per admin case ten', async function () {

    await dashboardCFP.publish();

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as initiator as per admin case ten', async function () {

    //Old User as a Inititator
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(data.user2, data.user2_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per admin case ten', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_10.chooseCFP);

    await dashboardCFP.powerSwapping(ad_data.AD_10.Power_swapping);

    await dashboardCFP.firstChoice(ad_data.AD_10.Fisrt_choice);

    await dashboardCFP.resultPublish(ad_data.AD_10.Result_Published);

    await dashboardCFP.importPeriod(ad_data.AD_10.Quantum_value, ad_data.AD_10.imp_start_date, ad_data.AD_10.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time);

    await dashboardCFP.minimumQuantum(ad_data.AD_10.Minimum_Quantum, ad_data.AD_10.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(ad_data.AD_10.exp_start_date, ad_data.AD_10.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_10.response_days, ad_data.AD_10.response_hours, ad_data.AD_10.response_mins);

    await dashboardCFP.awarding_time(ad_data.AD_10.award_days, ad_data.AD_10.award_hours, ad_data.AD_10.award_mins);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_10.loa_issuance_days, ad_data.AD_10.loa_issuance_hours, ad_data.AD_10.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_10.loa_acceptance_days, ad_data.AD_10.loa_acceptance_hours, ad_data.AD_10.loa_acceptance_mins);

    await dashboardCFP.otherDetails(ad_data.AD_10.index, ad_data.AD_10.Settlement_Price);

    await dashboardCFP.commentBox(ad_data.AD_10.query_Box);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_10.Ceiling_Base_Return, ad_data.AD_10.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(ad_data.AD_10.multiple_responder, org_name);

    await dashboardCFP.custom_Guests(ad_data.AD_10.custom_Guests);

    await dashboardCFP.remarks(ad_data.AD_10.remarks);

});
Then('Call for Proposal CFP should be Published successfully as per admin case ten', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + cfpNumber);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------

Given('New User navigate to the Application and logged in as a discom user as Responder as per admin case ten', async function () {

    //New user as a Responder
    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(email_id, password);


});

Given('New User started placing Response to the CFP as per admin case ten', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});

Then('New User Response CFP should be Placed successfully as per admin case ten', async function () {

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_10.minQuantumValue1, ad_data.AD_10.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue1);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 6
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as Responder two as per admin case ten', async function () {

    // login = new Login(pageFixture.page);
    await login.login(data.user3, data.user3_password);

});



Given('Responder two started placing Response to the CFP as per admin case ten', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    // await pageFixture.page.waitForTimeout(90 * 1000);

});



Then('Responder two Response CFP should be Placed successfully as per admin case ten', async function () {

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_10.minQuantumValue2, ad_data.AD_10.ReturnValue2);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.minQuantumValue2);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue2);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 7
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as Responder three as per admin case ten', async function () {

    // login = new Login(pageFixture.page);
    await login.login(data.user4, data.user4_password);

});



Given('Responder three started placing Response to the CFP as per admin case ten', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    // await pageFixture.page.waitForTimeout(90 * 1000);

});



Then('Responder three Response CFP should be Placed successfully as per admin case ten', async function () {

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_10.minQuantumValue3, ad_data.AD_10.ReturnValue3);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.minQuantumValue3);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue3);

});
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 8
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating the award and generating the LOA from initiator side as per admin case ten', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started.........");

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

});

Then('User Awarding and Generate LOA should be successfull as per admin case ten', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.minQuantumValue1, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue1, ad_data.AD_10.Settlement_Price, ad_data.AD_10.loa_issuance_mins);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 9
//-------------------------------------------------------------------------------------------------------------------------


Then('New User Responder Uploading the documents should be successfull as per admin case ten', async function () {

    await loaManagement.loaGeneration();

    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_10.exp_start_time, ad_data.AD_10.exp_end_time, ad_data.AD_10.ReturnValue1, ad_data.AD_10.Settlement_Price, ad_data.AD_10.loa_acceptance_mins);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 10
//-------------------------------------------------------------------------------------------------------------------------
Then('User Format D should be successfully Generated from initiator side as per admin case ten', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

    await loaManagement.formatD(ad_data.AD_10.GTAM, ad_data.AD_10.source_of_generation, ad_data.AD_10.RPO, ad_data.AD_10.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.Quantum_value);

});
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 11
//-------------------------------------------------------------------------------------------------------------------------

Then('New User Format D should be successfully Generated from Responder side as per admin case ten', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action_FormatD(cfpNumber);

    await loaManagement.formatD(ad_data.AD_10.GTAM, ad_data.AD_10.source_of_generation, ad_data.AD_10.RPO, ad_data.AD_10.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_10.imp_start_time, ad_data.AD_10.imp_end_time, ad_data.AD_10.Quantum_value);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 12
//-------------------------------------------------------------------------------------------------------------------------

Given('New user navigates to the application and logs in as an admin as per Admin Case ten', async function () {

    await login.login(email_id, password);  //Sign Up 

    await manage_User.click_Manage_User(); //click Manage User

});



