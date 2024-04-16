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
exports.home = home;
const dashboardCFP = new DashboardCFP(pageFixture.page);
exports.dashboardCFP = dashboardCFP;
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
exports.cfpNumber = cfpNumber;
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('New user navigates to the application and initiates the sign-up process as per Admin case six', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_AD_006                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    await signUp.signup(); //Sign Up
});

Then('New user logs into the application again and changes the password as per Admin case six', async function () {

    await signUp.login_Again("oldpassword"); //Login Again after SignUp
    await signUp.changePasswordAndTFA(); //Change Password & Two Factor Autentication
    console.log(`Name : ${name}`);
    console.log(`Email ID : ${email_id}\n`);
    await signUp.login_Again("newpassword"); //Login Again after Change Password
    await signUp.OTP(); //Fill OTP
    await signUp.inactiveTFA();


});

Then('New user begins the registration process as per Admin case six', async function () {

    await signUp.login_Again("newpassword"); //Login Again after Change Password
    console.log(`Organization name : ${org_name}\n`);
    await registration.NOAR_Details(ad_data.AD_06.NOAR); //NOAR Details 
    await registration.basic_Details(org_name, ad_data.AD_06.natureofapplicant, ad_data.AD_06.gsttype); //Basic Details
    await registration.connection_Details(ad_data.AD_06.discomType, ad_data.AD_06.Max_Inj_Cap, ad_data.AD_06.Max_Draw_Cap); //Connection Details
    await registration.bank_Details(name); //Bank Details
    await registration.upload_Documents(); //Document Upload

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------

Given('Admin User navigates to the application and logs in as an admin as per Admin case six', async function () {
    await login.login(ad_data.admin, ad_data.admin_password); //Login as a admin 
    // await signUp.OTP(); //OTP Validation 

});

Then('Admin approves the new discom user and assigns a subscription plan as per Admin case six', async function () {

    await manage_Member.click_Manage_Member(); //Manage Member
    await manage_Member.approve_Member(org_name, ad_data.AD_06.Manage_member);  //Member assitance
    await member_Assistance.clickMemberAssitance();
    await member_Assistance.subscription_Plan_Selection(org_name); //Subscription Plan Selection

});

Then('Admin approves the payment and assigns rights to the new user as per Admin case six', async function () {

    await payment_Approval.clickPaymentApproval(); //Payment Approval
    await payment_Approval.paymentApproval(org_name, ad_data.AD_06.Payment_approval);
    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(org_name, ad_data.AD_06.selectall, ad_data.AD_06.Home, ad_data.AD_06.Registration, ad_data.AD_06.Manage_User, ad_data.AD_06.FormatD, ad_data.AD_06.LOA_Generation, ad_data.AD_06.Award, ad_data.AD_06.Respond, ad_data.AD_06.Initiate);
});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------
Given('Admin navigate to the application and login and fetching the transaction fee formula as per admin case six', async function () {

    await login.login(data.admin, data.admin_password); //Login to the admin user 

    await transactionFee.click_Transaction_Fee(); //Click the transaction fee 

    await transactionFee.fetch_Transaction_Fee(data.feeName, ad_data.AD_06.Quantum_value); // Fetch the transaction fee formula

    await transactionFee.fetch_Success_Fee(data.successfee, ad_data.AD_06.Quantum_value); // Fetch the Success fee formula

    await login.logout(); //Logout

});

Given('New User navigate to the Application and logged in as a discom user as initiator as per admin case six', async function () {

    //New user as a Initiator
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(email_id, password);

});

Given('New User started creating Call for Proposal CFP as an initiator as per admin case six', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_06.chooseCFP);

    await dashboardCFP.powerSwapping(ad_data.AD_06.Power_swapping);

    await dashboardCFP.firstChoice(ad_data.AD_06.Fisrt_choice);

    await dashboardCFP.resultPublish(ad_data.AD_06.Result_Published);

    await dashboardCFP.importPeriod(ad_data.AD_06.Quantum_value, ad_data.AD_06.imp_start_date, ad_data.AD_06.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time);

    await dashboardCFP.minimumQuantum(ad_data.AD_06.Minimum_Quantum, ad_data.AD_06.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(ad_data.AD_06.exp_start_date, ad_data.AD_06.exp_end_date, ad_data.AD_06.exp_start_time, ad_data.AD_06.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_06.response_days, ad_data.AD_06.response_hours, ad_data.AD_06.response_mins);

    await dashboardCFP.awarding_time(ad_data.AD_06.award_days, ad_data.AD_06.award_hours, ad_data.AD_06.award_mins);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_06.loa_issuance_days, ad_data.AD_06.loa_issuance_hours, ad_data.AD_06.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_06.loa_acceptance_days, ad_data.AD_06.loa_acceptance_hours, ad_data.AD_06.loa_acceptance_mins);

    await dashboardCFP.otherDetails(ad_data.AD_06.index, ad_data.AD_06.Settlement_Price);

    await dashboardCFP.commentBox(ad_data.AD_06.query_Box);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_06.Ceiling_Base_Return, ad_data.AD_06.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(ad_data.AD_06.multiple_responder, data.responder);

    await dashboardCFP.custom_Guests(ad_data.AD_06.custom_Guests);

    await dashboardCFP.remarks(ad_data.AD_06.remarks);

});

