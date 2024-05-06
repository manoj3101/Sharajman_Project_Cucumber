const RandomFunction = require("../../helper/utils/RandomFunction");
const { test, expect } = require('@playwright/test');
const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");
const Wrapper = require('../../helper/wrapper/assert');

//Object Instance
const randomFunction = new RandomFunction();
const assert = new Wrapper();
const [organizationName1, organizationName2] =  randomFunction.generateRandomOrganizationName();
 


//Get Current Date
const now = new Date();
let dateString = `${now.getDate().toString().padStart(2, '0')}`;
let timeString = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
let dateString1 = `${now.getDate().toString().padStart(2, '0')}`;
let timeString1 = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

class SignUp {


    //Variable
    f_name = randomFunction.generateRandomFirstName(); //First Name 
    l_name = randomFunction.generateRandomLastName(); //Last Name 

    f_name1 = randomFunction.generateRandomFirstName(); //First Name 
    l_name1 = randomFunction.generateRandomLastName(); //Last Name 

    Name = this.f_name + " " + this.l_name; // Combined Name 
    Name1 = this.f_name1 + " " + this.l_name1; // Combined Name 

    phone_no = randomFunction.generateRandomMobileNumber(); //Mobile number 
    phone_no1 = randomFunction.generateRandomMobileNumber();

    email_id = `${this.f_name}${this.l_name}_${dateString}${timeString}@yopmail.com`;
    email_id1 = `${this.f_name1}${this.l_name1}_${dateString1}${timeString1}@yopmail.com`;

    org_name = organizationName1;  //Organization Name
    org_name1 = organizationName2;  //Organization Name

    pass_word = "Testing@321"; //Old Password 

    new_pass = this.l_name + "@123456" //New Password 
    new_pass1 = this.l_name1 + "@123456" //New Password 


    //Locators or Xpaths
    sign_up = "//a[@href='signup']";
    fname = "//input[@id='fname']";
    lname = "//input[@id='lname']";
    mobileno = "//input[@id='mobileno']";
    email = "//input[@id='email']";
    orgname = "//input[@id='orgname']";
    DISCOM = "//input[@id='DISCOM']/..";
    Password = "//input[@id='password']";
    confirm_password = "//input[@id='password_confirmation']";
    check_resgister = "//input[@id='register']";
    create_account = "//button[@type='submit']";

    //Enter Email OTP
    otp1 = "//input[@name='otp1']";
    otp2 = "//input[@name='otp2']";
    otp3 = "//input[@name='otp3']";
    otp4 = "//input[@name='otp4']";
    otp5 = "//input[@name='otp5']";
    otp6 = "//input[@name='otp6']";

    //Enter Mobile OTP
    otp7 = "//input[@name='otp7']";
    otp8 = "//input[@name='otp8']";
    otp9 = "//input[@name='otp9']";
    otp10 = "//input[@name='otp10']";
    otp11 = "//input[@name='otp11']";
    otp12 = "//input[@name='otp12']";
    OTP1 = "(//div[contains(@class,'row gx-2 gx-md-3')])[1]";
    OTP2 = "(//div[contains(@class,'row gx-2 gx-md-3')])[2]";
    validate_otp = "//button[contains(text(),'Validate') or contains(text(),'Resend')]";
    old_password = "//input[@placeholder='Old Password']";
    new_password = "//input[@placeholder='new password']";
    confirm = "//input[@placeholder='Confirm Password']";

    Change_password = "//button[contains(text(),'Change Password')]";
    TFA_OTP = "//input[@value='OTP']/.."

