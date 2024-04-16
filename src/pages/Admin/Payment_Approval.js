const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');
const Wrapper = require('../../helper/wrapper/assert');


// Get the current date
const currentDate = new Date();
const assert = new Wrapper();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Form the date string in 'YYYY-MM-DD' format
const formattedDate = `${year}-${month}-${day}`;

//console.log(formattedDate); // Output example: 2024-02-27

class Payment_Approval {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //Methods

    async clickPaymentApproval() {

        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]"); //Hover to the Payment Approval

        await home.hover();

        await pageFixture.page.locator("//span[contains(text(),'Payment Approval')]").click(); //Click the Payment Approval

    }

    async paymentApproval(org_name) {
        await pageFixture.page.waitForTimeout(4000);
        //Search the organization name 
        await pageFixture.page.locator("//input[contains(@name,'search')]").fill(org_name);

        await pageFixture.page.locator("//button[contains(text(),'Search')]").click();

        //Transaction ID => //tbody/tr/td[2]

        await pageFixture.page.waitForTimeout(4000);

        // List of row
        const elements = await pageFixture.page.$$("//tbody/tr");


        // Output the number of row elements found
        // console.log(`Number of Row found in Payment Approval: ${elements.length}`);

        //If it has multiple row
        for (let i = elements.length; i > 0; i--) {
            //Approve the payment 
            await pageFixture.page.locator("(//a[contains(text(),'Approve')])[" + i + "]").click();

            //To reject the Payment ==> //tbody/tr/td[11]//a[contains(text(),'Reject')]

            //click yes in the pop up 
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

            //Payment Date 
            await pageFixture.page.locator("//input[@placeholder='Enter Date']").fill(formattedDate);

            //Click the submit Button 
            await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

            //Assert the Payment Message
            //Subscription plan for member JW Company has been approved successfully.
            await assert.assertToContains("//*[contains(text(),'Subscription plan for member')]","Subscription plan for member");
            break;

        }

    }

}
module.exports = Payment_Approval;