const RandomFunction = require("../../helper/utils/RandomFunction");
const { test, expect } = require('@playwright/test');
const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");
const RandomFunction = require('../../helper/utils/RandomFunction');

//Object Instance
const randomFunction = new RandomFunction();

class SignUp {

    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //Variable
    f_name = randomFunction.generateRandomFirstName(); //First Name 
    l_name = randomFunction.generateRandomLastName(); //Last Name 
    // f_name = this.generateRandomFirstName(); //First Name 
    // l_name = this.generateRandomLastName(); //Last Name 
    Name = this.f_name + " " + this.l_name; // Combined Name 
    phone_no = randomFunction.generateRandomMobileNumber(); //Mobile number 
    email_id = this.f_name + this.l_name + "@yopmail.com";  //Email ID 
    // org_name = this.generateRandomOrganizationName();  //Organization Name
    org_name = randomFunction.generateRandomOrganizationName();  //Organization Name

    pass_word = "Testing@321"; //Old Password 
    new_pass = this.l_name + "@123456" //New Password 


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
    validate_otp = "//button[contains(text(),'Validate')]";
    old_password = "//input[@placeholder='Old Password']";
    new_password = "//input[@placeholder='new password']";
    confirm = "//input[@placeholder='Confirm Password']";

    Change_password = "//button[contains(text(),'Change Password')]";

    TFA_OTP = "//input[@value='OTP']/.."
    //yes button need to come here after clicking otp
    //same otp xpath for this also

    //again loginstep 
    //again otp step 


    //-------------------------------------------------------------------------------------------------------------------
    //Methods

    // Generate a random first name
    generateRandomFirstName() {
        const firstNames = [
            'John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Riya',
            'Ethan', 'Emily', 'Daniel', 'Isabella', 'Benjamin', 'Amelia', 'Logan', 'Mia', 'Matthew', 'Charlotte'
        ];
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    }

    // Generate a random last name
    generateRandomLastName() {
        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson',
            'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'
        ];
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    // Generate a random organization name
    generateRandomOrganizationName() {
        // const organizationNames = [
        //     'Tech Solutions', 'Innovative Designs', 'Global Enterprises', 'Creative Minds', 'Digital Solutions', 
        //     'NextGen Technologies', 'Smart Systems', 'CodeCraft', 'Agile Innovations', 'FutureTech', 
        //     'TechGenius', 'Data Dynamics', 'Digital Edge', 'TechCraft', 'Software Wizards', 
        //     'TechStar', 'Visionary Technologies', 'Data Systems', 'Innovative Minds', 'Strategic IT'
        // ];
        const organizationNames = [
            'Creative Minds', 'FutureTech', 'TechGenius', 'TechCraft', 'TechStar'
        ];
        return organizationNames[Math.floor(Math.random() * organizationNames.length)];
    }

    // Generate a random Phone number
    generateRandomMobileNumber() {
        const number = Math.floor(Math.random() * 1000000000); // Random 9-digit number
        return number.toString().padStart(10, '9');
    }

    //-------------------------------------------------------------------------------------------------------------------


    //signUp
    async signup() {
        //Navigate to the url
        await pageFixture.page.goto(data.URL, { waitUntil: 'load' });
        await pageFixture.page.locator(this.sign_up).click({ timeout: 40000 }); //Click signUp Link
        console.log("Page Title :" + await pageFixture.page.title());
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.fname).fill(this.f_name); //Fill First name
        await pageFixture.page.locator(this.lname).fill(this.l_name); //Fill Last name
        await pageFixture.page.locator(this.mobileno).fill(this.phone_no); //Mobile number
        await pageFixture.page.locator(this.email).fill(this.email_id); //Email ID
        await pageFixture.page.locator(this.orgname).fill(this.org_name); //Organization Name
        await pageFixture.page.click(this.DISCOM); //Check Box
        await pageFixture.page.locator(this.Password).fill(this.pass_word); //Password
        await pageFixture.page.locator(this.confirm).fill(this.pass_word);//confirm Password
        await pageFixture.page.click(this.check_resgister); //Click check box
        await pageFixture.page.click(this.create_account); //Click Create Account
        await this.OTP(); //Method to fill Otp


        console.log(`Name : ${this.Name}`);
        console.log(`Organization : ${this.org_name}`);
        console.log(`Email_ID : ${this.email_id}`);

        //Assert the OTP Message 
        const otp_assert = await pageFixture.page.locator("//*[contains(text(),'SMS Verified Successfully')]").textContent();
        expect(otp_assert).toContain("SMS Verified Successfully");
        console.log(`✔ ${otp_assert}`);

        await pageFixture.page.waitForTimeout(4000);
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

    async login_Again(passcode) {
        await pageFixture.page.getByPlaceholder('Email Address').fill(this.email_id); //Fill Email_ID
        switch (passcode) {
            case "oldpassword":
                await pageFixture.page.getByPlaceholder('Password').fill(this.pass_word); //Fill Password 
                break;
            case "newpassword":
                console.log(this.new_pass);
                await pageFixture.page.getByPlaceholder('Password').fill(this.new_pass); //Fill Password 
                break;
        }
        // ------------------------------------------------
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 }); //Click Login Button
        await pageFixture.page.waitForTimeout(3000);
    }

    async changePasswordAndTFA() {
        await pageFixture.page.locator(this.old_password).fill(this.pass_word); //Fill Old Password
        await pageFixture.page.locator(this.new_password).fill(this.new_pass); //Fill New Password
        await pageFixture.page.locator(this.confirm).fill(this.new_pass); //Fill Confirm New Password
        await pageFixture.page.click(this.Change_password, { timeout: 40000 }); //Click Change Button
        await pageFixture.page.click(this.TFA_OTP); //Next Step is to click OTP Two Factor Autentication
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
        await this.OTP();
    }


}
module.exports = SignUp;