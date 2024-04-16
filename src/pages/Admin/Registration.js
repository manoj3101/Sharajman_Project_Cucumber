const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");
const data = require("../../helper/utils/data.json");
const SignUp = require('../Admin/SignUp');
const admin_data = require('../../helper/utils/admin_data.json');
const Wrapper = require('../../helper/wrapper/assert');
const RandomFunction = require('../../helper/utils/RandomFunction');

//Object Instance
const randomFunction = new RandomFunction();
const assert = new Wrapper();


//Object Instance
const signUp = new SignUp();

class Registration {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //Variable 
    //NORA details
    noar_id = (Math.floor(Math.random() * 900000) + 100000).toString(); // Random 6-digit number

    //Basic Details
    // Org_Short_Name = signUp.org_name.substring(0, 3).toUpperCase(); //Organization Short name (should be 3 to 10 char)
    Correspondence_Address = "19, B2, Emporio, 33, 10th Ave, Ashok Nagar, Chennai, Tamil Nadu 600083";
    City = "Chennai";
    Pin_Code = "600083";
    Country = "India";
    State = "Tamil Nadu(TN)";
    CIN = randomFunction.generateRandomCIN(); // Fill the CIN Field 
    PAN = randomFunction.generateRandomPAN(); // Fill the pan Field 
    GSTIN = randomFunction.generateRandomGSTIN(); // Fill GSTIN Field 
    TELEPHONE_NO = randomFunction.generateRandomTelephoneNo() // Fill the Telephone Number
    Nationality = "INDIAN"; //To fill the Nationality
    companyDate = "2010-02-10"; //Comapany started date
    BranchName = "Ashok Nagar"; //Branch Name
    // AccountHolderName = signUp.Name; //Account Holder Name
    AccountNumber = (Math.floor(Math.random() * 90000000000) + 10000000000).toString(); //Account Number 
    IFSC = randomFunction.generateRandomIFSC(); //11 Digit 
    MICR = (Math.floor(Math.random() * 900000000) + 100000000).toString();



    //-------------------------------------------------------------------------------------------------------------------------

    //locators or xpaths
    //preregistration 
    //NORA details
    nora_yes = "//label[@for='yes']";
    nora_No = "//label[@for='no']";
    noar_ID = "//input[@id='noar_id']";
    noar_agree = "//input[@id='chb_agree']";
    proceed_register = "//button[contains(text(),'Proceed to registration')]";

    //Basic Details
    org_name = "//input[@id='orgname']";
    org_short_name = "//input[@id='orgcode']";
    address = "//textarea[@id='address']";
    city = "(//input[@id='city'])[1]";
    pincode = "(//input[@id='pincode'])[1]";
    country = "(//select[@id='country'])[1]"; //value=1  India   //value=43  Sri Lanka 
    state = "(//select[@id='state'])[1]"; //value =32   Tamil Nadu(TN) 

    correspond_address = "//input[@id='inlineCheckbox1']";

    cin = "//input[@id='cin']";  //A12345BC6789DEF123456   21character
    pan = "//input[@id='panno']";  //ABCDE1234F   //10 character
    gstin = "//input[@name='gstno']";
    telephoneNo = "//input[@name='telephone_no']";
    nationality = "//input[@id='nationality']";  //INDIAN
    natureOfApplicant = "//select[@name='natureofapplicant']";  //value="COMPANY" |value="LLP"|value="PRIVATELIMITED"| value="PARTNERSHIP" | value="PSU"| value="STATUTORY BODY"| value="SOCIETY" | value="TRUST"|value="SECTION 8 COMPANY" |value="INDIVIDUAL"
    dateOfCompanyIncorporation = "//input[@formcontrolname='dateofregistration']"; //max="2024-02-25" 
    gst_type = "//select[@name='gst_type']"; //value="REGISTERED" | value="ZEROTAX"
    next = "//button[contains(text(),'Next')]";
    //next await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });


    //Connection Details
    discom_type = "//select[@id='discom_type']"; //value="PRI" | value="GOV"| value="DEEMEDDISTRIBUTION" | value="SEZ" | value="RAILWAY"
    maxinjcapacity = "//input[@id='maxinjcapacity']";
    maxdrawncap = "//input[@id='maxdrawncap']";
    RLDC = "//input[@formcontrolname='rldc_code']";
    POCZone = "//select[@id='poc_state_id']";  //value="null-32" == Tamil Nadu(TN) 
    //next button 

    //Bank Details
    bankName = "//select[@id='bankid']";  //value="1" to value="131" | Bank of India  value ="19"
    branchName = "//input[@id='branch']";
    accountHolderName = "//input[@id='accountname']";
    accountNumber = "//input[@id='accountnumber']";  //11 digit 
    IFSC_Code = "//input[@id='ifsccode']"; //11 digit 
    MICR_Code = "//input[@id='micrcode']"; //9 digit 
    //netx button 

    //Upload Documents
    address_upload = "//input[@id='formFile0']";
    CIN_upload = "//input[@id='formFile1']";
    GST_upload = "//input[@id='formFile2']";
    bank_account_upload = "//input[@id='formFile3']";
    pan_upload = "//input[@id='formFile4']";
    GST_Exemption_upload = "//input[@id='formFile5']";
    Other_Certificate_upload = "//input[@id='formFile6']";
    TAN_Certificate_upload = "//input[@id='formFile7']";
    submitRegistrationData = "(//button[@uisref='personal'])[2]";

    // By Registering to this platform, you accept our:
    Indemnity_Agreement = "(//input[@id='flexCheckChecked'])[1]";
    Platform_Membership_Agreement = "(//input[@id='flexCheckChecked'])[2]";
    Membership_Undertaking = "(//input[@id='flexCheckChecked'])[3]";

    //assert the alert message
    alertMessage = "//ngb-alert[@role='alert']"; //.textcontent()

    //-------------------------------------------------------------------------------------------------------------------------

    //NOAR Details
    async NOAR_Details(noar) {
        if (noar) {
            await pageFixture.page.waitForTimeout(3000);
            await pageFixture.page.check(this.nora_yes); //NOAR yes
            await pageFixture.page.locator(this.noar_ID).fill(this.noar_id); // Fill the NOAR ID
            await pageFixture.page.click(this.noar_agree); //Click the agree button
            await pageFixture.page.click(this.proceed_register); //Proceed Register
            console.log(`               ---NOAR DETAILS COMPELETED---               `);
        }
        else {
            await pageFixture.page.waitForTimeout(3000);
            // await pageFixture.page.check(this.nora_No); //NOAR No
            await pageFixture.page.click(this.proceed_register); //Proceed Register
            console.log(`               ---NOAR DETAILS COMPELETED---               `);
        }
    }

