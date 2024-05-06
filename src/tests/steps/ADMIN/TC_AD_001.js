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
let fName = signUp.f_name;
let lName = signUp.l_name;
let fullName = signUp.Name;
let email_id = signUp.email_id;
let org_name = signUp.org_name;
let newPassword = signUp.new_pass;
let phoneNumber = signUp.phone_no;
let accountNumber = registration.AccountNumber;



let fName1 = signUp.f_name1;
let lName1 = signUp.l_name1;
let fullName1 = signUp.Name1;
let email_id1 = signUp.email_id1;
let org_name1 = signUp.org_name1;
let newPassword1 = signUp.new_pass1;
let phoneNumber1 = signUp.phone_no1;
let accountNumber1 = registration.AccountNumber1;

let ADDUSER_NAME = manage_User.addUser_Name;
let ADDUSER_EMAILID = manage_User.addUser_Email_id;
let cfpNumber;
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('New Initiator user navigates to the application and initiates the sign-up process as per Admin case one', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_AD_001                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    await signUp.signup(fName, lName, fullName, email_id, phoneNumber, org_name); //Sign Up
});

Then('New Initiator user logs into the application again and changes the password as per Admin case one', async function () {

    await signUp.login_Again(email_id, "oldpassword", newPassword); //Login Again after SignUp
    await signUp.changePasswordAndTFA(newPassword); //Change Password & Two Factor Autentication
    console.log(`Name : ${fullName}`);
    console.log(`Email ID : ${email_id}\n`);
    await signUp.login_Again(email_id, "newpassword", newPassword); //Login Again after Change Password
    await signUp.OTP(); //Fill OTP
    await signUp.inactiveTFA();


});

