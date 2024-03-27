const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');
const RandomFunction = require('../../helper/utils/RandomFunction');

//Object Instance
const randomFunction = new RandomFunction();
//Get Current Date
const now = new Date();
const dateString = `${now.getDate().toString().padStart(2, '0')}`;
const timeString = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;



class Manage_User {

    // Constructor
    // constructor(page){
    //     this.page =page;
    // }



    //variables
    addUser_Name = randomFunction.generateRandomLastName(); //First Name 
    addUser_Phone_no = randomFunction.generateRandomMobileNumber(); //Mobile number 
    addUser_Email_id = `${this.addUser_Name}_${dateString}${timeString}@yopmail.com`;  //Email ID 


    async click_Manage_User() {
        //Hover to the Manage Member and click the Manage Member
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
        await home.hover();
        await pageFixture.page.locator("//span[contains(text(),'Manage User')]").click();
    }
    //Adding new user

    async add_User(department, designation, sub_type) {
        //Click the add user  Button
        await pageFixture.page.getByRole('button', { name: /Add User/i }).click();

        await pageFixture.page.locator("//input[@formcontrolname='name']").fill(this.addUser_Name); //name

        await pageFixture.page.locator("//input[@formcontrolname='email']").fill(this.addUser_Email_id); //Fill email

        await pageFixture.page.locator("//input[@formcontrolname='department']").fill(department); //Department

        await pageFixture.page.locator("//input[@formcontrolname='designation']").fill(designation); //Designation

        await pageFixture.page.locator("//input[@formcontrolname='mobileno']").fill(this.addUser_Phone_no); //Mobile Number


        //select option    //  Initiator  |  Bidder  | Staff 
        await pageFixture.page.locator("//select[@formcontrolname='sub_user_type']").selectOption({ label: sub_type });//User sub type

        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

    }


     //Member Rights
     async add_user_rights(user_name,selectAll, home, registration, manage_User, format_D, lOA_Generation, award, respond, lOA_Management,) {

        await pageFixture.page.waitForTimeout(3000);
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search Staff List').fill(user_name);

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        await pageFixture.page.waitForTimeout(3000);
        //Click the Rights Action 
        await pageFixture.page.locator("//a[contains(text(),'Rights')]").click();
        await pageFixture.page.waitForTimeout(3000);


        // expect(page.getByLabel('Subscribe to newsletter')).toBeChecked();

        //Rights
        const SelectAll = await pageFixture.page.locator("//input[@id='writechbk']");
        //select All
        const check_Home = await pageFixture.page.locator("(//input[@id='write'])[1]");
        const check_Registration = await pageFixture.page.locator("(//input[@id='write'])[2]");
        const check_Manage_User = await pageFixture.page.locator("(//input[@id='write'])[3]");
        const check_LOA_Management = await pageFixture.page.locator("(//input[@id='write'])[5]");
        const check_Format_D = await pageFixture.page.locator("(//input[@id='write'])[6]");
        const check_LOA_Generation = await pageFixture.page.locator("(//input[@id='write'])[7]");
        const check_Award = await pageFixture.page.locator("(//input[@id='write'])[8]");
        const check_Initiate = await pageFixture.page.locator("(//input[@id='write'])[9]");
        const check_Respond = await pageFixture.page.locator("(//input[@id='write'])[10]");

        if (selectAll) {
            await SelectAll.check();
        }
        else {
            //Home
            if (home) {
                await check_Home.check();
            } else {
                await check_Home.uncheck();
            }
            //Registration
            if (registration) {
                await check_Registration.check();
            } else {
                await check_Registration.uncheck();
            }
            //Manage User
            if (manage_User) {
                await check_Manage_User.check();
            } else {
                await check_Manage_User.uncheck();
            }
            //Format D
            if (format_D) {
                await check_Format_D.check();
            } else {
                await check_Format_D.uncheck();
            }
            //LOA Generation 
            if (lOA_Generation) {
                await check_LOA_Generation.check();
            } else {
                await check_LOA_Generation.uncheck();
            }
            //Award
            if (award) {
                await check_Award.check();
            } else {
                await check_Award.uncheck();
            }
            //Respond
            if (respond) {
                await check_Respond.check();
            } else {
                await check_Respond.uncheck();
            }
            //LOA Management 
            if (lOA_Management) {
                await check_LOA_Management.check();
            } else {
                await check_LOA_Management.uncheck();
            }
        }


        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

    }


    async email_Verify_Password(email, password) {
        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });


    }

}
module.exports = Manage_User;