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
        await home.hover({ timeout: 40000 });
        // Locate the Registration element
        const manageUserElement = await pageFixture.page.locator("//span[contains(text(),'Manage User')]");
        // Check if the element is present
        const isElementPresent = await manageUserElement.isVisible();
        if (isElementPresent) {
            // If element is present, click on it
            await manageUserElement.click();
        } else {
            // If element is not present, perform an assertion
            expect(isElementPresent).toBeFalsy();
            await pageFixture.page.locator("(//img[@id='userprofile1'])[1]").click();
            console.log("Manage User is Unchecked");
            // Alternatively, you can log a message
            await pageFixture.page.waitForTimeout(3000)
        }
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
    async add_user_rights(user_name, selectAll, home, registration, manage_User, format_D, lOA_Generation, award, respond, initiate) {

        await pageFixture.page.waitForTimeout(3000);
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search Staff List').fill(user_name);

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        await pageFixture.page.waitForTimeout(4000);
        //Click the Rights Action 
        await pageFixture.page.locator("//a[contains(text(),'Rights')]").first().click();
        await pageFixture.page.waitForTimeout(3000);


        // expect(page.getByLabel('Subscribe to newsletter')).toBeChecked();

        //Rights
        const SelectAll = await pageFixture.page.locator("//input[@id='writechbk']");
        //select All
        const check_Home = await pageFixture.page.locator("(//input[@id='write'])[1]");
        const check_Registration = await pageFixture.page.locator("(//input[@id='write'])[2]");
        const check_Manage_User = await pageFixture.page.locator("(//input[@id='write'])[3]");
        const check_Format_D = await pageFixture.page.locator("(//input[@id='write'])[6]");
        const check_LOA_Generation = await pageFixture.page.locator("(//input[@id='write'])[7]");
        const check_Award = await pageFixture.page.locator("(//input[@id='write'])[8]");
        const check_Initiate = await pageFixture.page.locator("(//input[@id='write'])[9]");
        const check_Respond = await pageFixture.page.locator("(//input[@id='write'])[10]");

        if (selectAll) {
            await SelectAll.check();
            expect(SelectAll).toBeChecked();
        }
        else {
            if (home) {
                await check_Home.check();
                expect(check_Home).toBeChecked(); //assert
            } else {
                await check_Home.uncheck();
                expect(check_Home).not.toBeChecked(); //assert
            }
            //Registration
            if (registration) {
                await check_Registration.check();
                expect(check_Registration).toBeChecked(); //assert
            } else {
                await check_Registration.uncheck();
                expect(check_Registration).not.toBeChecked(); //assert
            }
            //Manage User
            if (manage_User) {
                await check_Manage_User.check();
                expect(check_Manage_User).toBeChecked(); //assert
            } else {
                await check_Manage_User.uncheck();
                expect(check_Manage_User).not.toBeChecked(); //assert
            }
            //Format D
            if (format_D) {
                await check_Format_D.check();
                expect(check_Format_D).toBeChecked(); //assert
            } else {
                await check_Format_D.uncheck();
                expect(check_Format_D).not.toBeChecked(); //assert
            }
            //LOA Generation 
            if (lOA_Generation) {
                await check_LOA_Generation.check();
                expect(check_LOA_Generation).toBeChecked(); //assert
            } else {
                await check_LOA_Generation.uncheck();
                expect(check_LOA_Generation).not.toBeChecked(); //assert
            }
            //Award
            if (award) {
                await check_Award.check();
                expect(check_Award).toBeChecked(); //assert
            } else {
                await check_Award.uncheck();
                expect(check_Award).not.toBeChecked(); //assert
            }
            //Respond
            if (respond) {
                await check_Respond.check();
                expect(check_Respond).toBeChecked(); //assert
            } else {
                await check_Respond.uncheck();
                expect(check_Respond).not.toBeChecked(); //assert
            }
            if (initiate) {
                await check_Initiate.check();
                expect(check_Initiate).toBeChecked(); //assert
            } else {
                await check_Initiate.uncheck();
                expect(check_Initiate).not.toBeChecked(); //assert
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