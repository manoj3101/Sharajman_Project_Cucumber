const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");


const currentDate = new Date();

// Get day, month, and year
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based
const year = currentDate.getFullYear();




class LOAManagement {

    //Constructor
    // constructor(page){
    //     this.page=page;
    // }

    //xpath

    //Methods
    //LOA Generation Page
    // application_no =null;

    async loaGeneration() {
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
        await home.hover();
        await pageFixture.page.locator("//span[contains(text(),'LOA Management')]").click();
        await pageFixture.page.locator("//span[contains(text(),'LOA Generation')]").click();

    }

    //Upload the Document ===> Responder Side 
    async uploadDocument(CFP) {

        await pageFixture.page.locator(" //label[contains(text(),'Responder')]").click();
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.click("//div[contains(@class,'gredient-blue-icon-box')]");
        await pageFixture.page.waitForSelector("(//input[@type='file'])[2]");
        await pageFixture.page.locator("(//input[@type='file'])[2]").setInputFiles('src/helper/utils/LOA.pdf');
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.getByRole('button', { name: /Upload/i }).click();
        await pageFixture.page.waitForTimeout(3000);

        //Assert
        const loa_assert = await pageFixture.page.locator("//*[contains(text(),'LOA has been uploaded successfully')]").textContent();
        expect(loa_assert).toContain("LOA has been uploaded successfully");
        console.log("----------------Successfully Uploaded the document ----------------");

    }

    //Your LOA acceptance timeline has been expired
    async responder_LOA_Expires(CFP) {
        await pageFixture.page.locator(" //label[contains(text(),'Responder')]").click();
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.click("//div[contains(@class,'gredient-blue-icon-box')]");

        //Assert 
        const Expired = await pageFixture.page.locator("//div[@role='alert' and contains(@class, 'toast-message') and contains(text(), 'Your LOA acceptance timeline has been expired')]").textContent();
        await expect(Expired).toContain(" Your LOA acceptance timeline has been expired");
        console.log("-------------Responder can't upload the LOA-------------------- \n !!!!!!!!!!!!!!!!!!!Your LOA acceptance timeline has been expired.!!!!!!!!!!!!!!!!!!!!!!!");

    }

    //Responder rejecting the loa
    async responder_Rejects_loa(CFP) {
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(" //label[contains(text(),'Responder')]").click();
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.click("//div[contains(@class,'gredient-blue-icon-box')]");
        await pageFixture.page.click("//*[contains(@for,'rejectRadio')]");
        await pageFixture.page.getByPlaceholder('Remarks').fill("Rejected");
        await pageFixture.page.getByRole('button', { name: /Upload/i }).click();

        //Assertion 
        const loa_assert = await pageFixture.page.locator("//*[contains(text(),'Loa is rejected successfully.')]").textContent();
        expect(loa_assert).toContain("Loa is rejected successfully.");
        console.log("----------------Loa is rejected successfully----------------");

    }

    //Action 
    async action(CFP) {
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.getByRole('button', { name: /Action/i }).click();
        await pageFixture.page.getByPlaceholder('remarks').fill("LOA Approved");
        await pageFixture.page.getByRole('button', { name: /Accept/i }).click();
        console.log("----------------Action Done Successfully ----------------");

    }

    //Function to Generate a random 5 or 6 digit number
    async generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    async formatD(gtam, source, rpo, tGna) {
        // await this.page.getByPlaceholder('Search').fill(CFP);
        // await this.page.getByRole('button', { name: /Search/i }).click();

        await pageFixture.page.waitForTimeout(2000);

        //punch Application
        await pageFixture.page.locator("//label[contains(text(),'Application generation')]").click();
        //Generate New Format-D
        await pageFixture.page.getByRole('button', { name: /Generate New Format-D/i }).click();

        //Function to Generate a random 5 or 6 digit number
        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generate a random 5 or 6 digit number
        let randomNumber = generateRandomNumber(10000, 999999);

        let application_no = randomNumber.toString();

        console.log(`Application Number : ${application_no}`);

        //Application Number
        await pageFixture.page.getByPlaceholder('Search Organization').fill(application_no);

        //Transaction under GTAM (Yes/No)
        //Value = YES | NO 
        await pageFixture.page.locator("//Select[@formcontrolname='transaction_under_gtam']").selectOption({ value: gtam });

        //Source of generation is solar/non-solar/hydro 
        //Value = SOLAR || NON-SOLAR || HYDRO || NA
        await pageFixture.page.locator("//Select[@formcontrolname='source_generation']").selectOption({ value: source });

        //Whether the Transaction is for meeting RPO obligation
        //Value = YES | NO | NA
        await pageFixture.page.locator("//Select[@formcontrolname='rpo_obligation']").selectOption({ value: rpo });

        //Granting T-GNA/T-GNARE exigency application
        //Value = YES | NO 
        await pageFixture.page.locator("//Select[@formcontrolname='granting_exigency']").selectOption({ value: tGna });

        //Click  Generate Format-D 
        await pageFixture.page.getByRole('button', { name: /Generate Format-D/i }).click();
        //Confirm Yes
        await pageFixture.page.getByRole('button', { name: ' Yes ' }).click();

        const message = await pageFixture.page.locator("//*[contains(text(),'Format-D have been generated successfully')]").textContent();
        console.log(`${message}`);
        await expect(message).toContain("Format-D have been generated successfully");
        await pageFixture.page.waitForTimeout(2000);
        console.log("----------------Format-D Generated Successfully ----------------");


    }

}
module.exports = LOAManagement;