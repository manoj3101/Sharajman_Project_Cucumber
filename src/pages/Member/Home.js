const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");

class Home {

  //Constructor
  // constructor(page){
  //     this.page =page;
  // }

  async clickCallForPropsal() {

    await pageFixture.page.waitForTimeout(3000);

    await pageFixture.page.locator("(//*[contains(text(),'Call for Proposal')])[1]").click({ timeout: 60000 });

    await pageFixture.page.click("//*[contains(text(),'Power Swapping')]");

    await pageFixture.page.waitForTimeout(2000);
  }


  //Check the Registration status

  async clickRegistration(){
    const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[2]");
    await home.hover({ timeout: 50000 });
    await pageFixture.page.locator("//span[contains(text(),'Registration')]").click();
  }

  async checkRegistration(){
      //Assert the alertmsg Message 
      const approved_assert = await pageFixture.page.locator("//ngb-alert[@role='alert']").textContent();
      expect(approved_assert).toContain("Registration data is approved");
      console.log(`✔ ${approved_assert}`); 
  }

  async clickHome(){
    const home = await pageFixture.page.locator("(//span[contains(@class,'m-icon ng-star-inserted')])[1]");
    await home.hover({ timeout: 40000 });
    await pageFixture.page.locator("//span[contains(text(),'Home')]").click({ timeout: 50000 });
    await pageFixture.page.waitForTimeout(1000);
  }


}



module.exports = Home;