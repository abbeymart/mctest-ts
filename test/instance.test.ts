// 2026-06-02

import {
    UnitTestResult, ValueType
} from "../src";
import { newTest, testResult } from "../src/mcTestClass";

// test-data
const result1 = 100,
    result2 = 200,
    result3 = {"Name": "Abi"},
    result4 = {"location": "Abi"};

function Expr1(): number {
    return 100
}

function Expr2(): number {
    return 200
}

function Expr3(): ValueType {
    return result3
}

function Expr4(): ValueType {
    return result4
}

const results: Array<UnitTestResult> = [];

(async () => {

    const test1 = newTest({
        name    : "Test Series 100: ",
        testFunc: () => {
            test1.assertEquals(Expr1(), result1, "Expected outcome: 100")
            test1.assertEquals(Expr2(), result2, "Expected outcome: 200")
            test1.assertNotEquals(Expr1(), result2, "Expected expr and result not equals")
            test1.assertNotEquals(Expr2(), result1, "Expected expr and result not equals")
            test1.assertStrictEquals(Expr3(), result3, "Expected outcome: strictly equals")
            test1.assertStrictEquals(Expr4(), result4, "Expected outcome: strictly equals")
        },
    })
    const test1Result = test1.runTest();
    results.push(test1Result);

    const test2 = newTest({
        name    : "Test Series 200: ",
        testFunc: () => {
            test2.assertEquals(Expr1(), result1, "Expected outcome: 100")
            test2.assertEquals(Expr2(), result2, "Expected outcome: 200")
            test2.assertNotEquals(Expr1(), result2, "Expected expr and result not equals")
            test2.assertNotEquals(Expr2(), result1, "Expected expr and result not equals")
            test2.assertNotStrictEquals(Expr3(), result4, "Expected outcome: not strictly equals")
            test2.assertNotStrictEquals(Expr4(), result3, "Expected outcome: not strictly equals")
        },
    })
    const test2Result = test2.runTest();
    results.push(test2Result);

    testResult(results);

})();
