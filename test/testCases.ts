/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-12-12
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: bookmark socket.io
 */

import {
    assertEquals,
    assertNotEquals,
    assertNotStrictEquals,
    assertStrictEquals,
    mcTest,
    postTestResult
} from "../src";

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

function Expr3(): object {
    return result3
}

function Expr4(): object {
    return result4
}


(async () => {

    await mcTest({
        name    : "Test Series 100: ",
        testFunc: () => {
            assertEquals(Expr1(), result1, "Expected outcome: 100")
            assertEquals(Expr2(), result2, "Expected outcome: 200")
            assertNotEquals(Expr1(), result2, "Expected expr and result not equals")
            assertNotEquals(Expr2(), result1, "Expected expr and result not equals")
            assertStrictEquals(Expr3(), result3, "Expected outcome: strictly equals")
            assertStrictEquals(Expr4(), result4, "Expected outcome: strictly equals")
        },
    });

    await mcTest({
        name    : "Test Series 200: ",
        testFunc: () => {
            assertEquals(Expr1(), result1, "Expected outcome: 100")
            assertEquals(Expr2(), result2, "Expected outcome: 200")
            assertNotEquals(Expr1(), result2, "Expected expr and result not equals")
            assertNotEquals(Expr2(), result1, "Expected expr and result not equals")
            assertNotStrictEquals(Expr3(), result4, "Expected outcome: not strictly equals")
            assertNotStrictEquals(Expr4(), result3, "Expected outcome: not strictly equals")

        },
    });

    await postTestResult();

})();
