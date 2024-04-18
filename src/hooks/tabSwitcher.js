const { chromium, firefox, context } = require("@playwright/test");
const pageFixture = require("./pageFixture");

class tabSwitcher {
    async switchToTab(url) {

        await pageFixture.page.waitForTimeout(4000);
        const allPages = await pageFixture.page.context().pages();
        for (const page of allPages) {
            if ((await page.url()).includes(url)) {
                // console.log("  URL :" + await pageFixture.page.url());
                pageFixture.page = page;
                await pageFixture.page.bringToFront();
            }
        }
        // throw new Error(`Tab with URL ${url} not found.`);
    }
}

module.exports = tabSwitcher;