const { chromium, firefox, devices, msedge } = require('@playwright/test');
const data = require("../utils/data.json");
const { time } = require('console');

const options = {
    headless: false
};

module.exports.invokeBrowser = async () => {
    const browserType = data.browser.toLowerCase(); // Set the desired browser type

    switch (browserType) {
        case "chrome":
            console.log("Launching Chrome Browser");
            return await chromium.launch({ ...options, channel: 'chrome' });

        case "firefox":
            console.log("Launching Firefox Browser");
            return await firefox.launch(options);

        case "msedge":
            console.log("Launching Microsoft Edge Browser");
            return await chromium.launch({ ...options, channel: 'msedge' });

        default:
            throw new Error("Please set the proper browser!!!");
    }


};

// const browserTypes = ["chrome", "msedge"];

// async function launchBrowsers() {
//     const browserProcesses = [];

//     for (const element of browserTypes) {
//         browserProcesses.push(chromium.launch({ ...options, channel: element }));
//     }

//     await Promise.all(browserProcesses);
// }

// module.exports= launchBrowsers;