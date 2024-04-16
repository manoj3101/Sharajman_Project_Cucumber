const { test, expect } = require('@playwright/test');
const pageFixture = require("../../hooks/pageFixture");


class assert {
    // Constructor
    // constructor(page){
    //     this.page =page;
    // }

    async assertToContains(xpath, text) {
        const assert_msg = await pageFixture.page.locator(xpath).textContent({ timeout: 40000 });
        expect(assert_msg).toContain(text);
        console.log(`✔ ${assert_msg}\n`);
    }


}
module.exports = assert;