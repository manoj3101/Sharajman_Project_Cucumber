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


}



module.exports = Home;