const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const tabSwitcher = require('../../hooks/tabSwitcher');
const data = require("../../helper/utils/data.json");
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const RandomFunction = require('../../helper/utils/RandomFunction');
const TransactionFee = require('../Admin/TransactionFee');
const Wrapper = require('../../helper/wrapper/assert');

//Object Instance
const randomFunction = new RandomFunction();
const assert = new Wrapper();



const currentDate = new Date();

// Get day, month, and year
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based
const year = currentDate.getFullYear();




class DashboardCFP {

    //Constructor
    // constructor(page, context, browser) {
    //     this.page = page;
    //     this.context = context;
    //     this.browser = browser;        
    // }


    //variable
    static Utility_1 = null;
    static Utility_2 = null;
    static Quantum_2 = null;
    static LOA_no = null;
    static loaIssuanceMins = null;
    static imp_start_date;
    static imp_end_date;
    static exp_start_date;
    static exp_end_date;

    CFP_Num = null;
    //-------------------------------------------------------------------------------------------------------------

    //locators or xpaths
    text = "//textarea[@formcontrolname='title']";
    Import = "//label[contains(text(),'Import')]";
    Export = "//label[contains(text(),'Export')]";
    responderyes = "//label[@for='is_result_publicYes']";
    responderno = "//label[@for='is_result_publicNo']";
    Add = "//button[contains(text(),'Add')]";

    //import add
    fromDate_imp = "//input[@formcontrolname='sch_start_date']";
    toDate_imp = "//input[@formcontrolname='sch_end_date']";
    startTime_imp = "//select[@formcontrolname='sch_start_time']";
    endTime_imp = "//select[@formcontrolname='sch_end_time']";

    quantum = "//input[@formcontrolname='quantum']";

    //Export add
    fromDate_exp = "//input[@formcontrolname='retn_start_date']";
    toDate_exp = "//input[@formcontrolname='retn_end_date']";
    startTime_exp = "//select[@formcontrolname='retn_start_time']";
    endTime_exp = "//select[@formcontrolname='retn_end_time']";

    //CFP publishing Timeline
    hh = "//input[@aria-label='Hours']";
    mm = "//input[@aria-label='Minutes']";

    //Other Details
    settlement = "(//select[contains(@aria-label,'Floating label select example')])[3]";

    //Ceiling Return for Import
    ceiling_baseYes = "//label[contains(@for,'PercentageYes')]";
    ceiling_baseNo = "//label[contains(@for,'PercentageNo')]";
    ceiling_Base_return = "//input[contains(@placeholder,'Return')]";

    //Base return for Export
    base_return = "//input[contains(@placeholder,'Base Return')]";

    showHighlight = "//button[contains(text(),'Show Highlights')]";

    //select Responder
    select_Responder = "//label[contains(text(),'Select Responders')]";
    search_responder = "(//input[contains(@placeholder,'Search Responders')])[1]";
    add_responders = "//div//tbody//td//img";

    next = "//button[contains(text(),'Next')]";

    //after publish
    cfp = "//h4[contains(text(),'The CFP')]";
    cfpNumber = "//h4[contains(text(),'The CFP')]//span";


    //Responder side xpath
    responder_tab = "//a[contains(text(),'Responder')]";

    //--------------------------------------------------------------------------------------------------------

    //Methods


    //Click Create CFP
    async clickCreateCFP(chooseCFP) {
        // Create a TabSwitcher instance
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("cfp");
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.getByRole('button', { name: /Create New CFP/i }).click({ timeout: 50000 });
        switch (chooseCFP) {
            case "Quick CFP":
                await pageFixture.page.locator("//span[contains(text(),'" + chooseCFP + "')]").nth(0).click();
                console.log(`User Choose ${chooseCFP}`);
                break;
            case "Custom CFP":
                await pageFixture.page.locator("//span[contains(text(),'" + chooseCFP + "')]").nth(0).click();
                console.log(`User Choose ${chooseCFP}`);
                await pageFixture.page.waitForTimeout(3000);
                await pageFixture.page.getByRole('textbox').setInputFiles('src/helper/utils/CFP.pdf');
                await pageFixture.page.waitForTimeout(6000);
                break;
        }
        await pageFixture.page.getByRole('button', { name: /I Agree/i }).click();
    }

    //Power Swapping 
    async powerSwapping(energy) {
        //Text Area
        await pageFixture.page.locator(this.text).fill("Power Swapping of " + energy + " MW of energy(Auto Test)");
    }

    //Import/Export
    async firstChoice(choice) {
        choice = choice.toLowerCase().replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
        await pageFixture.page.locator("//label[contains(text(),'" + choice + "')]").check();
        console.log("-----------------------------------------" + choice + "-----------------------------------------");
    }

    //Result to be Published to all the Responders
    async resultPublish(result) {
        if (result) {
            await pageFixture.page.check(this.responderyes);
        }
        else {
            await pageFixture.page.check(this.responderno)
        }

    }


    //Import period
    async importPeriod(quantumValue, impStartDate, impEndDate, imp_start_time, imp_end_time) {

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        // Calculating dates
        var importStartDate = addDays(currentDate, impStartDate);
        var importEndDate = addDays(currentDate, impEndDate);
        // console.log(importStartDate);

        // Function to format date to 'YYYY-MM-DD' format
        var formatDate = function (date) {
            return date.toISOString().split('T')[0];
        };

        DashboardCFP.imp_start_date = (formatDate(importStartDate)).toString();
        DashboardCFP.imp_end_date = (formatDate(importEndDate)).toString();

        console.log("Import start date :", DashboardCFP.imp_start_date);
        console.log("Import end date:", DashboardCFP.imp_end_date);
        await pageFixture.page.locator(this.fromDate_imp).fill(DashboardCFP.imp_start_date);
        await pageFixture.page.locator(this.toDate_imp).fill(DashboardCFP.imp_end_date);
        await pageFixture.page.locator(this.startTime_imp).selectOption({ label: imp_start_time });
        await pageFixture.page.locator(this.endTime_imp).selectOption({ label: imp_end_time });
        await pageFixture.page.fill(this.quantum, quantumValue);
    }

    //Minimum Quantum
    async minimumQuantum(minQuantum, minQuantumValue) {
        if (minQuantum) {
            await pageFixture.page.check("//label[@for='MinQuantumYes']");
            await pageFixture.page.locator("//input[@formcontrolname='min_qty']").fill(minQuantumValue);
        }
        else {
            await pageFixture.page.check("//label[@for='MinQuantumNo']");
        }
    }

