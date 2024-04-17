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



class Payment_Approval {


    async clickPaymentApproval() {

        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]"); //Hover to the Payment Approval

        await home.hover();

        await pageFixture.page.locator("//span[contains(text(),'Payment Approval')]").click(); //Click the Payment Approval

    }

    async paymentApproval(org_name, paymentApproveOrReject) {
        await pageFixture.page.waitForTimeout(4000);
        //Search the organization name 
        await pageFixture.page.locator("//input[contains(@name,'search')]").fill(org_name);

        await pageFixture.page.locator("//button[contains(text(),'Search')]").click();

        //Transaction ID => //tbody/tr/td[2]

        await pageFixture.page.waitForTimeout(4000);

        // List of row
        const elements = await pageFixture.page.$$("//tbody/tr");


       
        //If it has multiple row
        for (let i = elements.length; i > 0; i--) {
            //Approve the payment 
            if (paymentApproveOrReject) {
                await pageFixture.page.locator("(//a[contains(text(),'Approve')])[" + i + "]").click();
                //click yes in the pop up 
                await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

                //Payment Date 
                await pageFixture.page.locator("//input[@placeholder='Enter Date']").fill(formattedDate);

                //Click the submit Button 
                await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

               
                await assert.assertToContains("//*[contains(text(),'Subscription plan for member')]", "Subscription plan for member");
            }
            else{
                await pageFixture.page.locator("(//a[contains(text(),'Reject')])[" + i + "]").click();
                //click yes in the pop up 
                await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

                //Payment Date 
                await pageFixture.page.locator('//input[@formcontrolname="remark"]').fill("Payment Rejected");

                //Click the submit Button 
                await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

               
                await assert.assertToContains("//*[contains(text(),'rejected successfully')]", "rejected successfully");

            }
            break;

        }

    }

}
module.exports = Payment_Approval;