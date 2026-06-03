// 2026-06-02

import { OptionValue, TestFunction, UnitTestResult } from "./types";

class McTest {
    private unitTestPassed = 0;
    private unitTestFailed = 0;
    private unitTestTotal = 0;
    private readonly testName: string;
    private readonly testFunction: TestFunction | null;

    constructor(options: OptionValue) {
        this.testName = options.name ? options.name : 'Unknown';
        this.testFunction = options.testFunc ? options.testFunc : null;
    }

    // update unitTest values

    // assert equals
    assertEquals(expr: any, result: any, message?: string): string {
        try {
            if (expr === result) {
                console.log('Passed');
                this.unitTestPassed += 1;
                return 'Passed';
            } else {
                console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
                this.unitTestFailed += 1;
                return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
            }
        } catch (e) {
            console.error(e.message);
            console.log('======================');
            console.dir(e);
            this.unitTestFailed += 1;
            return '';
        }
    }

    // assert not equals
    assertNotEquals(expr: any, result: any, message?: string): string {
        try {
            if (expr !== result) {
                console.log('Passed');
                this.unitTestPassed += 1;
                return 'Passed';
            } else {
                console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
                this.unitTestFailed += 1;
                return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
            }
        } catch (e) {
            console.error(e.message);
            console.log('======================');
            console.dir(e);
            this.unitTestFailed += 1;
            return '';
        }
    }

    // assert strict equals => deep equality check through stringified values
    assertStrictEquals(expr: any, result: any, message?: string): string {
        try {
            if (JSON.stringify(expr) === JSON.stringify(result)) {
                console.log('Passed');
                this.unitTestPassed += 1;
                return 'Passed';
            } else {
                console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
                this.unitTestFailed += 1;
                return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
            }
        } catch (e) {
            console.error(e.message);
            console.log('======================');
            console.dir(e);
            this.unitTestFailed += 1;
            return '';
        }
    }

    // assert not strict equals => deep equality check through stringified values
    assertNotStrictEquals(expr: any, result: any, message?: string): string {
        try {
            if (JSON.stringify(expr) !== JSON.stringify(result)) {
                console.log('Passed');
                this.unitTestPassed += 1;
                return 'Passed';
            } else {
                console.error(`Failed: ${message} =>  Expected ${result}, Got ${expr}`);
                this.unitTestFailed += 1;
                return `Failed: ${message} =>  Expected ${result}, Got ${expr}`;
            }
        } catch (e) {
            console.error(e.message);
            console.log('======================');
            console.dir(e);
            this.unitTestFailed += 1;
            return '';
        }
    }

    get unitTestResult(): UnitTestResult {
        return {
            unitTestPassed: this.unitTestPassed,
            unitTestFailed: this.unitTestFailed,
            unitTestTotal : this.unitTestTotal,
        }
    }

    runTest(): UnitTestResult {
        console.log(`Running Test: ${this.testName}`);
        console.log('======================================================');
        if (this.testFunction) {
            this.testFunction();
        } else {
            console.error('No test task/function specified - Test skipped!!!');
        }
        // update overall test result
        this.unitTestTotal = this.unitTestPassed + this.unitTestFailed;
        // summary report
        console.log(`Summary for Test: ${this.testName}: `);
        console.log('Test Passed: ', this.unitTestPassed);
        console.error('Test Failed: ', this.unitTestFailed);
        console.log('Total Test: ', this.unitTestTotal);
        // return test result
        return this.unitTestResult;
    }
}

// factory function to create a new McTest instance
export function newTest(options: OptionValue): McTest {
    return new McTest(options);
}

// testResult function captures overall testing results for all the unit tests
export function testResult(params: Array<UnitTestResult>): void {
    let testPassed = 0, testFailed = 0, testTotal = 0;
    params.forEach(param => {
        testPassed += param.unitTestPassed;
        testFailed += param.unitTestFailed;
        testTotal += param.unitTestTotal;
    });
    console.log('============================');
    console.log('All Tests Summary Stats:');
    console.log('============================');
    console.log('Test Passed: ', testPassed);
    console.error('Test Failed: ', testFailed);
    console.log('Total Test: ', testTotal);
    console.log('***** Test Completed *****');
}
