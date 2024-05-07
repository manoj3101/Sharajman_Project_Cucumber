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

Given('Admin User navigates to the application and logs in as an admin as per Admin case two', async function () {

    await login.login(ad_data.admin, ad_data.admin_password); //Login as a admin 
    // await signUp.OTP(); //OTP Validation 

});

Then('Admin user changing the rights for Initiator as per Admin case two', async function () {
    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(ad_data.orgName1, ad_data.AD_02.selectall_int, ad_data.AD_02.Home_int, ad_data.AD_02.Registration_int, ad_data.AD_02.Manage_User_int, ad_data.AD_02.FormatD_int, ad_data.AD_02.LOA_Generation_int, ad_data.AD_02.Award_int, ad_data.AD_02.Respond_int, ad_data.AD_02.Initiate_int, ad_data.AD_02.unSelectall);

});

Then('Admin user changing the rights for Responder as per Admin case two', async function () {

    // await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(ad_data.orgName2, ad_data.AD_02.selectall_res, ad_data.AD_02.Home_res, ad_data.AD_02.Registration_res, ad_data.AD_02.Manage_User_res, ad_data.AD_02.FormatD_res, ad_data.AD_02.LOA_Generation_res, ad_data.AD_02.Award_res, ad_data.AD_02.Respond_res, ad_data.AD_02.Initiate_res, ad_data.AD_02.unSelectall);
});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------

Given('Initiator navigate to the Application and logged in as a discom user as per admin case two', async function () {

    //New user as a Initiator
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(ad_data.user1, ad_data.user1_password);

});

Given('Verify whether the Registration tab is present and Manage User tab is not in the application as per admin case two', async function () {

    await home.clickRegistration();
    await home.checkRegistration();
    await home.clickHome();
    await manage_User.click_Manage_User();
    

});

Given('Initiator started creating Call for Proposal CFP as an initiator as per admin case two', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_02.chooseCFP);

    await dashboardCFP.powerSwapping(ad_data.AD_02.Power_swapping);

    await dashboardCFP.firstChoice(ad_data.AD_02.Fisrt_choice);

    await dashboardCFP.resultPublish(ad_data.AD_02.Result_Published);

    await dashboardCFP.importPeriod(ad_data.AD_02.Quantum_value, ad_data.AD_02.imp_start_date, ad_data.AD_02.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time);

    await dashboardCFP.minimumQuantum(ad_data.AD_02.Minimum_Quantum, ad_data.AD_02.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(ad_data.AD_02.exp_start_date, ad_data.AD_02.exp_end_date, ad_data.AD_02.exp_start_time, ad_data.AD_02.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_02.response_days, ad_data.AD_02.response_hours, ad_data.AD_02.response_mins);

    await dashboardCFP.awarding_time(ad_data.AD_02.award_days, ad_data.AD_02.award_hours, ad_data.AD_02.award_mins);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_02.loa_issuance_days, ad_data.AD_02.loa_issuance_hours, ad_data.AD_02.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_02.loa_acceptance_days, ad_data.AD_02.loa_acceptance_hours, ad_data.AD_02.loa_acceptance_mins);

    await dashboardCFP.otherDetails(ad_data.AD_02.index, ad_data.AD_02.Settlement_Price);

    await dashboardCFP.commentBox(ad_data.AD_02.query_Box);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_02.Ceiling_Base_Return, ad_data.AD_02.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(ad_data.AD_02.multiple_responder, ad_data.orgName2);

    await dashboardCFP.custom_Guests(ad_data.AD_02.custom_Guests);

    await dashboardCFP.remarks(ad_data.AD_02.remarks);

});

