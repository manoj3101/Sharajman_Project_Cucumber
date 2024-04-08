const fs = require('fs');


function readCucumberReport(callback, fail) {
    fs.readFile('./test-results/cucumber-report.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            callback(err, null);
            return;
        }

        // Parse the JSON data
        const jsonData = JSON.parse(data);

        const testCases = jsonData.map(feature => ({
            name: feature.name,
            scenarios: feature.elements.map(element => ({
                name: element.name,
                scenarioStatus: element.steps[0].result.status,
                steps: element.steps.map(step => ({
                    name: step.name,
                    stepStatus: step.result.status,
                    duration: step.result.duration,
                    errorMessage: step.result.error_message
                }))
            }))
        }));


        callback(null, { testCases });
    }
    )
}
module.exports = { readCucumberReport }
