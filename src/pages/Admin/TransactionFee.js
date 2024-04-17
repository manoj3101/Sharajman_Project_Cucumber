const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const SignUp = require('./SignUp');
const admin_data = require('../../helper/utils/admin_data.json');
const RandomFunction = require('../../helper/utils/RandomFunction');


//Object Instance
const randomFunction = new RandomFunction();
const currentDate = new Date();

// Extract year, month, and day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Form the date string in 'YYYY-MM-DD' format
const formattedDate = `${year}-${month}-${day}`;

class TransactionFee {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //Variables 
    static getFormula;
    static setFormula;
    static FormulaValue;
    static getSuccessFormula;
    static setSuccessFormula;
    static successFormulaValue;



    //Xpath

    fetchFormula = "(//tbody//tr//td)[3]";
    action = "(//tbody//tr//td)[8]" //Active status
    search = "//input[@placeholder='Search Organization']";
    feeName = "//input[@formcontrolname='fee_name']";
    event = "//select[@formcontrolname='txn_event']";
    user_Type = "//select[@formcontrolname='user_type']";
    date = "//input[@formcontrolname='txn_effective_date']";
    hold = "//input[@formcontrolname='hold_refundable']";
    formulaBox = "//textarea[@placeholder='Formula']";
    slash = "//button[contains(text(),'/')]";
    multiply = "//button[contains(text(),'*')]";
    subtract = "//button[contains(text(),'-')]";
    add = "//button[contains(text(),'+')]";
    percent = "//button[contains(text(),'%')]";
    openBractket = "//button[contains(text(),'(')]";
    close_bracket = "//button[contains(text(),')')]";
    one = "//button[contains(text(),'1')]";
    two = "//button[contains(text(),'2')]";
    three = "//button[contains(text(),'3')]";
    four = "//button[contains(text(),'4')]";
    five = "//button[contains(text(),'5')]";
    six = "//button[contains(text(),'6')]";
    seven = "//button[contains(text(),'7')]";
    eight = "//button[contains(text(),'8')]";
    nine = "//button[contains(text(),'9')]";
    zero = "//button[contains(text(),'9')]";
    backspace = "//button[contains(text(),'backspace')]";
    reset = "(//button[contains(text(),'Reset')])[1]";
    quantum = "//button[contains(text(),'Quantum')]";
    discovered_Price = "//button[contains(text(),'Discovered Price')]";
    submit = "//button[contains(text(),'Submit')]";
    //Filter Xpath
    filter = "//a[@type='button']";
    filter_search = "(//button[contains(text(),'Search')])[2]"; //Search button 2 
    filterEvent = "(//select[contains(@class,'form-select ng')])[3]"; //Discovery Of Price | Listing Of Requirements |Success Fee
    filterStatus = "(//select[contains(@class,'form-select ng')])[4]"; //Activate  | Deactivate
    class = "form-select ng-untouched ng-pristine ng-valid"




    //Methods

    async click_Transaction_Fee() {

        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[9]"); //Hover to the Transaction_Fee
        await home.hover({ timeout: 40000 });
        await pageFixture.page.locator("//span[contains(text(),'Transaction Fee')]").click(); //Click the Transaction_Fee
    }

    async transaction_Fee_List(fee_name, event, userType, hold_refundable) {

        await pageFixture.page.getByRole('button', { name: / Add Transaction Fee /i }).click(); //Click Add Transation fee button
        await pageFixture.page.locator(this.feeName).fill(fee_name); //Fill the transaction fee name 
        //Select event for
        await pageFixture.page.locator(this.event).selectOption({ value: randomFunction.capitalizeWords(event), timeout: 40000 }); //Listing Of Requirements //Success Fee
        //Select the User type 
        await pageFixture.page.locator(this.user_Type).selectOption({ label: userType }); //Initiator //Responder //Both
        //Effective date
        await pageFixture.page.locator(this.date).fill(formattedDate); //Enter the adte in this format => 2024-04-04
        //Hold & Refundable
        if (hold_refundable) {
            await pageFixture.page.locator(this.hold).click(); // check box for Hold & Refundable 
        }

    }
    //Filter 
    async filter_fee(event, status) {
        await pageFixture.page.locator(this.filter).click();
        //Select event 
        await pageFixture.page.locator(this.filterEvent).selectOption({ value: randomFunction.capitalizeWords(event) }); //Listing Of Requirements //Success Fee
        await pageFixture.page.waitForTimeout(2000);
        //Select event for
        await pageFixture.page.locator(this.filterStatus).selectOption({ label: randomFunction.capitalizeWords(status) }); //Activate  | Deactivate

        await pageFixture.page.locator(this.filter_search).click();
        await pageFixture.page.waitForTimeout(2000);

    }

    //Fetch the transaction fee
    async fetch_Transaction_Fee(fee_name, quantumValue) {
        await pageFixture.page.waitForTimeout(2000);
        await this.filter_fee("Listing Of Requirements", "Activate");
        await pageFixture.page.locator(this.search).fill(fee_name); //Fill the org Name 
        await pageFixture.page.getByRole('button', { name: /Search/i }).click(); //Click the search button 
        await pageFixture.page.waitForTimeout(2000);

        //Get the Formula from the Transaction fee 
        TransactionFee.getFormula = await pageFixture.page.locator(this.fetchFormula).nth(0).textContent();  //Get the formula & store it in the variable 
       

        // Remove the "=" sign
        const formulaWithoutEquals = TransactionFee.getFormula.slice(1);

        // Replace "Quantum" with the value
        TransactionFee.setFormula = formulaWithoutEquals.replace("Quantum", quantumValue);

        // Evaluate the expression
        TransactionFee.FormulaValue = eval(TransactionFee.setFormula);

        

        await pageFixture.page.waitForTimeout(3000);
    }

    // //Fetch the success fee
    async fetch_Success_Fee(fee_name, quantumValue) {
        await pageFixture.page.reload({ waitUntil: 'load' });
        await pageFixture.page.waitForTimeout(2000);
        await this.filter_fee("Success Fee", "Activate");
        await pageFixture.page.locator(this.search).fill(fee_name); //Fill the org Name 
        await pageFixture.page.getByRole('button', { name: /Search/i }).click(); //Click the search button 
        await pageFixture.page.waitForTimeout(2000);

        //Get the Formula from the Transaction fee 
        TransactionFee.getSuccessFormula = await pageFixture.page.locator(this.fetchFormula).nth(0).textContent();  //Get the formula & store it in the variable 
        
        // Remove the "=" sign
        const formulaWithoutEquals = TransactionFee.getSuccessFormula.slice(1);

        // Replace "Quantum" with the value
        TransactionFee.setSuccessFormula = formulaWithoutEquals.replace("Quantum", quantumValue);

        // Evaluate the expression
        TransactionFee.successFormulaValue = eval(TransactionFee.setSuccessFormula);

       

        await pageFixture.page.waitForTimeout(3000);
    }

}
module.exports = TransactionFee;