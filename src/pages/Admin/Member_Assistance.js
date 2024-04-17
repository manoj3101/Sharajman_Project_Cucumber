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



class Member_Assistance {


    trans_id =(Math.floor(Math.random() * 900000000) + 100000000).toString(); 


    //Methods
    async clickMemberAssitance() {
        
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[6]"); //Hover to the Member Assitance
        await home.hover({timeout:40000});
        await pageFixture.page.locator("//span[contains(text(),'Member Assistance')]").click({timeout:40000}); //Click the Member Assitance
    }

    async subscription_Plan_Selection(org_name) {

        await pageFixture.page.waitForTimeout(4000);
        //Search the Organization name   ==>Xpath = (//tbody/tr/td[1])[1]
        await pageFixture.page.getByPlaceholder('Search Organization').fill(org_name);

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.waitForTimeout(3000);


        //Row Lenght 
        const rowLenght = await pageFixture.page.$$("//tbody//tr");

        //Click the Org_name
        await pageFixture.page.locator("//a[contains(text(),'" + org_name + "')]").click();

        //Click the Subscription tab
        await pageFixture.page.locator("//a[contains(text(),'Subscription')]").click();
        await pageFixture.page.waitForTimeout(2000);


    
        //privilege
        await pageFixture.page.locator("(//var[contains(text(),'Choose')])[2]").click({timeout:40000});


        //Click the Make Payment button 
        await pageFixture.page.getByRole('button', { name: /Make Payment/i }).click();

        //Transaction ID
        await pageFixture.page.locator("//input[contains(@formcontrolname,'ref_no')]").fill(this.trans_id);


        //-----need change parameter 
        //Payment Mode   
        await pageFixture.page.locator("//select[@formcontrolname='payment_mode']").selectOption({ value: "NEFT" }); //value="NEFT" | value="IMPS" | value="RTGS"

        //Bank From 
        await pageFixture.page.locator("//select[@formcontrolname='from_bank_id']").selectOption({ index: 1 }); //always 1   value="723"

        //Date Of Transaction 
        await pageFixture.page.locator("//input[@formcontrolname='transation_date']").fill(formattedDate);  //max="2024-02-27" //Current date

        //Bank To
        await pageFixture.page.locator("//select[@formcontrolname='to_bank_id']").selectOption({ value: "1" }); //value="1"  Arunachal Pradesh Rural Bank (4587452145874)  | value="2"  Andhra Pragathi Grameena Bank (545875445111) | value="3"  Abu Dhabi Commercial Bank Ltd. (2345278909) 

        //Submit the Payment Process
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Subscription plan has been assigned successfully and is pending for approval, kindly check and approve the plan.
        await assert.assertToContains("//*[contains(text(),'Subscription plan has been assigned successfully')]","Subscription plan has been assigned successfully");


    }



}
module.exports = Member_Assistance;