    //Export period
    async exportPeriod(expStartDate, expEndDate, exp_start_time, exp_end_time) {

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        // Calculating dates
        var exportStartDate = addDays(currentDate, expStartDate);
        var exportEndDate = addDays(currentDate, expEndDate);

        // Function to format date to 'YYYY-MM-DD' format
        var formatDate = function (date) {
            return date.toISOString().split('T')[0];
        };

        DashboardCFP.exp_start_date = (formatDate(exportStartDate)).toString();
        DashboardCFP.exp_end_date = (formatDate(exportEndDate)).toString();


        console.log("Export start date :", DashboardCFP.exp_start_date);
        console.log("Export end date :", DashboardCFP.exp_end_date, "\n");
        await pageFixture.page.locator(this.fromDate_exp).fill(DashboardCFP.exp_start_date);
        await pageFixture.page.locator(this.toDate_exp).fill(DashboardCFP.exp_end_date);
        await pageFixture.page.locator(this.startTime_exp).selectOption({ label: exp_start_time });
        await pageFixture.page.locator(this.endTime_exp).selectOption({ label: exp_end_time });
    }

    //Publishing the CFP date and time
    async publishing_time() {
        // Define currentDate
        let currentDate = new Date();

        // Get current time components
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();

        const minutesToAdd = 2;
        const minutesToAdd1 = 17;

        // Calculate the new time
        let newMinutes = (currentMinutes + minutesToAdd) % 60;
        let newHours = currentHours + Math.floor((currentMinutes + minutesToAdd) / 60);
        newHours = newHours % 24; // Ensure hours remain within 24-hour format

        let newMinutes1 = (currentMinutes + minutesToAdd1) % 60;
        let newHours1 = currentHours + Math.floor((currentMinutes + minutesToAdd1) / 60);
        newHours1 = newHours1 % 24; // Ensure hours remain within 24-hour format

        let hour_now = currentHours.toString().padStart(2, '0');
        let minute_now = currentMinutes.toString().padStart(2, '0');
        let hour1 = newHours.toString().padStart(2, '0');
        let minute1 = newMinutes.toString().padStart(2, '0');
        let hour2 = newHours1.toString().padStart(2, '0');
        let minute2 = newMinutes1.toString().padStart(2, '0');

        console.log(`Current Time ${hour_now}:${minute_now}`); //Current Time
        console.log(`Live Start at ${hour1}:${minute1}`); //Live Start time
        console.log(`Live Ending at ${hour2}:${minute2}`); //Live Ending time

        //Hours
        await pageFixture.page.locator(this.hh).nth(0).fill('');
        await pageFixture.page.locator(this.hh).nth(0).fill(hour1);
        //min
        await pageFixture.page.locator(this.mm).nth(0).fill('');
        await pageFixture.page.locator(this.mm).nth(0).fill(minute1);
        //Hours
        await pageFixture.page.locator(this.hh).nth(1).fill('');
        await pageFixture.page.locator(this.hh).nth(1).fill(hour2);
        //Min
        await pageFixture.page.locator(this.mm).nth(1).fill('');
        await pageFixture.page.locator(this.mm).nth(1).fill(minute2);

    }

    //Response Validity Period
    async response_validityTime(days, hours, minutes) {

        await pageFixture.page.getByPlaceholder("Days").nth(0).fill(days);
        await pageFixture.page.getByPlaceholder("Hours").nth(0).fill(hours);
        await pageFixture.page.getByPlaceholder("Minutes").nth(0).fill(minutes);
    }

    // Contract Awarding Timeline to Responder
    async awarding_time(days, hours, minutes) {
        await pageFixture.page.getByPlaceholder("Days").nth(1).fill(days);
        await pageFixture.page.getByPlaceholder("Hours").nth(1).fill(hours);
        await pageFixture.page.getByPlaceholder("Minutes").nth(1).fill(minutes);
    }

    //LOA issuance timeline by the Initiator
    async loa_Issuance_time(days, hours, minutes) {
        await pageFixture.page.getByPlaceholder("Days").nth(2).fill(days);
        await pageFixture.page.getByPlaceholder("Hours").nth(2).fill(hours);
        await pageFixture.page.getByPlaceholder("Minutes").nth(2).fill(minutes);
    }

    //LOA acceptance timeline by the Responder
    async loa_Acceptance_time(days, hours, minutes) {
        await pageFixture.page.getByPlaceholder("Days").nth(3).fill(days);
        await pageFixture.page.getByPlaceholder("Hours").nth(3).fill(hours);
        await pageFixture.page.getByPlaceholder("Minutes").nth(3).fill(minutes);
    }

    //Other Details
    async otherDetails(index, value) {
        await pageFixture.page.locator(this.settlement).selectOption({ index: index });
        await pageFixture.page.waitForTimeout(2000);
        if (index == 0 || index >= 3) {
            await pageFixture.page.locator("//input[@formcontrolname='price_value']").fill(value);
        }
    }

    //comment Box
    async commentBox(condition) {
        if (condition) {
            await pageFixture.page.check("//label[contains(@for,'btn7')]");
        }
        else {
            await pageFixture.page.check("//label[contains(@for,'btn8')]");
        }
    }

    //ceiling Return
    async ceilingBaseReturn(Return, ReturnValue) {
        if (Return) {
            await pageFixture.page.check(this.ceiling_baseYes);
            await pageFixture.page.locator(this.ceiling_Base_return).fill(ReturnValue);
        }
        else {
            await pageFixture.page.check(this.ceiling_baseNo);
            console.log(" X No Ceiling or Base Return X");
        }
        //await pageFixture.page.locator(this.showHighlight).click();
        await pageFixture.page.waitForTimeout(3000);
    }

    //select responder
    async selectResponder(multiple_responder, responder) {
        await pageFixture.page.click(this.select_Responder);
        // await pageFixture.page.locator(this.search_responder).fill('TickingMinds');
        // await pageFixture.page.locator(this.search_responder).fill('Tickingminds_');
        await pageFixture.page.locator(this.search_responder).fill(responder);
        await pageFixture.page.waitForTimeout(2500);
        const elements = await pageFixture.page.$$(this.add_responders);
        // Iterate through each element and perform a click action
        if (multiple_responder) {
            for (const element of elements) {
                await pageFixture.page.waitForTimeout(1500);
                await element.click();
                //break;
                //await pageFixture.page.waitForTimeout(2000);
            }
            //Select all option
            await pageFixture.page.locator("//input[@id='flexCheckChecked']").click();
        }
        else {
            await pageFixture.page.waitForTimeout(1500);
            await pageFixture.page.locator("(//div//tbody//td//img)[1]").click();
        }
        await pageFixture.page.getByRole('button', { name: /Next/i }).click();
    }


    //Custom guest
    async custom_Guests(custom_Guests) {
        await pageFixture.page.getByPlaceholder("Enter Guest Email Id").fill(custom_Guests);

    }

