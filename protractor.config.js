const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const SpecReporter = require('jasmine-spec-reporter');
const webpackConfig = require('./webpack.config');
const args = require('yargs').argv;
const e2eBaseFolder = './test/e2e';
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: `http://localhost:${webpackConfig.devServer.port}`,
    framework: 'jasmine2',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: [`${e2eBaseFolder}/specs/\*.spec.js`],

    onPrepare: () => {
        // support ES6, need to put this line in onPrepare to make line number
        // in error report correct
        require('babel-core/register'); // eslint-disable-line
        const helper = require(e2eBaseFolder+'/helper'); // eslint-disable-line
        browser._BasePageObject = helper.BasePageObject;
        browser._ = new helper.E2EHelper();
        if (!args.ci) {
            // screenshot reporter
            jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
                dest: `${e2eBaseFolder}/screenshots`,
                filename: 'e2e-report.html',
                captureOnlyFailedSpecs: true,
                reportOnlyFailedSpecs: false,
                pathBuilder: (currentSpec) => {
                    // TODO: can not get browser name due to
                    // https://github.com/mlison/protractor-jasmine2-screenshot-reporter/issues/4
                    return currentSpec.description.replace(/[ :]/g, '-');
                }
            }));
        }
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all', displayFailuresSummary: false}));
        beforeEach(() => {
            // add custom matchers
            jasmine.addMatchers(helper.customMatchers);
        });
    },
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 600 * 1000,
        // remove ugly protractor dot reporter
        print: () => {}
    }
};