    //Basic Details
    async basic_Details(org_name, natureofapplicant, gsttype) {
        const Org_Short_Name = org_name.substring(0, 3).toUpperCase();
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.org_short_name).fill(Org_Short_Name) //org_short Name
        await pageFixture.page.locator(this.address).fill(this.Correspondence_Address); //Fillthe address
        await pageFixture.page.locator(this.city).fill(this.City); //Fill the city name
        await pageFixture.page.locator(this.pincode).fill(this.Pin_Code); //Fill the pincode
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.country).selectOption({ value: "1" }); //Select the country 
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.state).selectOption({ value: "32" }); //Select the state 
        await pageFixture.page.click(this.correspond_address, { timeout: 40000 }); //Click the check box for proceed with same address
        await pageFixture.page.locator(this.cin).fill(this.CIN); //Fill the CIN
        await pageFixture.page.locator(this.pan).fill(this.PAN); // Fill the pan Field 
        await pageFixture.page.locator(this.gstin).fill(this.GSTIN); //Fill the GSTIN field
        await pageFixture.page.locator(this.telephoneNo).fill(this.TELEPHONE_NO); //Fill the Telephone NUmnber 
        await pageFixture.page.locator(this.nationality).fill(this.Nationality); //Fill the Nationality
        await pageFixture.page.locator(this.natureOfApplicant).selectOption({ value: natureofapplicant }); //Nature of application 
        await pageFixture.page.locator(this.dateOfCompanyIncorporation).fill(this.companyDate); //Fill the company date 
        await pageFixture.page.locator(this.gst_type).selectOption({ value: gsttype }); //Select the GST TYPE 
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.click(this.next); //Click next to proceed the registration 
        console.log(`              ---BASIC DETAILS COMPELETED---              `);
    }


    // Connection Details
    async connection_Details(discomType, Max_Inj_Cap, Max_Draw_Cap) {
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.discom_type).selectOption({ value: discomType }); //Discom Type
        await pageFixture.page.locator(this.maxinjcapacity).fill(Max_Inj_Cap); //Max Injection Capacity
        await pageFixture.page.locator(this.maxdrawncap).fill(Max_Draw_Cap); //Max Drawal Capacity
        await pageFixture.page.locator(this.RLDC).fill("4567856"); //RLDC 
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.POCZone).selectOption({ value: "null-32" }); //value:"null-32"  Tamil Nadu(TN) 
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.click(this.next, { timeout: 40000 }); //Click next to proceed the registration 
        console.log(`            ---CONNECTION DETAILS COMPELETED---            `);
    }

    //Bank Details
    async bank_Details(name) {

        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator(this.bankName).selectOption({ value: "19" }); //Bnamk Name | Bank Of India 
        await pageFixture.page.locator(this.branchName).fill(this.BranchName); //Branch Name
        await pageFixture.page.locator(this.accountHolderName).fill(name); //Fill the Account Holder Name
        await pageFixture.page.locator(this.accountNumber).fill(this.AccountNumber); //Fill the Account Numnber
        await pageFixture.page.locator(this.IFSC_Code).fill(this.IFSC); //Fill the IFSC code
        await pageFixture.page.locator(this.MICR_Code).fill(this.MICR); //Fill the MIRC code
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.click(this.next, { timeout: 40000 }); //Click next to proceed the registration 
        console.log(`              ---BANK DETAILS COMPELETED---             `);
    }

    //Upload Documents
    async upload_Documents() {
        let filePath = "src/helper/utils/CFP.pdf";
        await pageFixture.page.waitForTimeout(3000);
        //Address Proof (Declaration On Letter Head)* ==> 8 Certificate
        await pageFixture.page.waitForSelector(this.address_upload);
        await pageFixture.page.locator(this.address_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //CIN Certificate*
        await pageFixture.page.waitForSelector(this.CIN_upload);
        await pageFixture.page.locator(this.CIN_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //GST Certificate*
        await pageFixture.page.waitForSelector(this.GST_upload);
        await pageFixture.page.locator(this.GST_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //Bank Account (Cancel Cheque)*
        await pageFixture.page.waitForSelector(this.bank_account_upload);
        await pageFixture.page.locator(this.bank_account_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //Pan Card*
        await pageFixture.page.waitForSelector(this.pan_upload);
        await pageFixture.page.locator(this.pan_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //GST Exemption*
        await pageFixture.page.waitForSelector(this.GST_Exemption_upload);
        await pageFixture.page.locator(this.GST_Exemption_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //Other Certificate
        await pageFixture.page.waitForSelector(this.Other_Certificate_upload);
        await pageFixture.page.locator(this.Other_Certificate_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        //TAN Certificate
        await pageFixture.page.waitForSelector(this.TAN_Certificate_upload);
        await pageFixture.page.locator(this.TAN_Certificate_upload).setInputFiles(filePath);
        await pageFixture.page.waitForTimeout(4000);
        console.log(`              ---UPLOAD DOCUMENT COMPELETED---              `);
        //Submit Registration
        await pageFixture.page.click(this.submitRegistrationData);

        //Assert the alertmsg Message 
        await assert.assertToContains("//*[contains(text(),'Request Submitted for approval')]","Request Submitted for approval");

        //Assert the alertmsg Message 
        await assert.assertToContains("//*[contains(text(),'Registration pending for approval')]","Registration pending for approval");

        await pageFixture.page.waitForTimeout(3000);

    }




}
module.exports = Registration;
