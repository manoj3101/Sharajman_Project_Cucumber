const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const  SignUp = require('../../../pages/Admin/SignUp');
const  Registration = require('../../../pages/Admin/Registration');
const  Manage_Member = require('../../../pages/Admin/Manage_Member');
const  Member_Assistance = require('../../../pages/Admin/Member_Assistance')
const  Payment_Approval = require('../../../pages/Admin/Payment_Approval');
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
const signUp= new SignUp(pageFixture.page);
const registration= new Registration(pageFixture.page);
const manage_Member= new Manage_Member(pageFixture.page);
const member_Assistance= new Member_Assistance(pageFixture.page);
const payment_Approval= new Payment_Approval(pageFixture.page);

const login = new Login(pageFixture.page);
const home = new Home(pageFixture.page);
const dashboardCFP = new DashboardCFP(pageFixture.page);
const loaManagement = new LOAManagement(pageFixture.page);



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the application and signUp', async function () {


});

Then('Providing details', async function () {

});

Then('Done', async function () {

});