    //remarks
    async remarks(remarks) {
        await pageFixture.page.getByPlaceholder("Enter Remarks").fill(remarks);
    }

    //Transaction fee verification
    async transactionfee_Verify_Initiator() {
        //Get the text content from the Remaining listing
        const text = await pageFixture.page.locator("(//div[contains(@class,'modal-body')])[2]").textContent();
        console.log(`Remaining listing :${text}`);

        // Regular expression to extract values
        // const regex = /INR (\d+) .* (\d+\*\d+)/;
        const regex = /INR (\d+(\.\d+)?) .* (\d+\*\d+(\.\d+)?)/;

        // Executing the regular expression on the text
        const matches = regex.exec(text);

        if (matches) {
            const amountOnHold = matches[1];
            const successFee = matches[3];
            console.log("Amount on hold:", amountOnHold);
            console.log("Success fee:", successFee);
            if (amountOnHold == TransactionFee.FormulaValue) {
                console.log(`✔ Expected transaction fee ${TransactionFee.FormulaValue} is equal to actual value ${amountOnHold}`);
            } else {
                console.log(`X Expected not met actual `);
            }
            if (successFee == TransactionFee.setFormula) {
                console.log(`✔ Expected transaction fee ${TransactionFee.setFormula} is equal to actual value ${successFee}\n`);
            } else {
                console.log(`X Expected not met actual\n`);
            }
        } else {
            console.log("No matches found.");
        }
    }

    //next & publish
    async publish() {
        //await pageFixture.page.locator(this.next).click();
        await pageFixture.page.getByRole('button', { name: /Next/i }).click();
        await pageFixture.page.getByRole('button', { name: /Publish/i }).click();

        if (await pageFixture.page.isVisible('//*[contains(text(),"You don\'t have privilege")]')) {
            await assert.assertToContains('//*[contains(text(),"You don\'t have privilege")]', "You don't have privilege to perform this action");
        }
        else {
            await this.transactionfee_Verify_Initiator();
            await pageFixture.page.getByRole('button', { name: /Proceed/i }).click(); //New feature click proceed to continue
            await pageFixture.page.waitForTimeout(2000);

            //submitted status
            const cfpstatus = await pageFixture.page.locator(this.cfp).textContent();
            console.log("---------------- ✔ " + cfpstatus + " ✔-----------------");
            expect(cfpstatus).toContain("created successfully");
            const CFP_N = await pageFixture.page.locator(this.cfpNumber).innerText();

            this.CFP_Num = CFP_N;
            console.log("CFP ID Status -----------:" + this.CFP_Num);
        }

    }


    //-----------------------------------------------------------------------------------------------------
    //Click Responder Tab
    async clickresponder() {
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("cfp");
        await pageFixture.page.click(this.responder_tab, { timeout: 40000 });
    }


    async transactionfee_Verify_Responder() {
        //Get the text content from the Remaining listing
        const text = await pageFixture.page.locator("(//div[contains(@class,'modal-body')])[1]").textContent();
        console.log(`Remaining listing :${text}`);

        // Regular expression to extract values
        // const regex = /INR (\d+) .* (\d+\*\d+)/;
        const regex = /INR (\d+(\.\d+)?) .* (\d+\*\d+(\.\d+)?)/;

        // Executing the regular expression on the text
        const matches = regex.exec(text);

        if (matches) {
            const amountOnHold = matches[1];
            const successFee = matches[3];
            console.log("Amount on hold:", amountOnHold);
            console.log("Success fee:", successFee);
            if (amountOnHold == TransactionFee.FormulaValue) {
                console.log(`✔ Expected transaction fee ${TransactionFee.FormulaValue} is equal to actual value ${amountOnHold}`);
            } else {
                console.log(`X Expected not met actual `);
            }
            if (successFee == TransactionFee.setFormula) {
                console.log(`✔ Expected transaction fee ${TransactionFee.setFormula} is equal to actual value ${successFee}\n`);
            } else {
                console.log(`X Expected not met actual\n`);
            }
        } else {
            console.log("No matches found.");
        }
    }

    //Place Respond (Responder side)
    async place_Respond(CFP, minQuantumValue1, ReturnValue1) {

        await pageFixture.page.reload({ waitUntil: 'load' });
        await pageFixture.page.waitForTimeout(4000);
        await pageFixture.page.click(this.responder_tab);
        await pageFixture.page.waitForTimeout(3000);
        const LiveCFP = await pageFixture.page.$$("//div[@class='d-flex low-time-strip']");
        console.log("--------------No of Live CFP Feed--------------: " + LiveCFP.length);
        const lists = await pageFixture.page.$$("//b[text()='CFP ID ']/..");
        // console.log("-------------------No of CFP ID-------------: " + lists.length);
        //check the same cfp number 


        for (let i = 0; i < lists.length; i++) {
            const textContent = await lists[i].textContent();
            //console.log(textContent);
            if (textContent.includes(CFP)) {
                console.log("-------------------My CFP---------------: " + CFP);
                //(//span[contains(@class,'digital-time')]/following-sibling::div/button)[1]
                await pageFixture.page.locator("(//span[contains(@class,'digital-time')]/following-sibling::div/button)[" + (i + 1) + "]").click();
                console.log("                  ✔ Clicked Respond ✔                 ");
                break;
            }
            else {
                console.log("               X No Responders List X               ");
            }
        }
        await pageFixture.page.waitForTimeout(3000);


        //Place Response        
        //If it has Min Quantum
        if (await pageFixture.page.isVisible("//input[@formcontrolname='min_quantum']")) {
            // try {
            await pageFixture.page.locator("//input[@formcontrolname='min_quantum']").fill(minQuantumValue1);
            await pageFixture.page.locator("//input[@formcontrolname='min_quantum']").fill('');
            await pageFixture.page.locator("//input[@formcontrolname='min_quantum']").type(minQuantumValue1);

        } else {
            console.log("--------------------X No Min Quantum X----------------------");
        }

        //If it has Base/ceiling return enter the value and place the 
        if (await pageFixture.page.isVisible("//input[@formcontrolname='bid_amount']")) {
            console.log(await pageFixture.page.locator("//div[contains(@class,'d-flex align-items-center justify-content-between')]//p").nth(0).textContent());
            //Ener Return ...
            await pageFixture.page.locator("//input[@formcontrolname='bid_amount']").fill(ReturnValue1);
            await pageFixture.page.locator("//input[@id='flexCheckChecked']").click(); // Click Check Box
        }
        else {
            await pageFixture.page.locator("//input[@id='flexCheckChecked']").click(); // Click Check Box
        }

        //Placing the responses....
        await pageFixture.page.waitForTimeout(2000);
        //Click place response button...
        await pageFixture.page.locator("//button[contains(text(),'Place Response')]").click({ timeout: 50000 });

        //verify the transaction fee
        await this.transactionfee_Verify_Responder();
        await pageFixture.page.getByRole('button', { name: /Proceed/i }).click(); //new button



        //Checking the Message Response Placed Successfully is correct or not.
        await pageFixture.page.waitForTimeout(2000);

        // Negative Case: Checking the error message for response amount
        if (await pageFixture.page.isVisible("//h4[contains(text(),'Please enter response amount smaller than or equal')]")) {
            let msg = await pageFixture.page.locator("//h4[contains(text(),'Please enter response amount smaller than or equal')]").textContent();
            console.log(`An error Message is : ${msg}`);
            await pageFixture.page.waitForTimeout(2000);
            expect(msg).toContain("Please enter response amount smaller than or equal to ceiling percentage");
            await pageFixture.page.locator("//img[contains(@class,'cursor-pointer on-h')]").click();
            console.log("-------------------- X Response CFP couldn't placed Successfully X -----------------");
        }
        // Negative Case: Checking the error message for admin privilege
        else if (await pageFixture.page.isVisible('//h4[contains(text(),"You don\'t have privilege")]')) {
            let msg = await pageFixture.page.locator("//h4[contains(text(),'You')]").textContent();
            console.log(`An error Message is : ${msg}`);
            await pageFixture.page.waitForTimeout(2000);
            expect(msg).toContain("You don't have privilege to perform this action");
            await pageFixture.page.locator("//img[contains(@class,'cursor-pointer on-h')]").click();
        }
        // Checking if the response is placed successfully
        else {
            const response = await pageFixture.page.locator("//a[contains(text(),'OK')]//preceding::h4[1]").textContent();
            console.log("-----------------------------------------------------------------------");
            console.log(`Response Placed : ${response}    ✔`);
            console.log("-----------------------------------------------------------------------");
            expect(response).toContain("Response Placed Successfully");
            await pageFixture.page.locator("//*[contains(text(),'OK')]").click();
            await pageFixture.page.locator("//span[contains(@class,'d-flex align-items')]/child::img[@class='cursor-pointer']").click();
        }


    }

