const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');


// Get the current date
const currentDate = new Date();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Form the date string in 'YYYY-MM-DD' format
const formattedDate = `${year}-${month}-${day}`;

//console.log(formattedDate); // Output example: 2024-02-27



class Member_Assistance {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }




    //Methods
    async clickMemberAssitance() {

        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]"); //Hover to the Member Assitance

        await home.hover();

        await pageFixture.page.locator("//span[contains(text(),'Member Assistance')]").click(); //Click the Member Assitance

    }

    async subscription_Plan_Selection(org_name) {
        //Search the Organization name   ==>Xpath = (//tbody/tr/td[1])[1]
        await pageFixture.page.getByPlaceholder('Search Organization').fill(org_name);

        //Row Lenght 
        const rowLenght = await pageFixture.page.$$("//tbody//tr");

        //Subscription Plan ==>//tbody/tr/td[8]  Xpath  List of xpath 

        //Click the Org_name
        await pageFixture.page.locator("//a[contains(text(),'" + org_name + "')]").nth(0).click();

        //Click the Subscription tab
        await pageFixture.page.locator("//a[contains(text(),'Subscription')]").click();

        //Choose a Right Subscription Plan for Your Business
        //Priority Test
        await pageFixture.page.locator("(//var[contains(text(),'Choose')])[1]").click();
        //privilege
        await pageFixture.page.locator("(//var[contains(text(),'Choose')])[1]").click();


        //Click the Make Payment button 
        await pageFixture.page.getByRole('button', { name: /Make Payment/i }).click();

        //Payment Process

        // Function to Generate a random 12 digit number
        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Generate a random 12 digit number
        let randomNumber = generateRandomNumber(10 ** 11, (10 ** 12) - 1);

        let trans_id = randomNumber.toString();

        console.log(`Application Number : ${trans_id}`);

        //Transaction ID
        await pageFixture.page.locator("//input[contains(@formcontrolname,'ref_no')]").fill(trans_id);

        //Payment Mode
        await pageFixture.page.locator("//select[@formcontrolname='payment_mode']").selectOption({ value: "NEFT" }); //value="NEFT" | value="IMPS" | value="RTGS"

        //Bank From 
        await pageFixture.page.locator("//select[@formcontrolname='from_bank_id']").selectOption({ index: 0 }); //always 1   value="723"

        //Date Of Transaction 
        await pageFixture.page.locator("//input[@formcontrolname='transation_date']").fill(formattedDate);  //max="2024-02-27" //Current date

        //Bank To
        await pageFixture.page.locator("//select[@formcontrolname='to_bank_id']").selectOption({ value: "1" }); //value="1"  Arunachal Pradesh Rural Bank (4587452145874)  | value="2"  Andhra Pragathi Grameena Bank (545875445111) | value="3"  Abu Dhabi Commercial Bank Ltd. (2345278909) 

        //Submit the Payment Process
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Subscription plan has been assigned successfully and is pending for approval, kindly check and approve the plan.
        const message = await pageFixture.page.locator("//*[contains(text(),'Subscription plan has been assigned successfully").textContent();
        console.log(`${message}`);
        await expect(message).toContain("Subscription plan has been assigned successfully");

    }




}
module.exports = Member_Assistance;