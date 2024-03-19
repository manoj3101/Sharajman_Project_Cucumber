const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');
const RandomFunction = require('../../helper/utils/RandomFunction');

//Object Instance
const randomFunction = new RandomFunction();



class Manage_Member {

    // Constructor
    // constructor(page){
    //     this.page =page;
    // }




    async click_Manage_Member() {
        //Hover to the Manage Member and click the Manage Member
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
        await home.hover();
        await pageFixture.page.locator("//span[contains(text(),'Manage Member')]").click();
    }

    async approve_Member(org_name) {

        await pageFixture.page.waitForTimeout(3000);
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search').fill(org_name);

        //select Status pending     value="APPROVED" | value="PENDING" | value="REJECTED"
        await pageFixture.page.locator("(//select[@name='region'])[2]").selectOption({ value: "PENDING" });

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.waitForTimeout(4000);

        //check the row   //tbody/tr    if the row is one then do  
        //(//tbody/tr//td)[13]  ==> Action text content

        //(//tbody/tr//td)[6] ==> view 

        // List of row
        const elements = await pageFixture.page.$$("//tbody/tr");

        // Output the number of row elements found
        console.log(`Number of Row elements found: ${elements.length}`);

        //If it has multiple row
        // for (let i = 0; i < elements.length; i++) {
        //     const name = await pageFixture.page.locator("(//tbody/tr/td[2])[" + i + "]").textContent();
        //     if (name.includes(user_name)) {
        //         await pageFixture.page.locator("(//*[contains(text(),'View')])[" + i + "]").click();
        //     }

        // }

        //Click the View Action 
        await pageFixture.page.locator("//*[contains(text(),'View')]").click();

        //Assert the alertmsg Message 
        const alertmsg_assert = await pageFixture.page.locator("//*[contains(text(),'Registration pending for approval')]").textContent();
        expect(alertmsg_assert).toContain("Registration pending for approval");
        console.log(`✔ ${alertmsg_assert}`);


        await pageFixture.page.waitForTimeout(4000);
        // //Assert the company name 
        const cmp_name = await pageFixture.page.locator("//input[@id='orgname']").textContent();
        // expect(cmp_name).toContain(org_name);
        console.log(`Organization name : ${cmp_name}`);

        //click the button 
        await pageFixture.page.getByRole('button', { name: /Approve/i }).click();  // Reject False case

        //click yes9
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

        //Assert the congratulation
        //Assert the OTP Message 
        const congratsmsg = await pageFixture.page.locator("//h4[@id='modal-basic-title']").textContent();
        expect(congratsmsg).toContain("Congratulations");
        console.log(`✔ ${congratsmsg}`);

        // console.log(await pageFixture.page.locator("//b[contains(text(),'Member')]/..").first().textContent());
        console.log(await pageFixture.page.locator("//div[@class='modal-body']").textContent());


        //Close the Congratulations Pop Up by clicking
        await pageFixture.page.locator("//i-feather[@name='x']//*[name()='svg']").click();
        await pageFixture.page.waitForTimeout(3000);
    }


    //Member Rights
    async member_rights(org_name, selectAll, home, registration, manage_User, format_D, lOA_Generation, award, respond, lOA_Management,) {

        await pageFixture.page.waitForTimeout(3000);
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search').fill(org_name);

        //select Status pending     value="APPROVED" | value="PENDING" | value="REJECTED"
        await pageFixture.page.locator("(//select[@name='region'])[2]").selectOption({ value: "APPROVED" });

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

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        const message = await pageFixture.page.locator("//*[contains(text(),'Required previliges have been assigned to the user')]").textContent();
        console.log(`${message}`);
        expect(message).toContain("Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }




}
module.exports = Manage_Member;