    //Collect the error message 
    async ceiling_error() {
        const error = await pageFixture.page.locator("//*[contains(text(),'Please enter response amount smaller than or equal to ceiling percentage')]");
        console.log(`An error Message is : ${error}`);
        expect(error).toContain("Please enter response amount smaller than or equal to ceiling percentage");
        await pageFixture.page.locator("(//img[contains(@class,'cursor-pointer')])[14]").click();
        console.log("-------------------- X Response CFP couldn't placed Successfully X -----------------");
    }


    //view response
    async view_Respond(CFP) {
        const LiveCFP = await pageFixture.page.$$("//div[@class='d-flex low-time-strip']");
        // console.log("--------------Live CFP Feed--------------: "+LiveCFP.length);
        const lists = await pageFixture.page.$$("//b[text()='CFP ID ']/..");
        // console.log("-------------------CFP ID-------------: "+lists.length);
        //check the same cfp number 

        for (let i = 0; i < lists.length; i++) {
            const textContent = await lists[i].textContent();
            //console.log(textContent);
            if (textContent.includes(CFP)) {
                console.log("My CFP :" + CFP);
                // await pageFixture.page.locator("(//button[contains(text(),'View Response')])[" + (i + 1) + "]").click();
                await pageFixture.page.locator("(//span[contains(@class,'digital-time')]/following-sibling::div/button)[" + (i + 1) + "]").click();
                console.log("               ✔ Clicked view Response ✔            ");
                break;
            }
            else {
                console.log("      X No Responders List X    ");
            }
        }
    }


    //Initiator side for awarding 
    async initiatedFeed(CFP) {
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("cfp");
        await pageFixture.page.waitForTimeout(3000);
        // const initiatedCFP= await pageFixture.page.$$("//div[@class='d-flex initiated-time-strip']");
        // console.log("--------------Initiated CFP Feed--------------: "+initiatedCFP.length);

        const lists = await pageFixture.page.$$("//b[contains(text(),'CFP ID')]/..");
        // console.log("-------------------CFP ID-------------: " + lists.length);

        //check the same cfp number            
        for (let i = 0; i < lists.length; i++) {
            const textContent = await lists[i].textContent();
            //console.log("-----------------------"+textContent);
            if (textContent.includes(CFP)) {
                console.log("My CFP : " + CFP);
                await pageFixture.page.locator("(//button//div[contains(@class,'icon-bg position-relative')])[" + (i + 1) + "]").click();
                await pageFixture.page.waitForTimeout(2000);
                console.log("--------------View Clicked--------------");
                break;
            }
            else {
                console.log("No Matching CFP found");
            }
        }

    }

    //CFP Expire
    async CFP_Expire() {

        const expired = await pageFixture.page.locator("//a[contains(@class,'text-Danger')]").textContent();
        expect(expired).toContain("EXPIRED");
        console.log("                X CFP TimeLine Expired Can't able to Award the CFP X           ");

    }

    //Calculation part for the energycalculation_initiator
    async energycalculation_initiator(start_date, end_date, start_time, end_time, quantum) {
        // Combine date and time for start and end
        const startdate = new Date(start_date);
        const enddate = new Date(end_date);
        const startTime = new Date(`${startdate.toISOString().split('T')[0]}T${start_time}`);
        const endTime = new Date(`${enddate.toISOString().split('T')[0]}T${end_time}`);

        // Calculate the time difference in milliseconds
        const timeDifference = endTime - startTime;

        // Convert milliseconds to days, hours, and minutes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
        const minutes = (timeDifference / (1000 * 60)) % 60;
        const time = hours + minutes / 60;

        // Display the result
        // console.log(`Initiator Difference: ${days} days, ${hours + minutes / 60} hours\n`);

        //Calculation part 
        const energy_kwh = (days + 1) * time * quantum * 1000;
        console.log(`Expected Energy in KWH :${energy_kwh}`);

        //Assertion 
        //import 
        const content1 = await pageFixture.page.locator("(//h5[contains(text(),'Period')])[1]").textContent();
        const Energy1 = await pageFixture.page.locator("(//td[7])[1]").textContent();
        console.log("<<<<<<<<<<<<<<<<<<<<" + content1 + ">>>>>>>>>>>>>>>>>>>>>>\n");
        console.log(`Actual Energy in KWH : ${Energy1}`);
        const numericEnergy1 = parseFloat(Energy1);

        // await expect(numericEnergy1).toBe(energy_kwh);
        if (energy_kwh === numericEnergy1) {
            console.log(` ✔ Passed Actual Energy in KWH : ${energy_kwh} is equal to the Expected Energy in KWH : ${numericEnergy1}\n`);
        } else {
            console.log(` X Failed  Actual Energy in KWH : ${energy_kwh} is not equal to the Expected Energy in KWH : ${numericEnergy1}\n`);
        }

        //Declaring as a  global 
        global.eng = energy_kwh;

    }


