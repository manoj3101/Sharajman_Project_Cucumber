const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const RandomFunction = require('../../helper/utils/RandomFunction');

//Object Instance
const randomFunction = new RandomFunction();

class YopMail {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //variable
    get_password = null;

    //locator

    inbox_field = "//input[@id='login']";
    button = "(//button[@class='md'])[1]";
    // subject = "//button[@class='lm']";
    subject = "//div[@class='lmfd']";
    text = "NAME (TEST)";
    namaskar = "(//div/p)[2]";
    user_name = "(//div/p)[4]";
    password = "(//div/p)[5]";

    //Methods


    async email_Verify_Password(email, password) {
        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });


    }

    async email_Verify_Password1(user) {
        await pageFixture.page.goto(admin_data.yopmail_url, { waitUntil: 'load' }); //Go to YOP Mail
        await pageFixture.page.waitForTimeout(15000);
        // await pageFixture.page.locator(this.inbox_field).fill(user); //fill the user email ID
        await pageFixture.page.locator(this.inbox_field).fill(user); //fill the user email ID
        await pageFixture.page.click(this.button); //Click the Button

        //Refresh email
        for (let i = 0; i < 3; i++) {
            await pageFixture.page.locator("//button[@id='refresh']").click();
            await pageFixture.page.waitForTimeout(5000);
        }
        // await pageFixture.page.waitForTimeout(30000);
        // await pageFixture.page.locator("//button[@id='refresh']").click();

        // Locate the frame using XPath
        const frame = await pageFixture.page.waitForSelector("iframe#ifinbox");

        // Switch to the frame
        const frameElement = await frame.contentFrame();

        // Query for elements within the frame
        const elements = await frameElement.$$(this.subject);

        // Output the number of elements found
        console.log(`Number of elements found in the iframe: ${elements.length}`);


        for (let i = 0; i < elements.length; i++) {
            const textContent = await elements[i].textContent();
            console.log(textContent.trim());
            if (textContent.includes("NAME (TEST)")) {
                await elements[i].click();
                console.log("✔ Clicked Email ✔");
                await pageFixture.page.waitForTimeout(10000);
                const frame1 = await pageFixture.page.waitForSelector("iframe#ifmail");
                const frameElement1 = await frame1.contentFrame();
                const nameElement = await frameElement1.waitForSelector(this.user_name); // Corrected locator usage
                const name = await nameElement.textContent();
                if (name.includes(user)) {
                    const passwordElement = await frameElement1.waitForSelector(this.password); // Corrected locator usage
                    const password = await passwordElement.textContent();
                    const parts = password.split(':');
                    const textAfterSemicolon = parts[1].trim();
                    this.get_password = textAfterSemicolon;
                    console.log(textAfterSemicolon);
                    break;
                }
            } else {
                console.log("X No Email List Found X");
            }
        }

    }



}
module.exports = YopMail;