const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");
const SignUp = require('../Admin/SignUp');
const RandomFunction = require('../../helper/utils/RandomFunction');



//Object Instance
const signUp = new SignUp();
const randomFunction = new RandomFunction();



class Login {
    //Constructor
    // constructor(page){
    //     pageFixture.page =page;
    // }


    //variable
    newpassword = null;


    async login(email, password) {
        await pageFixture.page.goto(data.URL, { waitUntil: 'load' });
        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });
        await pageFixture.page.waitForTimeout(3000);

        //Handling the dialog if they appear due to already the user logged in some other device or browser.
        const dialog = "//*[contains(text(),'Please confirm..')]";
        if (await pageFixture.page.isVisible(dialog)) {
            await pageFixture.page.getByRole('button', { name: ' Yes ' }).click();
            console.log("------------------------------------------------------------------------------------------------------");
            console.log("                                    ✔ Dialog Box Appeared ✔                                      ");
        }
        console.log("************************************** ✔ Successfully Logged In ✔ **************************************");
        console.log("-----------Page Title -------- :" + await pageFixture.page.title());

    }

    async changePasswordAndTFA(old_pass, new_pass) {
        this.newpassword = new_pass+ "@123456";

            await pageFixture.page.locator(signUp.old_password).fill(old_pass); //Fill Old Password
        await pageFixture.page.locator(signUp.new_password).fill(this.newpassword); //Fill New Password
        await pageFixture.page.locator(signUp.confirm).fill(this.newpassword); //Fill Confirm New Password
        await pageFixture.page.click(signUp.Change_password, { timeout: 40000 }); //Click Change Button

        //Assert the changepass Message 
        const changepass_assert = await pageFixture.page.locator("//*[contains(text(),'Password changed successfully')]").textContent();
        expect(changepass_assert).toContain("Password changed successfully");
        console.log(`✔ ${changepass_assert}\n`);

        await pageFixture.page.click(signUp.TFA_OTP); //Next Step is to click OTP Two Factor Autentication
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

        // const TFA_assert = await pageFixture.page.locator("//*[contains(text(),'Please check your OTP vie email and sms')]").textContent();
        // expect(TFA_assert).toContain("Please check your OTP vie email and sms");

        await signUp.OTP();
        console.log(`✔ OTP Two Factor Autentication Completed`);
    }


    async logout(){
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator("(//img[@id='userprofile1'])[1]").click();
        await pageFixture.page.locator("//a[contains(text(),'Logout')]").click();
        await pageFixture.page.waitForTimeout(3000);
    }


}
module.exports = Login;