    //-------------------------------------------------------------------------------------------------------------------
    //Methods
    //signUp
    async dateAndTime() {
        const now = new Date();
        // let dateString = `${now.getDate().toString().padStart(2, '0')}`;
        let timeString = `${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
        return timeString
    }
    async signup(f_name, l_name, fullName, email_id, phoneNumber, org_name) {
        //Navigate to the url
        await pageFixture.page.goto(data.URL, { waitUntil: 'load' });
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.sign_up).click({ timeout: 40000, waitUntil: 'load' }); //Click signUp Link
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator(this.fname).fill(f_name); //Fill First name
        await pageFixture.page.locator(this.lname).fill(l_name); //Fill Last name
        await pageFixture.page.locator(this.mobileno).fill(phoneNumber); //Mobile number
        await pageFixture.page.locator(this.email).fill(email_id); //Email ID
        await pageFixture.page.locator(this.orgname).fill(org_name); //Organization Name
        await pageFixture.page.click(this.DISCOM); //Check Box
        await pageFixture.page.locator(this.Password).fill(this.pass_word); //Password
        await pageFixture.page.locator(this.confirm).fill(this.pass_word);//confirm Password
        await pageFixture.page.click(this.check_resgister); //Click check box
        await pageFixture.page.click(this.create_account); //Click Create Account
        await this.OTP(); //Method to fill Otp


        console.log(`Name : ${fullName}`);
        console.log(`Email_ID : ${email_id}`);
        console.log(`Organization name : ${org_name}\n`);



        await assert.assertToContains("//*[contains(text(),'SMS Verified Successfully')]", "SMS Verified Successfully");

        console.log(`✔ SignUp have been Successfully Completed`);

        await pageFixture.page.waitForTimeout(3000);
    }

    //OTP fill
    async OTP() {
        await pageFixture.page.locator(this.otp1).fill("6");
        await pageFixture.page.locator(this.otp2).fill("5");
        await pageFixture.page.locator(this.otp3).fill("4");
        await pageFixture.page.locator(this.otp4).fill("3");
        await pageFixture.page.locator(this.otp5).fill("2");
        await pageFixture.page.locator(this.otp6).fill("1");
        await pageFixture.page.locator(this.otp7).fill("6");
        await pageFixture.page.locator(this.otp8).fill("5");
        await pageFixture.page.locator(this.otp9).fill("4");
        await pageFixture.page.locator(this.otp10).fill("3");
        await pageFixture.page.locator(this.otp11).fill("2");
        await pageFixture.page.locator(this.otp12).fill("1");
        await pageFixture.page.click(this.validate_otp, { timeout: 40000 }); //Click Validate OTP

        await pageFixture.page.waitForTimeout(3000);
    }

    async login_Again(email_id, passcode, newPassword) {
        await pageFixture.page.getByPlaceholder('Email Address').fill(email_id); //Fill Email_ID
        switch (passcode) {
            case "oldpassword":
                await pageFixture.page.getByPlaceholder('Password').fill(this.pass_word); //Fill Password 
                break;
            case "newpassword":
                await pageFixture.page.getByPlaceholder('Password').fill(newPassword); //Fill Password 
                break;
        }
        // ------------------------------------------------
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 }); //Click Login Button
        await pageFixture.page.waitForTimeout(3000);
    }


    async changePasswordAndTFA(newPassword) {
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator(this.old_password).fill(this.pass_word); //Fill Old Password
        await pageFixture.page.locator(this.new_password).fill(newPassword); //Fill New Password
        await pageFixture.page.locator(this.confirm).fill(newPassword); //Fill Confirm New Password
        await pageFixture.page.click(this.Change_password, { timeout: 40000 }); //Click Change Button

        //Assert the changepass Message 
        await assert.assertToContains("//*[contains(text(),'Password changed successfully')]", "Password changed successfully");

        await pageFixture.page.click(this.TFA_OTP); //Next Step is to click OTP Two Factor Autentication
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

        // const TFA_assert = await pageFixture.page.locator("//*[contains(text(),'Please check your OTP via email and sms')]").textContent();
        // expect(TFA_assert).toContain("Please check your OTP via email and sms");
        await pageFixture.page.waitForTimeout(2000);
        await this.OTP();
    }

    async inactiveTFA() {
        await pageFixture.page.locator("(//img[@id='userprofile1'])[1]").click();
        await pageFixture.page.locator("//a[contains(text(),'My Profile')]").click();
        await pageFixture.page.locator("//a[contains(text(),'Two Factor Authentication')]").click();
        await pageFixture.page.locator("//label[contains(text(),'INACTIVE')]").click();
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
        await this.OTP();
        //Assert the changepass Message 
        await assert.assertToContains("//*[contains(text(),'Two Factor Auth Type-NA Enabled Successfully')]", "Two Factor Auth Type-NA Enabled Successfully");

    }


}
module.exports = SignUp;