Then('Verify whether the Call for Proposal CFP is Published successfully as per admin case two', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('Responder navigate to the Application and logged in as a discom user as per admin case two', async function () {

    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(ad_data.user2, ad_data.user2_password);

});


Then('Verify whether Response CFP is Placed successfully as per admin case two', { timeout: 140 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_02.minQuantumValue1, ad_data.AD_02.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_02.exp_start_time, ad_data.AD_02.exp_end_time, ad_data.AD_02.ReturnValue1);

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------

Given('Verify whether the user is unable to Award the CFP as per admin case two', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

   

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.unableToGenerateAward();

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------

Given('Admin user giving award Rights for Initiator as per Admin case two', async function () {

    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.award_Check(ad_data.orgName1, ad_data.AD_02.Award_int1);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 6
//-------------------------------------------------------------------------------------------------------------------------

Then('Verify whether the user is able to Award and Generate LOA after admin gave the rights to the initiator as per admin case two', async function () {

    await home.clickCallForPropsal();

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_02.exp_start_time, ad_data.AD_02.exp_end_time, ad_data.AD_02.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.minQuantumValue1, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_02.exp_start_time, ad_data.AD_02.exp_end_time, ad_data.AD_02.ReturnValue1, ad_data.AD_02.Settlement_Price, ad_data.AD_02.loa_issuance_mins);

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 7
//-------------------------------------------------------------------------------------------------------------------------
Then('Verify whether the LOA Generation and Registration tab is not in the application as per admin case two', async function () {

    await loaManagement.loaGeneration();
    await home.clickRegistration();

});

///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 8
//-------------------------------------------------------------------------------------------------------------------------
Given('Admin user giving LOA and Registration Rights for Responder and manage user rights for Initiator as per Admin case two', async function () {

    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.loaGeneration_Check(ad_data.orgName2, ad_data.AD_02.LOA_Generation_res1);
    await manage_Member.registration_Check(ad_data.orgName2, ad_data.AD_02.Registration_res1);
    await manage_Member.manageUser_Check(ad_data.orgName1, ad_data.AD_02.Manage_User_int1);

});
///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 9
//-------------------------------------------------------------------------------------------------------------------------



Then('Verify whether the Responder have Uploaded the document successfull as per admin case two', async function () {

    await loaManagement.loaGeneration();

    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_02.exp_start_time, ad_data.AD_02.exp_end_time, ad_data.AD_02.ReturnValue1, ad_data.AD_02.Settlement_Price, ad_data.AD_02.loa_acceptance_mins);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 10
//-------------------------------------------------------------------------------------------------------------------------

Then('Format D should be successfully Generated from initiator side as per admin case two', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

    await loaManagement.formatD(ad_data.AD_02.GTAM, ad_data.AD_02.source_of_generation, ad_data.AD_02.RPO, ad_data.AD_02.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.Quantum_value);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 11
//-------------------------------------------------------------------------------------------------------------------------

Then('Format D should be successfully Generated from Responder side as per admin case two', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action_FormatD(cfpNumber);

    await loaManagement.formatD(ad_data.AD_02.GTAM, ad_data.AD_02.source_of_generation, ad_data.AD_02.RPO, ad_data.AD_02.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_02.imp_start_time, ad_data.AD_02.imp_end_time, ad_data.AD_02.Quantum_value);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 12
//-------------------------------------------------------------------------------------------------------------------------

Given('New user navigates to the application and logs in as an admin as per Admin Case two', async function () {

    await login.login(ad_data.user1, ad_data.user1_password);  //Sign Up 

    await manage_User.click_Manage_User(); //click Manage User

});


Given('New user adds a staff user and assigns rights to the new user as per Admin Case two', { timeout: 130 * 1000 }, async function () {

    await manage_User.add_User(ad_data.AD_02.department, ad_data.AD_02.designation, ad_data.AD_02.sub_type);

    console.log(`Add User Name : ${ADDUSER_NAME}`);

    await manage_User.add_user_rights(ADDUSER_NAME, ad_data.AD_02.selectall, ad_data.AD_02.Home_int, ad_data.AD_02.Registration_int, ad_data.AD_02.Manage_User_int, ad_data.AD_02.FormatD_int, ad_data.AD_02.LOA_Generation_int, ad_data.AD_02.Award_int, ad_data.AD_02.Respond_int, ad_data.AD_02.Initiate_int)

    await login.logout(); //Logout

    console.log(`Add User Email : ${ADDUSER_EMAILID}`);

    await manage_User.email_Verify_Password(ADDUSER_EMAILID, ad_data.static_password);  //Verify the password 

    await login.changePasswordAndTFA(ad_data.static_password, password); //Change Password & Two Factor Autentication

});


Then('Assigned new user successfully logs in as a staff member of the new member as per Admin Case two', async function () {

    await login.re_login(ADDUSER_EMAILID, password); //Assigned new user Re-Logged with change password

    await signUp.OTP(); //Fill OTP

    await pageFixture.page.waitForTimeout(10000);

    console.log("--------------------Assigned new user successfully logged In -----------------");

});
