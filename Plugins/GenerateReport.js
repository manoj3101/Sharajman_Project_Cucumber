const readCucumberReport = require('./ReadJson');
const fs = require('fs');
const ejs = require('ejs');

let passCount = 0;
let failCount = 0;
let skipCount = 0;
let failedTestCases = [];
let passedTestCases = [];
let skippedTestCases = [];

let startDateAndTime;
let endDateAndTime;
let totalTimeInMinutes;
let testType = "Not Mentioned";
let browserName = "Chrome as Default";
let url = "Not Mentioned";

function generateHTMLReport() {
    readCucumberReport.readCucumberReport((err, data, ) => {
        if (err) {
            console.error("Error reading cucumber report:", err);
            return;
        }

        fs.readFile('./Plugins/Template.html', 'utf8', (err, htmlTemplate) => {
            if (err) {
                console.error("Error reading HTML file:", err);
                return;
            }
            const { testCases } = data;
            const testCaseCount = testCases.length;
            
            testCases.forEach(testCase => {
                let allPassed = true;
                let anyFailed = false;

                testCase.scenarios.forEach(scenario => {
                    scenario.steps.forEach(step => {
                        if (step.stepStatus === 'failed') {
                            anyFailed = true;
                        } else if (step.stepStatus !== 'passed') {
                            allPassed = false;
                        }
                    });
                });

                if (anyFailed) {
                    failCount++;
                    failedTestCases.push({
                        name: testCase.name,
                        scenarios: testCase.scenarios.map(scenario => ({
                            name: scenario.name,
                            steps: scenario.steps.map(step => ({
                                results: step.results ? step.results.filter(result => result.status === 'failed').map(result => ({
                                    errorMessage: result.error_message
                                })) : []
                            }))
                        }))
                    });

                    // Logging error messages
                    failedTestCases.forEach(testCase => {
                        testCase.scenarios.forEach(scenario => {
                            name: scenario.name,
                                scenario.steps.forEach(step => {
                                    step.results.forEach(result => {
                                        const trimmedErrorMessage = result.errorMessage.substring(0, 300);
                                        console.log("errorMessage: " + trimmedErrorMessage);
                                    });
                                });
                        });
                    });
                }

                else if (allPassed) {
                    passCount++;
                    passedTestCases.push(testCase.name);
                } else {
                    skipCount++;
                    skippedTestCases.push(testCase.name);
                }
            });

            console.log("Pass Count:", passCount);
            console.log("Fail Count:", failCount);
            console.log("Skip Count:", skipCount);
            console.log("Failed Test Cases:", failedTestCases);
            console.log("Passed Test Cases:", passedTestCases);
            console.log("Skipped Test Cases:", skippedTestCases);

            const renderedHtml = ejs.render(htmlTemplate, {
                testCases,
                testCaseCount,
                passCount,
                failCount,
                skipCount,
                startDateAndTime,
                endDateAndTime,
                totalTimeInMinutes,
                testType,
                failedTestCases,
                browserName,
                url,
            });


            fs.writeFile('./test-results/Automation_Report.html', renderedHtml, err => {
                if (err) {
                    console.error("Error writing rendered HTML file:", err);
                    return;
                }
                console.log("Report Generated successfully.");
            });
        });
    }
    )
}
function onTestStart(testtype, browsername, environmentName) {
    startDateAndTime = getDateAndTime();
    console.log("startDateAndTime:", startDateAndTime);
    testType = testtype;
    browserName = browsername;
    url = environmentName;
}

function onTestEnd() {
    endDateAndTime = getDateAndTime();
    console.log("endDateAndTime:", endDateAndTime);
    totalTimeInMinutes = calculateTotalTime(startDateAndTime, endDateAndTime).toFixed(2);
    console.log("Total time taken:", totalTimeInMinutes, "minutes");

}

function getDateAndTime() {
    const currentDate = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Use 24-hour format
    };

    const formattedDateTime = currentDate.toLocaleString(undefined, options);
    return formattedDateTime;
}

function calculateTotalTime(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const timeDifference = (end - start) / (1000 * 60);
    return timeDifference;
}

module.exports = { generateHTMLReport, onTestStart, onTestEnd };