    //Calculation part for the energycalculation_responder
    async energycalculation_responder(start_date, end_date, start_time, end_time, returnpercent) {
        // Combine date and time for start and end
        const startdate = new Date(start_date);
        const enddate = new Date(end_date);
        const startTime = new Date(`${startdate.toISOString().split('T')[0]}T${start_time}`);
        const endTime = new Date(`${enddate.toISOString().split('T')[0]}T${end_time}`);

        // Calculate the time difference in milliseconds
        const timeDifference = endTime - startTime;

        // Convert milliseconds to days, hours, and minutes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
        const minutes = (timeDifference / (1000 * 60)) % 60;
        const time = hours + minutes / 60;

        // Display the result
        // console.log(`Responder Difference: ${days} days, ${hours + minutes / 60} hours\n`);

        const initiator_kwh = global.eng;

        //Calculation part        
        const responder_kwh = initiator_kwh * (returnpercent / 100); //return percentage is
        const responder_megawatt = responder_kwh / (1000 * (days + 1) * time); // Responder quantum 
        const roundedQuantum = Math.floor(responder_megawatt * 100) / 100; // Round down to 2 decimal places  //Responder quantum 
        const reverse_energy = roundedQuantum * 1000 * (days + 1) * time; //Responder reverse energy

        console.log("Expected Energy1 in KWH : " + initiator_kwh); //Initiator Energy calculated in above method
        // console.log("Old Expected Energy2 in KWH : " + responder_kwh); //Responder Energy calculate as per old method
        console.log("Expected Energy2 in KWH : " + reverse_energy); //Responder Reverse energy
        const roundedQuantum1 = Number(responder_megawatt.toFixed(2));
        console.log("Expected Quantum in MW : " + responder_megawatt);
        console.log("Round off Expected Quantum in MW : " + roundedQuantum);
        // console.log("Old Round off Expected Quantum in MW : " + roundedQuantum1);

        //assert 
        //export
        const content2 = await pageFixture.page.locator("(//h5[contains(text(),'Period')])[2]").textContent();
        const Energy2 = await pageFixture.page.locator("(//td[8])[1]").textContent();
        const quantum = await pageFixture.page.locator("(//td[7])[2]").textContent();
        console.log("<<<<<<<<<<<<<<<<" + content2 + ">>>>>>>>>>>>>>>>>>>>\n");
        console.log("Actual Energy in KWH :" + Energy2);
        console.log("Actual Quantum in MH :" + quantum);
        const numericEnergy1 = parseFloat(Energy2);
        const numericquantum = parseFloat(quantum);

        //  await expect.soft(numericquantum).toBe(roundedQuantum);
        //  await expect.soft(numericEnergy1).toBe(responder_kwh);


        if (reverse_energy === numericEnergy1) {
            console.log(` ✔ Passed Actual Energy in KWH : ${reverse_energy} is equal to the Expected Energy in KWH : ${numericEnergy1}`);
        } else {
            console.log(` X Failed  Actual Energy in KWH : ${reverse_energy} is not equal to the Expected Energy in KWH : ${numericEnergy1}`);
        }
        if (roundedQuantum === numericquantum) {
            console.log(` ✔ Passed Actual Quantum in MW : ${roundedQuantum} is equal to the Expected Quantum in MW : ${numericquantum}\n`);
        } else {
            console.log(` X Failed Actual Quantum in MW : ${roundedQuantum} is not equal to the Expected Quantum in MW : ${numericquantum}\n`);
        }

    }


    async multiple_responder() {
        const returns = await page.$$("//table[contains(@class,'table overflow-hidden rounded')]//tbody//tr[1]/td[4]");

        // Initialize an empty array to store objects with index and number
        let numbersArray = [];

        // Loop through the div elements, considering only odd ones
        for (let i = 1; i <= returns.length; i++) {
            const returnsText = await returns[i].innerText();
            // Remove the % symbol and convert to number
            const numberValue = parseFloat(returnsText.replace('%', ''));

            // Create an object containing both index and number
            const obj = {
                index: i,
                value: numberValue
            };

            // Push the object into the array
            numbersArray.push(obj);
        }

        // Find the maximum number and its corresponding index
        let maxNumber = 0;
        let maxIndex;

        for (let i = 0; i < numbersArray.length; i++) {
            if (numbersArray[i].value > maxNumber) {
                maxNumber = numbersArray[i].value;
                maxIndex = numbersArray[i].index;
            }
        }

        // Now maxNumber contains the highest number, and maxIndex contains its corresponding index
        console.log("Highest Number:", maxNumber);
        console.log("Index of Highest Number:", maxIndex);



    }


    //Success fee verification
    async successfee_Verify_Loa() {
        //Get the text content from the Remaining listing
        const text = await pageFixture.page.locator("//span[contains(text(),'Success fee')]").textContent();
        const text1 = await pageFixture.page.locator("(//span[contains(text(),'Success Fee Debited')]//following::span)[1]").textContent();

        console.log(`Success Fee :${text}`);
        console.log(`Success Fee :${text1}`);

        // Regular expression to extract values
        // const regex = /INR (\d+)/;
        const regex = /INR (\d+(\.\d+)?)/;

        // Executing the regular expression on the text
        const matches = regex.exec(text1);

        if (matches) {
            const successFee = matches[1];
            console.log("Actual Success fee:", successFee);
            if (successFee == TransactionFee.successFormulaValue) {
                console.log(`✔ Expected Success fee ${TransactionFee.successFormulaValue} is equal to actual value ${successFee}`);
            } else {
                console.log(`X Expected not met actual`);
            }
        } else {
            console.log("No Success fee matches found.");
        }
    }