Then('Call for Proposal CFP should be Published successfully as per admin case six', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as Responder as per admin case six', async function () {

    //Old User as a Responder
    // login = new Login(pageFixture.page);
    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per admin case six', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('Response CFP should be Placed successfully as per admin case six', async function () {

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_06.minQuantumValue1, ad_data.AD_06.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_06.exp_start_time, ad_data.AD_06.exp_end_time, ad_data.AD_06.ReturnValue1);

});

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

Then('Awarding and Generate LOA should be successfull as per admin case six', async function () {

    //CFP carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_06.exp_start_time, ad_data.AD_06.exp_end_time, ad_data.AD_06.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.minQuantumValue1, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_06.exp_start_time, ad_data.AD_06.exp_end_time, ad_data.AD_06.ReturnValue1, ad_data.AD_06.Settlement_Price, ad_data.AD_06.loa_issuance_mins);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 6
//-------------------------------------------------------------------------------------------------------------------------

Then('Responder Uploading the documents should be successfull as per admin case six', async function () {

    await loaManagement.loaGeneration();

    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_06.exp_start_time, ad_data.AD_06.exp_end_time, ad_data.AD_06.ReturnValue1, ad_data.AD_06.Settlement_Price, ad_data.AD_06.loa_acceptance_mins);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 7
//-------------------------------------------------------------------------------------------------------------------------

Then('Format D should be successfully Generated from initiator side as per admin case six', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

    await loaManagement.formatD(ad_data.AD_06.GTAM, ad_data.AD_06.source_of_generation, ad_data.AD_06.RPO, ad_data.AD_06.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.Quantum_value);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 8
//-------------------------------------------------------------------------------------------------------------------------

Then('Format D should be successfully Generated from Responder side as per admin case six', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action_FormatD(cfpNumber);

    await loaManagement.formatD(ad_data.AD_06.GTAM, ad_data.AD_06.source_of_generation, ad_data.AD_06.RPO, ad_data.AD_06.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_06.imp_start_time, ad_data.AD_06.imp_end_time, ad_data.AD_06.Quantum_value);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 9
//-------------------------------------------------------------------------------------------------------------------------

Given('New user navigates to the application and logs in as an admin as per Admin Case six', async function () {

    await login.login(email_id, password);  //Sign Up 

    await manage_User.click_Manage_User(); // Click Manage User

});


Given('New user adds a staff user and assigns rights to the new user as per Admin Case six', { timeout: 120 * 1000 }, async function () {

    await manage_User.add_User(ad_data.AD_06.department, ad_data.AD_06.designation, ad_data.AD_06.sub_type);

    console.log(`Add User Name : ${ADDUSER_NAME}`);

    await manage_User.add_user_rights(ADDUSER_NAME, ad_data.AD_06.selectall, ad_data.AD_06.Home, ad_data.AD_06.Manage_User, ad_data.AD_06.FormatD, ad_data.AD_06.LOA_Generation, ad_data.AD_06.Award, ad_data.AD_06.Respond, ad_data.AD_06.LOA_Management)

    await login.logout(); //Logout

    console.log(`Add User Email : ${ADDUSER_EMAILID}`);

    await manage_User.email_Verify_Password(ADDUSER_EMAILID, ad_data.static_password);  //Verify the password 

    await login.changePasswordAndTFA(ad_data.static_password, password); //Change Password & Two Factor Autentication

});


Then('Assigned new user successfully logs in as a staff member of the new member as per Admin Case six', async function () {

    await login.re_login(ADDUSER_EMAILID, password); //Assigned new user Re-Logged with change password

    await signUp.OTP(); //Fill OTP

    await pageFixture.page.waitForTimeout(10000);

    console.log("--------------------Assigned new user successfully logged In -----------------");

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 10
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as initiator as per admin case six', async function () {

    //Old User as a Inititator
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(data.user2, data.user2_password);

});

Given('New User verifying the registration status as per admin case six', async function () {

    //New user verifying  the registration status
    await home.clickRegistration();

    await home.checkRegistration();

    await home.clickHome();
});

Given('User started creating Call for Proposal CFP as an initiator as per admin case six', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_06.chooseCFP1);

    await dashboardCFP.powerSwapping(ad_data.AD_06.Power_swapping1);

    await dashboardCFP.firstChoice(ad_data.AD_06.Fisrt_choice1);

    await dashboardCFP.resultPublish(ad_data.AD_06.Result_Published1);

    await dashboardCFP.importPeriod(ad_data.AD_06.Quantum_value1, ad_data.AD_06.imp_start_date1, ad_data.AD_06.imp_end_date1, ad_data.AD_06.imp_start_time1, ad_data.AD_06.imp_end_time1);

    await dashboardCFP.minimumQuantum(ad_data.AD_06.Minimum_Quantum1, ad_data.AD_06.Minimum_QuantumValue1);

    await dashboardCFP.exportPeriod(ad_data.AD_06.exp_start_date1, ad_data.AD_06.exp_end_date1, ad_data.AD_06.exp_start_time1, ad_data.AD_06.exp_end_time1);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_06.response_days1, ad_data.AD_06.response_hours1, ad_data.AD_06.response_mins1);

    await dashboardCFP.awarding_time(ad_data.AD_06.award_days1, ad_data.AD_06.award_hours1, ad_data.AD_06.award_mins1);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_06.loa_issuance_days1, ad_data.AD_06.loa_issuance_hours1, ad_data.AD_06.loa_issuance_mins1);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_06.loa_acceptance_days1, ad_data.AD_06.loa_acceptance_hours1, ad_data.AD_06.loa_acceptance_mins1);

    await dashboardCFP.otherDetails(ad_data.AD_06.index1, ad_data.AD_06.Settlement_Price1);

    await dashboardCFP.commentBox(ad_data.AD_06.query_Box1);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_06.Ceiling_Base_Return1, ad_data.AD_06.Ceiling_Base_Return_value1);

    await dashboardCFP.selectResponder(ad_data.AD_06.multiple_responder1, org_name);

    await dashboardCFP.custom_Guests(ad_data.AD_06.custom_Guests1);

    await dashboardCFP.remarks(ad_data.AD_06.remarks1);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 11
//-------------------------------------------------------------------------------------------------------------------------

Given('New User navigate to the Application and logged in as a discom user as Responder as per admin case six', async function () {

    //New user as a Responder
    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(email_id, password);


});

Given('New User can not Response CFP successfully as per admin case six', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_06.minQuantumValue11, ad_data.AD_06.ReturnValue11);
});



