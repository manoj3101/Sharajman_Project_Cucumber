let opt = [
    '--require ./src/tests/steps/*/*.js', // Specify our steps files location
    '--require ./src/hooks/hooks.js', // Specify our hooks files location
    // '--dry-run'

].join(' ')

let run_features = [
    './src/tests/features/*/*.feature', // Specify our feature files location
    '--format html:test-results/Cucumber_Report.html',
    '--format json:test-results/cucumber-report.json'
].join(' ');


let sanity_run1 = [
    // 'src/tests/features/EXPORT/TC_EX_011.feature',
    // './src/tests/features/ADMIN/TC_AD_001.feature',
    // './src/tests/features/EXPORT/TC_EX_005.feature', // Export => src/tests/steps/EXPORT/*.feature
    './src/tests/features/IMPORT/TC_IM_005.feature', // Import => src/tests/steps/IMPORT/*.feature
    '--format html:test-results/Cucumber_Report.html', //HTML Report
    '--format json:test-results/cucumber-report.json', //Json Report

].join(' ');

// Ensure proper escaping of quotes for JSON options and join the array elements with a space
const options1 = `${opt} ${run_features}`;
const options2 = `${opt} ${sanity_run1}`;

// Export the configuration for the test runner
module.exports = {
    test_runner: options2,
    parallel: 1,
};