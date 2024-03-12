const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');



class Manage_Member {


    async click_Manage_Member() {
        //Hover to the Manage Member and click the Manage Member
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
        await home.hover();
        await pageFixture.page.locator("//span[contains(text(),'Manage Member')]").click();
    }

    async approve_Member(org_name) {
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search').fill(org_name);

        //select Status pending     value="APPROVED" | value="PENDING" | value="REJECTED"
        await pageFixture.page.locator("(//select[@name='region'])[2]").selectOption({ value: "PENDING" })

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        //check the row   //tbody/tr    if the row is one then do  
        //(//tbody/tr//td)[13]  ==> Action text content

        //(//tbody/tr//td)[6] ==> view 
        //Click the View Action 
        await pageFixture.page.locator("//*[contains(text(),'View')]").click();

        //click the button 
        await pageFixture.page.getByRole('button', { name: /Approve/i }).click();

        //click yes
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

        //Close the Congratulations Pop Up by clicking
        await pageFixture.page.locator("//i-feather[@name='x']//*[name()='svg']").click();

        



    }

}
module.exports = Manage_Member;