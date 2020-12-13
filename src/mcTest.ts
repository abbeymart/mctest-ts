/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-14
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: testing module functions
 */

// types
type TestFunction = () => void;

interface OptionValue {
    name?: string;
    testFunc?: TestFunction;
    before?: string;
    after?: string;
}

// Test counts
let unitTestPassed = 0;
let unitTestFailed = 0;
let passedTest = 0;
let failedTest = 0;

// Helper functions | TODO: include feature to write the test result/report to an output file

// delay/pause testing task
export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// assert equals
export function assertEquals(expr: any, result: any, message?: string): string {
    try {
        if (expr === result) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        } else {
            console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
            unitTestFailed += 1;
            failedTest += 1;
            return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
        }
    } catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}

// assert not equals
export function assertNotEquals(expr: any, result: any, message?: string): string {
    try {
        if (expr !== result) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        } else {
            console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
            unitTestFailed += 1;
            failedTest += 1;
            return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
        }
    } catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}

// assert strict equals => deep equality check through stringified values
export function assertStrictEquals(expr: any, result: any, message?: string): string {
    try {
        if (JSON.stringify(expr) === JSON.stringify(result)) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        } else {
            console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
            unitTestFailed += 1;
            failedTest += 1;
            return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
        }
    } catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}

// assert not strict equals => deep equality check through stringified values
export function assertNotStrictEquals(expr: any, result: any, message?: string): string {
    try {
        if (JSON.stringify(expr) !== JSON.stringify(result)) {
            console.log('Passed');
            unitTestPassed += 1;
            passedTest += 1;
            return 'Passed';
        } else {
            console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
            unitTestFailed += 1;
            failedTest += 1;
            return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
        }
    } catch (e) {
        console.error(e.message);
        console.log('======================');
        console.dir(e);
        unitTestFailed += 1;
        failedTest += 1;
        return '';
    }
}

// TODO: test Expr-includes/excludes-result and other testing scenarios/features

// Access params: test-name, test-functions, test-options
export async function mcTest(options: OptionValue) {
    try {
        const testName = options && options.name ? options?.name : 'Unknown';
        const testFunction = options && options.testFunc ? options?.testFunc : null;
        console.log(`Running Test: ${testName}`);
        console.log('======================================================');
        if (testFunction) {
            await testFunction();
        } else {
            console.error('No test task/function specified - Test skipped!!!');
        }
    } catch (e) {
        console.error(e.message);
        console.log('=====================================');
        console.dir(e);
    } finally {
        console.log(`Summary for Test: ${options && options.name ? options?.name : 'Unknown'}: `);
        console.log('Test Passed: ', unitTestPassed);
        console.error('Test Failed: ', unitTestFailed);
        console.log('Total Test: ', unitTestPassed + unitTestFailed);
        // Reset unit test counts
        unitTestPassed = 0;
        unitTestFailed = 0;
    }
}

export async function postTestResult() {
    console.log('============================');
    console.log('All Tests Summary Stats:');
    console.log('============================');
    console.log('Test Passed: ', passedTest);
    console.error('Test Failed: ', failedTest);
    console.log('Total Test: ', passedTest + failedTest);
    // reset test counts
    passedTest = 0;
    failedTest = 0;
    console.log('***** Test Completed *****');
}
