const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");


class Registration {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    //locators or xpaths

    //preregistration 
    //NORA details
    Nora_yes = "//label[@for='yes']";
    Nora_No = "//label[@for='no']";
    proceed_register = "//button[contains(text(),'Proceed to registration')]";

    //Basic Details
    org_name = "//input[@id='orgname']";
    org_short_name = "//input[@id='orgcode']";
    address = "//textarea[@id='address']";
    city = "(//input[@id='city'])[1]";
    pincode = "(//input[@id='pincode'])[1]";
    country = "(//select[@id='country'])[1]"; //value=1  India   //value=43  Sri Lanka 
    state = "(//select[@id='state'])[1]"; //va;ue=32   Tamil Nadu(TN) 

    correspond_address = "//input[@id='inlineCheckbox1']";

    cin = "//input[@id='cin']";  //A12345BC6789DEF123456   21character
    pan = "//input[@id='panno']";  //ABCDE1234F   //10 character
    GSTIN = "//input[@name='gstno']";
    TelephoneNo = "//input[@name='telephone_no']";
    nationality = "//input[@id='nationality']";  //INDIAN
    natureOfApplicant = "//select[@name='natureofapplicant']";  //value="COMPANY" |value="LLP"|value="PRIVATELIMITED"| value="PARTNERSHIP" | value="PSU"| value="STATUTORY BODY"| value="SOCIETY" | value="TRUST"|value="SECTION 8 COMPANY" |value="INDIVIDUAL"
    dateOfCompanyIncorporation = "//input[@formcontrolname='dateofregistration']"; //max="2024-02-25" 
    gst_type = "//select[@name='gst_type']"; //value="REGISTERED" | value="ZEROTAX"
    next = "//button[contains(text(),'Next')]";
    //next await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });


    //Connection Details
    discom_type="//select[@id='discom_type']"; //value="PRI" | value="GOV"| value="DEEMEDDISTRIBUTION" | value="SEZ" | value="RAILWAY"
    maxinjcapacity= "//input[@id='maxinjcapacity'];";
    maxdrawncap= "//input[@id='maxdrawncap']";
    POCZone= "//select[@id='poc_state_id']";  //value="null-32" ==Tamil nadu
    //next button 


    //Bank Details
    bankName="//select[@id='bankid']";  //value="1" to value="131"
    branchName= "//input[@id='branch']";
    accountHolderName="//input[@id='accountname']";
    accountNumber="//input[@id='accountnumber']";  //11 digit 
    IFSC_Code="//input[@id='ifsccode']"; //11 digit 
    MICR_Code="//input[@id='micrcode']"; //9 digit 
    //netx button 


    //Upload Documents
    address_upload="//input[@id='formFile0']";
    CIN_upload="//input[@id='formFile1']";
    GST_upload="//input[@id='formFile2']";
    bank_account_upload="//input[@id='formFile3']";
    pan_upload="//input[@id='formFile4']";
    GST_Exemption_upload="//input[@id='formFile5']";
    submitRegistrationData="(//button[@uisref='personal'])[2]";

    //assert the alert message
    alertMessage="//ngb-alert[@role='alert']"; //.textcontent()








}

//Telephone Number 
const teleNo = Math.floor(Math.random() * 1000000000); // Random 9-digit number
const TelephoneNo = teleNo.toString().padStart(10, '0');
console.log(TelephoneNo);

Name="(//span[@class='name'])[2]";
companyName = "//span[@class='comp-name']";