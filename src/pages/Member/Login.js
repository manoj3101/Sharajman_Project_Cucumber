const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");



class Login {
    //Constructor
    // constructor(page){
    //     pageFixture.page =page;
    // }

    async login(email, password) {
        await pageFixture.page.goto(data.URL,{ waitUntil: 'load' });
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
}
module.exports = Login;