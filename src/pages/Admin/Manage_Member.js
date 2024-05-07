const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const admin_data = require('../../helper/utils/admin_data.json');
const SignUp = require('../Admin/SignUp');
const RandomFunction = require('../../helper/utils/RandomFunction');
const Wrapper = require('../../helper/wrapper/assert');

//Object Instance
const randomFunction = new RandomFunction();
const assert = new Wrapper();



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

    //Aprove Member
    async approve_Member(org_name, memberApproveOrReject) {

        await pageFixture.page.waitForTimeout(3000);
        //Search organization name 
        await pageFixture.page.getByPlaceholder('Search').fill(org_name);

        //select Status pending     value="APPROVED" | value="PENDING" | value="REJECTED"
        await pageFixture.page.locator("(//select[@name='region'])[2]").selectOption({ value: "PENDING" });

        //Click the Search  Button
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.waitForTimeout(4000);



        // List of row
        const elements = await pageFixture.page.$$("//tbody/tr");


        //Click the View Action 
        await pageFixture.page.locator("//a[contains(text(),'View')]").click();

        //Assert the alertmsg Message 
        await assert.assertToContains("//*[contains(text(),'Registration pending for approval')]", "Registration pending for approval");
        await pageFixture.page.waitForTimeout(4000);

        // //Assert the company name 
        const cmp_name = await pageFixture.page.locator("//input[@id='orgname']").textContent();
        // expect(cmp_name).toContain(org_name);

        if (memberApproveOrReject) {
            //click the button 
            await pageFixture.page.getByRole('button', { name: /Approve/i }).click();
            //click yes
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
            //Assert the congratulation
            //Assert the OTP Message 
            await assert.assertToContains("//h4[@id='modal-basic-title']", "Congratulations");


            //Close the Congratulations Pop Up by clicking
            await pageFixture.page.locator("//i-feather[@name='x']//*[name()='svg']").click();
            await pageFixture.page.waitForTimeout(3000);
        }
        else {
            // Reject False case
            await pageFixture.page.locator('//textarea[@formcontrolname="documentRemarks"]').fill("Rejected");
            await pageFixture.page.getByRole('button', { name: /Reject/i }).click();  // Reject False case
            //click yes
            await pageFixture.page.getByRole('button', { name: /Yes/i }).click();
            //Registration form for member Agile Solutions_08144319 has been rejected successfully.
            await assert.assertToContains("//*[contains(text(),'rejected successfully')]", "rejected successfully");
        }
    }


    //Member Rights
    async member_rights(org_name, selectAll, home, registration, manage_User, format_D, lOA_Generation, award, respond, initiate, unSelectAll) {

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
        const check_Format_D = await pageFixture.page.locator("(//input[@id='write'])[6]");
        const check_LOA_Generation = await pageFixture.page.locator("(//input[@id='write'])[7]");
        const check_Award = await pageFixture.page.locator("(//input[@id='write'])[8]");
        const check_Initiate = await pageFixture.page.locator("(//input[@id='write'])[9]");
        const check_Respond = await pageFixture.page.locator("(//input[@id='write'])[10]");

        //Double click the select all 
        if (unSelectAll) {
            await SelectAll.dblclick();
            expect(SelectAll).not.toBeChecked();
            await pageFixture.page.waitForTimeout(2000);
        }


        //Rights
        if (selectAll) {
            await SelectAll.check();
            expect(SelectAll).toBeChecked();
        }
        else {
            if (home) {
                await check_Home.check();
                expect(check_Home).toBeChecked(); //assert
            } else {
                await check_Home.uncheck();
                expect(check_Home).not.toBeChecked(); //assert
            }
            //Registration
            if (registration) {
                await check_Registration.check();
                expect(check_Registration).toBeChecked(); //assert
            } else {
                await check_Registration.uncheck();
                expect(check_Registration).not.toBeChecked(); //assert
            }
            //Manage User
            if (manage_User) {
                await check_Manage_User.check();
                expect(check_Manage_User).toBeChecked(); //assert
            } else {
                await check_Manage_User.uncheck();
                expect(check_Manage_User).not.toBeChecked(); //assert
            }
            //Format D
            if (format_D) {
                await check_Format_D.check();
                expect(check_Format_D).toBeChecked(); //assert
            } else {
                await check_Format_D.uncheck();
                expect(check_Format_D).not.toBeChecked(); //assert
            }
            //LOA Generation 
            if (lOA_Generation) {
                await check_LOA_Generation.check();
                expect(check_LOA_Generation).toBeChecked(); //assert
            } else {
                await check_LOA_Generation.uncheck();
                expect(check_LOA_Generation).not.toBeChecked(); //assert
            }
            //Award
            if (award) {
                await check_Award.check();
                expect(check_Award).toBeChecked(); //assert
            } else {
                await check_Award.uncheck();
                expect(check_Award).not.toBeChecked(); //assert
            }
            //Respond
            if (respond) {
                await check_Respond.check();
                expect(check_Respond).toBeChecked(); //assert
            } else {
                await check_Respond.uncheck();
                expect(check_Respond).not.toBeChecked(); //assert
            }
            if (initiate) {
                await check_Initiate.check();
                expect(check_Initiate).toBeChecked(); //assert
            } else {
                await check_Initiate.uncheck();
                expect(check_Initiate).not.toBeChecked(); //assert
            }
        }
        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //Registration 
    async registration_Check(org_name, registration) {

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

        const check_Registration = await pageFixture.page.locator("(//input[@id='write'])[2]");


        //Registration
        if (registration) {
            await check_Registration.check();
            expect(check_Registration).toBeChecked();
        } else {
            await check_Registration.uncheck();
            expect(check_Registration).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //Manage user
    async manageUser_Check(org_name, manage_User) {

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
        const check_Manage_User = await pageFixture.page.locator("(//input[@id='write'])[3]");

        //Manage User
        if (manage_User) {
            await check_Manage_User.check();
            expect(check_Manage_User).toBeChecked();
        } else {
            await check_Manage_User.uncheck();
            expect(check_Manage_User).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //Format D
    async formatD_Check(org_name, format_D) {

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
        const check_Format_D = await pageFixture.page.locator("(//input[@id='write'])[6]");

        //Format D
        if (format_D) {
            await check_Format_D.check();
            expect(check_Format_D).toBeChecked();
        } else {
            await check_Format_D.uncheck();
            expect(check_Format_D).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }
    //LOA Generation 
    async loaGeneration_Check(org_name, lOA_Generation) {

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

        //Rights
        const SelectAll = await pageFixture.page.locator("//input[@id='writechbk']");
        //select All

        const check_LOA_Generation = await pageFixture.page.locator("(//input[@id='write'])[7]");


        //LOA Generation 
        if (lOA_Generation) {
            await check_LOA_Generation.check();
            expect(check_LOA_Generation).toBeChecked();
        } else {
            await check_LOA_Generation.uncheck();
            expect(check_LOA_Generation).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //Award Check
    async award_Check(org_name, award) {

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
        const check_Award = await pageFixture.page.locator("(//input[@id='write'])[8]");


        //Award
        if (award) {
            await check_Award.check();
            expect(check_Award).toBeChecked();
        } else {
            await check_Award.uncheck();
            expect(check_Award).not.toBeChecked();
        }
        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //respond check 
    async respond_Check(org_name, respond) {

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
        const check_Respond = await pageFixture.page.locator("(//input[@id='write'])[10]");


        //Respond
        if (respond) {
            await check_Respond.check();
            expect(check_Respond).toBeChecked();
        } else {
            await check_Respond.uncheck();
            expect(check_Respond).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //initiate Check
    async initiate_Check(org_name, initiate) {

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

        //Rights
        const SelectAll = await pageFixture.page.locator("//input[@id='writechbk']");
        //select All
        const check_Initiate = await pageFixture.page.locator("(//input[@id='write'])[9]");


        if (initiate) {
            await check_Initiate.check();
            expect(check_Initiate).toBeChecked();
        } else {
            await check_Initiate.uncheck();
            expect(check_Initiate).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }

    //select all
    async selectAll_Check(org_name, selectAll) {

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
        const check_Format_D = await pageFixture.page.locator("(//input[@id='write'])[6]");
        const check_LOA_Generation = await pageFixture.page.locator("(//input[@id='write'])[7]");
        const check_Award = await pageFixture.page.locator("(//input[@id='write'])[8]");
        const check_Initiate = await pageFixture.page.locator("(//input[@id='write'])[9]");
        const check_Respond = await pageFixture.page.locator("(//input[@id='write'])[10]");

        if (selectAll) {
            await SelectAll.check();
            expect(SelectAll).toBeChecked();
        }
        else {
            await SelectAll.uncheck();
            expect(SelectAll).not.toBeChecked();
        }

        await pageFixture.page.waitForTimeout(3000);
        //Click the submit Button 
        await pageFixture.page.locator("//button[contains(text(),'Submit')]").click();

        //Assert Part 
        //Required previliges have been assigned to the user
        await assert.assertToContains("//*[contains(text(),'Required previliges have been assigned to the user')]", "Required previliges have been assigned to the user");
        await pageFixture.page.waitForTimeout(5000);
    }


}



module.exports = Manage_Member;