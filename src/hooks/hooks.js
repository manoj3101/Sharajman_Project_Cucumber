const { BeforeAll, AfterAll, Before, After, BeforeStep, Status } = require("@cucumber/cucumber");
const { chromium, Page, Browser, Context, BrowserContext, firefox, msedge } = require('@playwright/test');
const { invokeBrowser } = require("../helper/browsers/browserManager");
const pageFixture = require("./pageFixture");
const launchBrowsers = require("../helper/browsers/browserManager");


let page = Page;
let browser = Browser;
let context = BrowserContext;

BeforeAll(async function () {
    //Lauching the berowser
    browser = await invokeBrowser();
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;

});



After(async function ({ pickle, result }) {

    // if (result?.status == Status.FAILED) {
    //     const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    //     await this.attach(img,"image/png");
    // }
    const img = await pageFixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    await this.attach(img, "image/png");

    // Close page and browser
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function () {
    // Close browser
    await browser.close();
});