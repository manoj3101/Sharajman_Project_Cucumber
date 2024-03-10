const RandomFunction = require("../../helper/utils/RandomFunction");
const { test, expect } = require('@playwright/test');
const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");

class SignUp {

    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    f_name = this.generateRandomFirstName();
    l_name = this.generateRandomLastName();
    Name = this.f_name + this.l_name;
    email_id = this.Name + "@yopmail.com"

    // f_name = () => {
    //     return function generateRandomFirstName() {
    //         const firstNames = [
    //             'John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Riya',
    //             'Ethan', 'Emily', 'Daniel', 'Isabella', 'Benjamin', 'Amelia', 'Logan', 'Mia', 'Matthew', 'Charlotte'
    //         ];
    //         return firstNames[Math.floor(Math.random() * firstNames.length)];
    //     }
    // };

    //locators or xpaths
    signup = "//a[@href='signup']";
    fname = "//input[@id='fname']";
    lname = "//input[@id='lname']";
    mobileno = "//input[@id='mobileno']";
    email = "//input[@id='email']";
    orgname = "//input[@id='orgname']";
    DISCOM = "//input[@id='DISCOM']";
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


    OTP1 = "//div[contains(@class,'row gx-2 gx-md-3')]";
    OTP2 = "//div[contains(@class,'row gx-2 gx-md-3')]";

    validate_otp = "//button[contains(text(),'Validate OTP')]";

    old_password = "//input[@placeholder='Old Password']";
    new_password = "//input[@placeholder='new password']";
    conform = "//input[@placeholder='Confirm Password']";

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



    async signup() {
        //Navigate to the url
        await pageFixture.page.goto(data.URL, { waitUntil: 'load' });
        await pageFixture.page.locator(this.signup).click({ timeout: 40000 }); //Click signUp Link
        await pageFixture.page.locator(this.fname).fill(this.f_name());
        await pageFixture.page.locator(this.lname).fill(l_name);
        await pageFixture.page.locator(this.mobileno).fill(mobile_no);
        await pageFixture.page.locator(this.email).fill(email_id);
        await pageFixture.page.check(this.DISCOM);
        await pageFixture.page.locator(this.Password).fill("Testing@321");
        await pageFixture.page.locator(this.confirm_password).fill("Testing@321");



        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });
        await pageFixture.page.waitForTimeout(3000);


    }


}
module.exports = SignUp;