Then('New Initiator user begins the registration process as per Admin case one', async function () {

    await signUp.login_Again(email_id, "newpassword", newPassword); //Login Again after Change Password
    console.log(`Organization name : ${org_name}\n`);
    await registration.NOAR_Details(ad_data.AD_01.NOAR); //NOAR Details 
    await registration.basic_Details(org_name, ad_data.AD_01.natureofapplicant, ad_data.AD_01.gsttype); //Basic Details
    await registration.connection_Details(ad_data.AD_01.discomType, ad_data.AD_01.Max_Inj_Cap, ad_data.AD_01.Max_Draw_Cap); //Connection Details
    await registration.bank_Details(fullName, accountNumber); //Bank Details
    await registration.upload_Documents(); //Document Upload

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------

Given('Admin User navigates to the application and logs in as an admin as per Admin case one', async function () {
    await login.login(ad_data.admin, ad_data.admin_password); //Login as a admin

});

Then('Admin approves the Initiator user and assigns a subscription plan as per Admin case one', async function () {

    await manage_Member.click_Manage_Member(); //Manage Member
    await manage_Member.approve_Member(org_name, ad_data.AD_01.Manage_member);  //Member assitance
    await member_Assistance.clickMemberAssitance();
    await member_Assistance.subscription_Plan_Selection(org_name); //Subscription Plan Selection

});

Then('Admin approves the payment and assigns rights to the Initiator as per Admin case one', async function () {

    await payment_Approval.clickPaymentApproval(); //Payment Approval
    await payment_Approval.paymentApproval(org_name, ad_data.AD_01.Payment_approval);
    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(org_name, ad_data.AD_01.selectall, ad_data.AD_01.Home, ad_data.AD_01.Registration, ad_data.AD_01.Manage_User, ad_data.AD_01.FormatD, ad_data.AD_01.LOA_Generation, ad_data.AD_01.Award, ad_data.AD_01.Respond, ad_data.AD_01.Initiate);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('New Responder user navigates to the application and initiates the sign-up process as per Admin case one', async function () {

    await signUp.signup(fName1, lName1, fullName1, email_id1, phoneNumber1, org_name1); //Sign Up
});

Then('New Responder user logs into the application again and changes the password as per Admin case one', async function () {

    await signUp.login_Again(email_id1, "oldpassword", newPassword1); //Login Again after SignUp
    await signUp.changePasswordAndTFA(newPassword1); //Change Password & Two Factor Autentication
    console.log(`Name : ${fullName1}`);
    console.log(`Email ID : ${email_id1}\n`);
    await signUp.login_Again(email_id1, "newpassword", newPassword1); //Login Again after Change Password
    await signUp.OTP(); //Fill OTP
    await signUp.inactiveTFA();


});

Then('New Responder user begins the registration process as per Admin case one', async function () {

    await signUp.login_Again(email_id1, "newpassword", newPassword1); //Login Again after Change Password
    console.log(`Organization name : ${org_name1}\n`);
    await registration.NOAR_Details(ad_data.AD_01.NOAR); //NOAR Details 
    await registration.basic_Details(org_name1, ad_data.AD_01.natureofapplicant, ad_data.AD_01.gsttype); //Basic Details
    await registration.connection_Details(ad_data.AD_01.discomType, ad_data.AD_01.Max_Inj_Cap, ad_data.AD_01.Max_Draw_Cap); //Connection Details
    await registration.bank_Details(fullName1, accountNumber1); //Bank Details
    await registration.upload_Documents(); //Document Upload

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------


Then('Admin approves the Responder user and assigns a subscription plan as per Admin case one', async function () {

    await manage_Member.click_Manage_Member(); //Manage Member
    await manage_Member.approve_Member(org_name1, ad_data.AD_01.Manage_member);  //Member assitance
    await member_Assistance.clickMemberAssitance();
    await member_Assistance.subscription_Plan_Selection(org_name1); //Subscription Plan Selection

});

Then('Admin approves the payment and assigns rights to the Responder as per Admin case one', async function () {

    await payment_Approval.clickPaymentApproval(); //Payment Approval
    await payment_Approval.paymentApproval(org_name1, ad_data.AD_01.Payment_approval);
    await manage_Member.click_Manage_Member(); //Manage User - Rights
    await manage_Member.member_rights(org_name1, ad_data.AD_01.selectall, ad_data.AD_01.Home, ad_data.AD_01.Registration, ad_data.AD_01.Manage_User, ad_data.AD_01.FormatD, ad_data.AD_01.LOA_Generation, ad_data.AD_01.Award, ad_data.AD_01.Respond, ad_data.AD_01.Initiate);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------

Given('Initiator user navigates to the Application and logged in as per admin case one', async function () {

    // login = new Login(pageFixture.page);
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(email_id, newPassword);
    // await login.login("monkeydluffy@gmail.com", "Test@12345");

});

Given('Initiator started creating Call for Proposal CFP as per admin case one', async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(ad_data.AD_01.chooseCFP);

    await dashboardCFP.powerSwapping(ad_data.AD_01.Power_swapping);

    await dashboardCFP.firstChoice(ad_data.AD_01.Fisrt_choice);

    await dashboardCFP.resultPublish(ad_data.AD_01.Result_Published);

    await dashboardCFP.importPeriod(ad_data.AD_01.Quantum_value, ad_data.AD_01.imp_start_date, ad_data.AD_01.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time);

    await dashboardCFP.minimumQuantum(ad_data.AD_01.Minimum_Quantum, ad_data.AD_01.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(ad_data.AD_01.exp_start_date, ad_data.AD_01.exp_end_date, ad_data.AD_01.exp_start_time, ad_data.AD_01.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(ad_data.AD_01.response_days, ad_data.AD_01.response_hours, ad_data.AD_01.response_mins);

    await dashboardCFP.awarding_time(ad_data.AD_01.award_days, ad_data.AD_01.award_hours, ad_data.AD_01.award_mins);

    await dashboardCFP.loa_Issuance_time(ad_data.AD_01.loa_issuance_days, ad_data.AD_01.loa_issuance_hours, ad_data.AD_01.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(ad_data.AD_01.loa_acceptance_days, ad_data.AD_01.loa_acceptance_hours, ad_data.AD_01.loa_acceptance_mins);

    await dashboardCFP.otherDetails(ad_data.AD_01.index, ad_data.AD_01.Settlement_Price);

    await dashboardCFP.commentBox(ad_data.AD_01.query_Box);

    await dashboardCFP.ceilingBaseReturn(ad_data.AD_01.Ceiling_Base_Return, ad_data.AD_01.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(ad_data.AD_01.multiple_responder, org_name1);
    // await dashboardCFP.selectResponder(ad_data.AD_01.multiple_responder, "OnePiece");

    await dashboardCFP.remarks(ad_data.AD_01.remarks);

});

Then('Verify Call for Proposal CFP Published successfully as per admin case one', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + cfpNumber);
});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 6
//-------------------------------------------------------------------------------------------------------------------------



Given('Responder navigates to the Application and logged in as per admin case one', async function () {

    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(email_id1, newPassword1);
    // await login.login("saanji@gmail.com", "Test@12345");

});


Then('Verify Response CFP should be Placed successfully as per admin case one', { timeout: 140 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, ad_data.AD_01.minQuantumValue1, ad_data.AD_01.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_01.exp_start_time, ad_data.AD_01.exp_end_time, ad_data.AD_01.ReturnValue1);

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 7
//-------------------------------------------------------------------------------------------------------------------------

Given('Initiator started generating the award and generating the LOA as per admin case one', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started......");

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

});


Then('Verify Awarding and Generate LOA is successfull as per admin case one', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_01.exp_start_time, ad_data.AD_01.exp_end_time, ad_data.AD_01.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.minQuantumValue1, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_01.exp_start_time, ad_data.AD_01.exp_end_time, ad_data.AD_01.ReturnValue1, ad_data.AD_01.Settlement_Price, ad_data.AD_01.loa_issuance_mins);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

///-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 8
//-------------------------------------------------------------------------------------------------------------------------



Then('Verify Responder\'s Upload documents is successfull as per admin case one', async function () {

    await loaManagement.loaGeneration();

    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, ad_data.AD_01.exp_start_time, ad_data.AD_01.exp_end_time, ad_data.AD_01.ReturnValue1, ad_data.AD_01.Settlement_Price, ad_data.AD_01.loa_acceptance_mins);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 9
//-------------------------------------------------------------------------------------------------------------------------

Then('Verify Format D is successfully Generated from initiator side as per admin case one', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

    await loaManagement.formatD(cfpNumber, ad_data.AD_01.GTAM, ad_data.AD_01.source_of_generation, ad_data.AD_01.RPO, ad_data.AD_01.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.Quantum_value);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 10
//-------------------------------------------------------------------------------------------------------------------------

Then('Verify Format D is successfully Generated from Responder side as per admin case one', async function () {

    //cfp carried from initial Step definition
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action_FormatD(cfpNumber);

    await loaManagement.formatD(cfpNumber, ad_data.AD_01.GTAM, ad_data.AD_01.source_of_generation, ad_data.AD_01.RPO, ad_data.AD_01.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, ad_data.AD_01.imp_start_time, ad_data.AD_01.imp_end_time, ad_data.AD_01.Quantum_value);

});




//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 11
//-------------------------------------------------------------------------------------------------------------------------

Given('Initator navigates to the application and logs in as an admin as per Admin Case One', async function () {

    await login.login(email_id, newPassword);  //Sign Up 

    await manage_User.click_Manage_User(); //click Manage User

});


Given('Initator adds a staff user and assigns rights to the new user as per Admin Case One', { timeout: 120 * 1000 }, async function () {

    await manage_User.add_User(ad_data.AD_01.department, ad_data.AD_01.designation, ad_data.AD_01.sub_type);

    console.log(`Add User Name : ${ADDUSER_NAME}`);

    await manage_User.add_user_rights(ADDUSER_NAME, ad_data.AD_01.selectall, ad_data.AD_01.Home, ad_data.AD_01.Manage_User, ad_data.AD_01.FormatD, ad_data.AD_01.LOA_Generation, ad_data.AD_01.Award, ad_data.AD_01.Respond, ad_data.AD_01.LOA_Management)

    await login.logout(); //Logout

    console.log(`Add User Email : ${ADDUSER_EMAILID}`);

    await manage_User.email_Verify_Password(ADDUSER_EMAILID, ad_data.static_password);  //Verify the password 

    await login.changePasswordAndTFA(ad_data.static_password, newPassword); //Change Password & Two Factor Autentication

});


Then('Verify assigned new user successfully logs in as a staff member of the new member as per Admin Case One', async function () {

    await login.re_login(ADDUSER_EMAILID, newPassword); //Assigned new user Re-Logged with change password

    await signUp.OTP(); //Fill OTP

    await pageFixture.page.waitForTimeout(10000);

    console.log("--------------------Assigned new user successfully logged In -----------------");

});
