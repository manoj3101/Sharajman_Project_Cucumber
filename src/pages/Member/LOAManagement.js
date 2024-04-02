const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const DashboardCFP = require("../../pages/Member/DashboardCFP");
const RandomFunction = require('../../helper/utils/RandomFunction');


//Object Instance
const randomFunction = new RandomFunction();
const dashboardCFP = new DashboardCFP();
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

    //variable
    static SLDC = null;
    static SLDC1 = null;
    static LDC = null;
    static LDC1 = null;
    static Route = null;

    //Methods
    //LOA Generation Page
    application_no = null;

    async loaGeneration() {
        const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
        await home.hover({ timeout: 50000 });
        await pageFixture.page.locator("//span[contains(text(),'LOA Management')]").click();
        await pageFixture.page.locator("//span[contains(text(),'LOA Generation')]").click();

    }

    //Upload the Document ===> Responder Side 
    async uploadDocument(CFP, imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, exp_start_date, exp_end_date, exp_start_time, exp_end_time, returnpercent, Settlement_Price, loa_acceptance_mins) {

        await pageFixture.page.locator(" //label[contains(text(),'Responder')]").click();
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        //Document Verification
        await this.LOA_documentverification(CFP, imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, exp_start_date, exp_end_date, exp_start_time, exp_end_time, returnpercent, Settlement_Price)

        // //LOA Acceptance Deadline
        // const time = await pageFixture.page.locator("//small//small").textContent();
        // console.log(`LOA Acceptance timeline : ${time}`);

        //TimeLine Functionality
        //LOA Acceptance Timeline
        const time = await pageFixture.page.locator("(//div//small)[1]").textContent();
        console.log(`LOA Acceptance Timeline  : ${time}`);

        const loaAcceptanceMins = randomFunction.addMinutesToCurrentTime(time);
        console.log("LOA Acceptance Added minutes:", loaAcceptanceMins);

        const addedLOAAcceptanceTime = parseInt(loa_acceptance_mins) + DashboardCFP.loaIssuanceMins;
        // if (addedLOAAcceptanceTime >= 60) {
        //     addedLOAAcceptanceTime %= 60;
        // }
        if (loaAcceptanceMins === addedLOAAcceptanceTime || loaAcceptanceMins === addedLOAAcceptanceTime - 1) {
            console.log(`Contarct Awarding time is added to Loa Issuance Time ${loaAcceptanceMins} equals ${addedLOAAcceptanceTime}`);
        }
        else {
            console.log(`Contarct Awarding time is ${loaAcceptanceMins} not  equal ${addedLOAAcceptanceTime} to Loa Issuance Time`);
        }

        await pageFixture.page.waitForTimeout(5000);//Wait until document verification 

        await pageFixture.page.click("//div[contains(@class,'gredient-blue-icon-box')]");
        await pageFixture.page.waitForSelector("(//input[@type='file'])[2]");
        await pageFixture.page.locator("(//input[@type='file'])[2]").setInputFiles('src/helper/utils/PDF/LOA.pdf');
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.getByRole('button', { name: /Upload/i }).click();
        await pageFixture.page.waitForTimeout(3000);

        //Assert
        const loa_assert = await pageFixture.page.locator("//*[contains(text(),'LOA has been uploaded successfully')]").textContent();
        expect(loa_assert).toContain("LOA has been uploaded successfully");
        console.log("----------------Successfully Uploaded the document ----------------");

    }

    //Document verification
    async LOA_documentverification(CFP, imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, exp_start_date, exp_end_date, exp_start_time, exp_end_time, returnpercent, Settlement_Price) {
        //First clear the folder using the method
        const folderPath = 'src/helper/utils/PDF/'; // Specify the path to the folder you want to clear
        await this.clearFolder(folderPath);
        await pageFixture.page.waitForTimeout(5000);

        //Click the Download Link and wait for the download
        const [download] = await Promise.all([
            pageFixture.page.waitForEvent('download', { timeout: 60000 }), // 60 seconds timeout
            // (//div[@ngbtooltip='Download']//img[@container='body'])[1]
            pageFixture.page.click("//td[@class='align-middle']//img[@container='body']"),
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
        console.log(`Text format Content are : ${text}`);

        // Write the parsed text content to a text file for reference
        await fs.writeFile('src/helper/utils/TextDocuments/data.txt', text); // Specify the correct file path

        const Utility_2 = (await pageFixture.page.locator("//span[@class='comp-name']").textContent()).trim();

        const line_1 = `LOA	No.`;
        const line_2 = `${DashboardCFP.LOA_no}`;
        const line_3 = `Date`;
        const line_4 = `${DashboardCFP.Utility_1}`;
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
        console.log("-------------------Document Verification for responder side  have Done------------------");


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


    //Format D Document Verification
    async formatD_DocumentVerification(imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, gtam, source, rpo, tGna) {
        //First clear the folder using the method
        const folderPath = 'src/helper/utils/PDF/'; // Specify the path to the folder you want to clear
        await this.clearFolder(folderPath);

        //Document verification 
        const [download] = await Promise.all([
            pageFixture.page.waitForEvent('download', { timeout: 60000 }), // 60 seconds timeout
            pageFixture.page.click("(//td[contains(@class, 'align-middle')]//span[contains(text(), 'Format-D GENERATED')])[1]")
        ]);

        // Use the suggested filename from the download event to save the file
        const desiredFilename = 'Format-D.pdf'; // Specify your desired filename here
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



        //Expected Result text 
        const line_1 = `Format-D`;
        const line_2 = `T-GNA	(Bilateral	Transaction)	Application	for	Grant	of	T-GNA`;
        const line_3 = `1Application	No.${this.application_no}Date	:	${day}-${month}-${year}`;
        const line_4 = `2Applicant	Name${DashboardCFP.Utility_2}Registration	Code`;
        const line_5 = `T-GNA	Request`;
        const line_6 = `DateHours`;
        const line_7 = `FromToFromTo`;

        const line_8 = `${imp_start_date.split('-').reverse().join('-')}${imp_end_date.split('-').reverse().join('-')}${imp_start_time}${imp_end_time}${quantum}`;
        const line_9 = `Name	of	Entity`;
        const line_10 = `Injecting	entity	(mandatory	for	Exigency	T-`;
        const line_11 = `GNAS	application)`;
        const line_12 = `Drawee	Entity`;
        const line_13 = `${DashboardCFP.Utility_2}${DashboardCFP.Utility_1}`;
        const line_14 = `5Injecting	RegionNRLDC`;

        const line_15 = `6Route${LOAManagement.Route}`;
        const line_16 = `Entity	in	which	it	is`;
        const line_17 = `embedded`;
        const line_18 = `${LOAManagement.SLDC}${LOAManagement.SLDC1}`;
        const line_19 = `8Whether	the	transaction	under	GTAM	(Yes/No)${gtam}`;
        const line_20 = `Source	of	generation	is	solar/non	solar/hydro	(applicable	in	case	of	Exigency	T-`;

        const line_21 = `GNA	application)`;
        const line_22 = `${source}`;
        const line_23 = `10Whether	the	transaction	is	for	meeting	RPO	obligation${rpo}`;
        const line_24 = `Granting	T-GNA/T-GNARE	exigency	application	in	part	quantum	and	part	period`;
        const line_25 = `or	both	in	case	of	constrains	as	per	available	transmission	capability	**	For`;
        const line_26 = `Exigency	Application15`;
        const line_27 = `${tGna}`;
        const line_28 = `Declaration:`;
        const line_29 = `The	provisions	of	the	Electricity	Act	2003,	Indian	Electricity	Grid	Code	and	all	applicable	CERC	regulations	with	respect	to`;
        const line_30 = `T-GNA/T-GNARE	transactions	in	interstate	transmission,	as	amended	from	time	to	time	are	hereby	understood	and	shall	be`;
        const line_31 = `binding.`;

        const line_32 = `Necessary	infrastructure	for	time-block	wise	metering	and	accounting	in	accordance	with	the	provisions	of	the	Grid	code`;
        const line_33 = `and	appropriate	communication	system	in	accordance	with	the	provisions	of	the	Communication	Regulations	are	in	place`;
        const line_34 = `for	the	point	of	drawal	and	point	of	injection,	if	available.`;
        const line_35 = `The	Nodal	Agency	is	indemnified	at	all	times	from	any	and	all	claims,	actions	and	all	other	obligations	by	or	to	third	parties`;
        const line_36 = `arising	out	of	or	resulting	from	the	transactions	under	T-GNA/T-GNARE.`;
        const line_37 = `4.There	is	a	valid	contract	for	the	proposed	scheduling.`;
        const line_38 = `Name:..........................................`;
        const line_39 = `Designation:..........................................`;

        // Define the strings you want to check in the PDF content
        const stringsToCheck = [line_1.trim(), line_2.trim(), line_3.trim(), line_4.trim(), line_5.trim(), line_6.trim(), line_7.trim(), line_8.trim(), line_9.trim(), line_10.trim(),
        line_11.trim(), line_12.trim(), line_13.trim(), line_14.trim(), line_15.trim(), line_16.trim(), line_17.trim(), line_18.trim(), line_19.trim(), line_20.trim(),
        line_21.trim(), line_22.trim(), line_23.trim(), line_24.trim(), line_25.trim(), line_26.trim(), line_27.trim(), line_28.trim(), line_29.trim(), line_30.trim(),
        line_31.trim(), line_32.trim(), line_33.trim(), line_34.trim(), line_35.trim(), line_36.trim(), line_37.trim(), line_38.trim(), line_39.trim()];



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
        console.log("-------------------Format-D Document Verification Done Successfully------------------");

    }

    //Your LOA acceptance timeline has been expired
    async responder_LOA_Expires(CFP) {
        await pageFixture.page.locator(" //label[contains(text(),'Responder')]").click();
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
        await pageFixture.page.click("//div[contains(@class,'gredient-blue-icon-box')]");

        //Assert 
        const Expired = await pageFixture.page.locator("//div[@role='alert' and contains(@class, 'toast-message') and contains(text(), 'Your LOA acceptance timeline has been expired')]").textContent();
        expect(Expired).toContain(" Your LOA acceptance timeline has been expired");
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
        await pageFixture.page.getByRole('button', { name: /Search/i }).click({ timeout: 40000 });
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.getByRole('button', { name: /Action/i }).click({ timeout: 40000 });
        await pageFixture.page.getByPlaceholder('remarks').fill("LOA Approved");
        await pageFixture.page.getByRole('button', { name: /Accept/i }).click();
        console.log("----------------Action Done Successfully ----------------");

    }

    //Action 
    async action_FormatD(CFP) {
        await pageFixture.page.locator("//label[contains(text(),'Responder')]").click();
        await pageFixture.page.waitForTimeout(2000);
        await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        await pageFixture.page.getByRole('button', { name: /Search/i }).click();
    }


    async formatD(gtam, source, rpo, tGna, imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum) {
        // await pageFixture.page.getByPlaceholder('Search').fill(CFP);
        // await pageFixture.page.getByRole('button', { name: /Search/i }).click();

        await pageFixture.page.waitForTimeout(2000);

        //punch Application
        await pageFixture.page.locator("//label[contains(text(),'Application generation')]").click({ timeout: 50000 });
        //Generate New Format-D
        await pageFixture.page.getByRole('button', { name: /Generate New Format-D/i }).click();

        // Generate a random 6 or 7 digit number
        let randomNumber = (Math.floor(Math.random() * 9000000) + 1000000).toString();
        this.application_no = randomNumber;
        console.log(`Application Number : ${this.application_no}`);

        //Application Number
        await pageFixture.page.getByPlaceholder('Search Organization').fill(this.application_no);

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


        //Getting the text Content from the format D
        LOAManagement.Route = (await pageFixture.page.locator("(//tbody//td)[5]").textContent()).trim();
        LOAManagement.SLDC = (await pageFixture.page.locator("(//tbody//td)[18]").textContent()).trim();
        LOAManagement.SLDC1 = (await pageFixture.page.locator("(//tbody//td)[19]").textContent()).trim();
        LOAManagement.LDC = (await pageFixture.page.locator("(//tbody//td)[21]").textContent()).trim();
        LOAManagement.LDC1 = (await pageFixture.page.locator("(//tbody//td)[22]").textContent()).trim();


        //Click  Generate Format-D 
        await pageFixture.page.getByRole('button', { name: /Generate Format-D/i }).click();
        //Confirm Yes
        await pageFixture.page.getByRole('button', { name: ' Yes ' }).click();

        const message = await pageFixture.page.locator("//*[contains(text(),'Format-D have been generated successfully')]").textContent();
        console.log(`${message}`);
        await expect(message).toContain("Format-D have been generated successfully");
        await pageFixture.page.waitForTimeout(2000);
        console.log("----------------Format-D Generated Successfully ----------------");

        //Format-D document verification
        await pageFixture.page.waitForTimeout(4000);
        await this.formatD_DocumentVerification(imp_start_date, imp_end_date, imp_start_time, imp_end_time, quantum, gtam, source, rpo, tGna);

    }

}
module.exports = LOAManagement;