    //Generate Award
    async generateAward() {
        const returns = await pageFixture.page.$$("//table[contains(@class,'table overflow-hidden rounded')]//tbody//tr[1]/td[4]//div");
        console.log(`The lenght of the ruturn (%) :${returns.length}`);
        // Initialize an empty array to store objects with index and number
        let numbersArray = [];

        // Loop through the div elements, considering only odd ones
        for (let i = 0; i < returns.length; i++) {
            // await returns[i+1].highlight();
            const returnsText = await returns[i].innerText();
            // Remove the % symbol and convert to number
            const numberValue = parseFloat(returnsText.replace('%', ''));
            console.log(`The ruturn (%) :${numberValue}`);
            // Create an object containing both index and number
            const obj = {
                index: i,
                value: numberValue
            };

            // Push the object into the array
            numbersArray.push(obj);
        }

        // Find the maximum number and its corresponding index
        let maxNumber = 0;
        let maxIndex;

        for (let i = 0; i < numbersArray.length; i++) {
            if (numbersArray[i].value > maxNumber) {
                maxNumber = numbersArray[i].value;
                maxIndex = numbersArray[i].index;
            }
        }

        // Now maxNumber contains the highest number, and maxIndex contains its corresponding index
        console.log("Highest Number:", maxNumber);
        console.log("Index of Highest Number:", maxIndex + 1);

        await pageFixture.page.waitForTimeout(2000);
        //click the award icon & proceed with award
        // const award = await pageFixture.page.locator("//a[@ngbtooltip='Click to Award']").nth(0);
        // const award = await pageFixture.page.locator("(//a[@ngbtooltip='Click to Award'])[" + (maxIndex + 1) + "]");
        // await pageFixture.page.locator("(//thead//th)[2]").dblclick();
        const award = await pageFixture.page.locator("(//a[@ngbtooltip='Click to Accept'])[" + (maxIndex + 1) + "]");
        if (await award.isVisible()) {
            await award.click();
            // await pageFixture.page.getByRole('button', { name: /Award/i }).click();
            await pageFixture.page.getByRole('button', { name: /Accept/i }).click();
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click({ timeout: 40000 });
            //Negative Case
            if (await pageFixture.page.isVisible('//*[contains(text(),"You don\'t have privilege")]')) {
                const textMsg = await pageFixture.page.locator('//*[contains(text(),"You don\'t have privilege")]').textContent();
                console.log(`An error Message is : ${textMsg}`);
                // await pageFixture.page.waitForTimeout(2000);
                expect(textMsg).toContain("You don't have privilege to perform this action");
            }
            else {
                await this.successfee_Verify_Loa();
                await pageFixture.page.getByRole('button', { name: /Close/i }).click(); //new button
                //asserting the Awarded Successfully.
                const awarded = await pageFixture.page.locator("//*[contains(text(),'Response Accepted Successfully')]").textContent();
                expect(awarded).toContain("Response Accepted Successfully");
                console.log("              ✔ Response Accepted Successfully ✔          ");           

        }
        else {
            console.log("------------ X No Award Icon X ------------");
        }

    }

    async unableToGenerateAward() {
        const returns = await pageFixture.page.$$("//table[contains(@class,'table overflow-hidden rounded')]//tbody//tr[1]/td[4]//div");
        console.log(`The lenght of the ruturn (%) :${returns.length}`);
        // Initialize an empty array to store objects with index and number
        let numbersArray = [];

        // Loop through the div elements, considering only odd ones
        for (let i = 0; i < returns.length; i++) {
            // await returns[i+1].highlight();
            const returnsText = await returns[i].innerText();
            // Remove the % symbol and convert to number
            const numberValue = parseFloat(returnsText.replace('%', ''));
            console.log(`The ruturn (%) :${numberValue}`);
            // Create an object containing both index and number
            const obj = {
                index: i,
                value: numberValue
            };

            // Push the object into the array
            numbersArray.push(obj);
        }

        // Find the maximum number and its corresponding index
        let maxNumber = 0;
        let maxIndex;

        for (let i = 0; i < numbersArray.length; i++) {
            if (numbersArray[i].value > maxNumber) {
                maxNumber = numbersArray[i].value;
                maxIndex = numbersArray[i].index;
            }
        }

        // Now maxNumber contains the highest number, and maxIndex contains its corresponding index
        console.log("Highest Number:", maxNumber);
        console.log("Index of Highest Number:", maxIndex + 1);

        await pageFixture.page.waitForTimeout(2000);
        //click the award icon & proceed with award
        // const award = await pageFixture.page.locator("//a[@ngbtooltip='Click to Award']").nth(0);
        // const award = await pageFixture.page.locator("(//a[@ngbtooltip='Click to Award'])[" + (maxIndex + 1) + "]");
        // await pageFixture.page.locator("(//thead//th)[2]").dblclick();
        const award = await pageFixture.page.locator("(//a[@ngbtooltip='Click to Accept'])[" + (maxIndex + 1) + "]");
        if (await award.isVisible()) {
            await award.click();
            // await pageFixture.page.getByRole('button', { name: /Award/i }).click();
            await pageFixture.page.getByRole('button', { name: /Accept/i }).click();
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click({ timeout: 40000 });

            //Negative Case
            const errorMsgElement = await pageFixture.page.locator('//*[contains(text(),"You don\'t have privilege")]');
            const textMsg = await errorMsgElement.textContent();
            console.log(`An error Message is : ${textMsg}`);
            // await pageFixture.page.waitForTimeout(2000);
            expect(textMsg).toContain("You don't have privilege to perform this action");

        }
        else {
            console.log("------------ X No Award Icon X ------------");
        }

    }



    //Generate LOA
    async generateLOA(CFP, imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, exp_start_date, exp_end_date, exp_start_time, exp_end_time, returnpercent, Settlement_Price, loa_issuance_mins) {
        //click the Generate LOA icon & proceed with LOA
        const LOA = await pageFixture.page.locator("//a[contains(text(),'Generate LOA')]");
        if (await LOA.isVisible()) {
            const expire_Time = await pageFixture.page.locator("//span[contains(@class,'badge fw-600 bg-danger text-white ng-star-inserted')]").textContent();
            console.log(expire_Time);
            expect(expire_Time).toContain("Expires");
            await LOA.click();
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
            console.log("-------------Successfully Navigated to Generate LOA Page----------");
        }
        else {
            console.log("-------------No Generate LOA is Visible----------");
        }

        //switch to the tab
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("loi");

        //Getting the text from the LOA Form After generating the pdf
        const ref_no = (await pageFixture.page.locator("//input[@placeholder='rfq']").textContent()).trim();
        // const LOA_no = (await pageFixture.page.locator("//input[@formcontrolname='loi_no']").textContent()).trim();
        const subject = (await pageFixture.page.locator("//input[@formcontrolname='subject']").textContent()).trim();


        DashboardCFP.Utility_1 = (await pageFixture.page.locator("(//tbody//tr//td)[1]").textContent()).trim();
        const Period_1 = (await pageFixture.page.locator("(//tbody//tr//td)[2]").textContent()).trim();
        const Duration_1 = (await pageFixture.page.locator("(//tbody//tr//td)[3]").textContent()).trim();
        const Quantum_1 = (await pageFixture.page.locator("(//tbody//tr//td)[4]").textContent()).trim();
        DashboardCFP.Utility_2 = (await pageFixture.page.locator("(//tbody//tr//td)[5]").textContent()).trim();
        const Period_2 = (await pageFixture.page.locator("(//tbody//tr//td)[6]").textContent()).trim();
        const Duration_2 = (await pageFixture.page.locator("(//tbody//tr//td)[7]").textContent()).trim();
        DashboardCFP.Quantum_2 = (await pageFixture.page.locator("(//tbody//tr//td)[8]").textContent()).trim();
        const Return = (await pageFixture.page.locator("(//tbody//tr//td)[9]").textContent()).trim();

        const delivery_Point = await pageFixture.page.locator("//label[contains(text(),'Delivery Point')]/..").textContent();
        const general_Terms = await pageFixture.page.locator("//label[contains(text(),'General Terms')]/..").textContent();

        //Click the verify button and click generate button

        await pageFixture.page.getByRole('button', { name: /Verify LOA/i }).click();
        await pageFixture.page.getByRole('button', { name: /Generate LOA/i }).click();
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
        // await pageFixture.page.locator("//a[contains(text(),'View LOA')]").click();
        // await tabSwitch.switchToTab("loi");
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.locator("//input[contains(@placeholder,'Search')]").fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        //Document verification 
        //First clear the folder using the method
        const folderPath = 'src/helper/utils/PDF/'; // Specify the path to the folder you want to clear
        await this.clearFolder(folderPath);
        await pageFixture.page.waitForTimeout(5000);

        DashboardCFP.LOA_no = await pageFixture.page.locator("//tbody//td[3]").textContent(); //Get the LOA Number 

        //Click the Download Link and wait for the download
        const [download] = await Promise.all([
            pageFixture.page.waitForEvent('download', { timeout: 60000 }), // 60 seconds timeout
            pageFixture.page.click("//td[contains(@class,'cursor-pointer')]/u")
        ]);

        // Use the suggested filename from the download event to save the file
        const desiredFilename = 'LOA.pdf'; // Specify your desired filename here
        const filePath = `src/helper/utils/PDF/${desiredFilename}`;

        // Save the file with the specified filename
        await download.saveAs(filePath);

        // Use the 'pdf-parse' module to extract the text from the PDF file
        const dataBuffer = await fs.readFile(filePath); // Use async version of readFile
        const parsedData = await pdf(dataBuffer);
        const text = parsedData.text;

        // Now you can use the extracted text
        console.log(`\nText format Content are : ${text}`);

        // Write the parsed text content to a text file for reference
        await fs.writeFile('src/helper/utils/TextDocuments/data.txt', text); // Specify the correct file path


        const line_1 = `LOA	No.`;
        const line_2 = `${DashboardCFP.LOA_no}`;
        const line_3 = `Date`;
        const line_4 = `${DashboardCFP.Utility_2}`;
        // const line_5 = `19,	B2,	Emporio,	33,	10th	Ave,	Ashok	Nagar	Chennai	600083`;
        const line_5 = `19,	B2,	Emporio,	33,	10th	Ave,	Ashok	Nagar,	Chennai,	Tamil	Nadu	600083	Chennai	600083`;
        // const line_6 = `Letter	of	Acceptance`;
        const line_7 = `${day}-${month}-${year}`;

        const line_8 = `To,`;
        const line_9 = `${DashboardCFP.Utility_2}`;
        const line_10 = `19,	B2,	Emporio,	33,	10th	Ave,	Ashok	Nagar,	Chennai,	Tamil	Nadu	600083	Chennai	600083`;
        const line_11 = `${data.user2}`;
        const line_12 = `Subject	:	Power	swap	arrangement	by	${DashboardCFP.Utility_1}	via	CFP	Ref.	No.	${CFP}.`;
        const line_13 = `Ref:1.	e-Listing	${CFP}	dated`;
        const line_14 = `2.	Your	offer	dated	${day}-${month}-${year}	on	NAME	portal`;

        const line_15 = `Dear	Sir,`;
        const line_16 = `With	reference	to	the	above,	we	are	pleased	to	place	Letter	of	Award	(LoA)	in	favour	of	${DashboardCFP.Utility_2},	as	per`;
        const line_17 = `below	mentioned	arrangement.`;
        const line_18 = `Supply	of	Power	by	${DashboardCFP.Utility_1}	to	${DashboardCFP.Utility_2}`;
        const line_19 = `UtilityPeriodDuration	(Hrs.)Quantum	(MW)`;
        const line_20 = `${DashboardCFP.Utility_1}${imp_start_date.split('-').reverse().join('-')}	to	${imp_end_date.split('-').reverse().join('-')}${imp_start_time}	-	${imp_end_time}${quantum}`;

        const line_21 = `Return	of	Power	from	${DashboardCFP.Utility_2}	to	${DashboardCFP.Utility_1}`;
        const line_22 = `UtilityPeriod`;
        const line_23 = `Duration`;
        const line_24 = `(Hrs.)`;
        const line_25 = `Quantum	in	MW	(As`;
        const line_26 = `per	return	schedule`;
        const line_27 = `and	%	return`;
        const line_28 = `percentage)`;
        const line_29 = `Return	Ratio`;
        const line_30 = `in	%`;
        const line_31 = `${DashboardCFP.Utility_2}${exp_start_date.split('-').reverse().join('-')}	to	${exp_end_date.split('-').reverse().join('-')}${exp_start_time}	-	${exp_end_time}${DashboardCFP.Quantum_2}${returnpercent}`;

        const line_32 = `Delivery	Point`;
        const line_33 = `The	delivery	point,	in	either	case,	shall	be	the	Regional	Periphery	of	Exporting`;
        const line_34 = `Utility.`;
        const line_35 = `Settlement	rate	(Rs./kWh)${Settlement_Price}`;
        const line_36 = `General	Terms	&	Conditions`;
        const line_37 = `As	per	the	Framework	Agreement	/	As	per	the	Listing	Document	(Ref.	No.)`;
        const line_38 = `${CFP}`;

        const line_39 = `You	are	requested	to	acknowledge	the	receipt	of	this	LOA	&	give	your	acceptance	on	it.`;
        const line_40 = `Regards,`;
        const line_41 = `Yours	Faithfully,`;
        const line_42 = `For	${DashboardCFP.Utility_1}`;

        const line_43 = `Authorised	Signatory`;
        const line_44 = `(Other	Information	if	any)`;

        // Define the strings you want to check in the PDF content
        const stringsToCheck = [line_1.trim(), line_2.trim(), line_3.trim(), line_4.trim(), line_5.trim(), line_7.trim(), line_8.trim(), line_9.trim(), line_10.trim(),
        line_11.trim(), line_12.trim(), line_13.trim(), line_14.trim(), line_15.trim(), line_16.trim(), line_17.trim(), line_18.trim(), line_19.trim(), line_20.trim(),
        line_21.trim(), line_22.trim(), line_23.trim(), line_24.trim(), line_25.trim(), line_26.trim(), line_27.trim(), line_28.trim(), line_29.trim(), line_30.trim(),
        line_31.trim(), line_32.trim(), line_33.trim(), line_34.trim(), line_35.trim(), line_36.trim(), line_37.trim(), line_38.trim(), line_39.trim(), line_40.trim(),
        line_41.trim(), line_42.trim(), line_43.trim(), line_44.trim()];

        // Iterate over each string and assert its presence in the PDF content   
        for (const str of stringsToCheck) {
            //expect(text).toContain(str);
            if ((text.replace(/\s+/g, '')).includes(str.replace(/\s+/g, ''))) {
                //expect.soft(text).toContain(str);
                console.log(`✔ Actual Result is equal to Expected Result : ${str}\n`);
            } else {
                console.log(`X Expected Result is not equal to Actual Result : ${str}\n`);
            }
        }
        console.log("-------------------LOA Document Verification have Done------------------");

        //TimeLine Functionality
        //LOA Issuance timeline
        var loaIssuanceTime = await pageFixture.page.locator("//div//small").textContent();
        console.log(`LOA Issuance timeline : ${loaIssuanceTime}`);

        //Contact Awardin time 
        DashboardCFP.loaIssuanceMins = randomFunction.addMinutesToCurrentTime(loaIssuanceTime);
        const contarctAwardTime = DashboardCFP.loaIssuanceMins - parseInt(loa_issuance_mins);
        console.log(`Contract Awarding Time: Expires in 00:${contarctAwardTime}:00`);

        console.log("LOA Issuance Added minutes:", DashboardCFP.loaIssuanceMins);


        //Check contract time is added in the loa issuance time
        const addedLOAIssuanceTime = parseInt(loa_issuance_mins) + contarctAwardTime;

        if (DashboardCFP.loaIssuanceMins === addedLOAIssuanceTime) {
            console.log(`Contarct Awarding time is added to Loa Issuance Time ${DashboardCFP.loaIssuanceMins} equals ${addedLOAIssuanceTime}`);
        }
        else {
            console.log(`Contarct Awarding time is not added or equal to Loa Issuance Time`)
        }

        await pageFixture.page.waitForTimeout(5000);//Wait until document verification 
        //Need to verify the time.....
        await pageFixture.page.click("//span[text()='Upload']");
        await pageFixture.page.waitForSelector("(//input[@type='file'])[2]");
        await pageFixture.page.locator("(//input[@type='file'])[2]").setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.getByRole('button', { name: /Upload/i }).click();
        await pageFixture.page.waitForTimeout(2000);
        // await expect(await pageFixture.page.locator("//div[@ngbtooltip='Re-Upload']")).toBeHidden();
        const loa_assert = await pageFixture.page.locator("//*[contains(text(),'LOA has been uploaded successfully')]").textContent();
        await expect(loa_assert).toContain("LOA has been uploaded successfully");
        console.log("----------------Successfully Uploaded the document ----------------");

    }


    //verify loa couldn't generate if LOA Generation is uncheck 
    async generateLOA_Access_Denied() {
        //click the Generate LOA icon & proceed with LOA
        const LOA = await pageFixture.page.locator("//a[contains(text(),'Generate LOA')]");
        if (await LOA.isVisible()) {
            const expire_Time = await pageFixture.page.locator("//span[contains(@class,'badge fw-600 bg-danger text-white ng-star-inserted')]").textContent();
            console.log(expire_Time);
            expect(expire_Time).toContain("Expires");
            await LOA.click();
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
            console.log("-------------Successfully Navigated to Generate LOA Page----------");
        }
        else {
            console.log("-------------No Generate LOA is Visible----------");
        }

        //switch to the tab
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("loi");

        //asset the message Acccess Denied 
        await pageFixture.page.waitForTimeout(3000);
        console.log("Access Denied\n You are not authorized to access this application.");

        // pageFixture.page.on('response', async (response) => {
        //     if (response.status() === 403) {
        //       console.log('Received 403 Forbidden error.');
        //     }
        //   });

        //The below  one will not run because that page is 403 error 
        // const loa_assert = await pageFixture.page.locator("//h2[normalize-space()='Access Denied']").textContent();
        // const loa_assert1 = await pageFixture.page.locator("//*[contains(text(),'Access Denied')]/following::p").textContent();
        // expect(loa_assert).toContain("Access Denied");
        // console.log(`X ${loa_assert} for LOA Generation`);
        // console.log(`X ${loa_assert1}`);
    }

    // Helper function to clear files in the folder
    async clearFolder(folderPath) {
        try {
            const files = await fs.readdir(folderPath);
            for (const file of files) {
                await fs.unlink(folderPath + file);
            }
        } catch (err) {
            console.error('Error clearing folder:', err);
        }
    }

    async expired_initiator_LOA(CFP) {
        //click the Generate LOA icon & proceed with LOA
        const LOA = await pageFixture.page.locator("//a[contains(text(),'Generate LOA')]");
        if (await LOA.isVisible()) {
            const expire_Time = await pageFixture.page.locator("//span[contains(@class,'badge fw-600 bg-danger text-white ng-star-inserted')]").textContent();
            console.log(`GenerateLOA Timeline: ${expire_Time}`);
            await expect(expire_Time).toContain("Expires");
            await LOA.click();
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
            console.log("-------------Successfully Navigated to Generate LOA Page----------");
        }
        else {
            console.log("-------------No Generate LOA is Visible----------");
        }

        //switch to the tab
        const tabSwitch = new tabSwitcher();
        await tabSwitch.switchToTab("loi");
        await pageFixture.page.getByRole('button', { name: /Verify LOA/i }).click();
        await pageFixture.page.getByRole('button', { name: /Generate LOA/i }).click();
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
        await pageFixture.page.locator("//input[contains(@placeholder,'Search')]").fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        //Need to verify the time.....
        console.log("Waiting for Initiator LOA Expire .................");
        await pageFixture.page.waitForTimeout(150 * 1000);
        await pageFixture.page.click("//span[text()='Upload']");
        await pageFixture.page.waitForSelector("(//input[@type='file'])[2]");
        await pageFixture.page.locator("(//input[@type='file'])[2]").setInputFiles('src/helper/utils/LOA.pdf');
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.getByRole('button', { name: /Upload/i }).click();
        await pageFixture.page.waitForTimeout(2000);

        //Assert
        const Expired = await pageFixture.page.locator("//div[@role='alert' and contains(@class, 'toast-message') and contains(text(), 'Your LOA issuance timeline has been expired')]").textContent();
        expect(Expired).toContain(" Your LOA issuance timeline has been expired");
        console.log("-------------Initiator can't Generate LOA-------------------- \n X  Your LOA issuance timeline has been Expired  x");

    }

}
module.exports = DashboardCFP;