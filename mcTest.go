// @Author: abbeymart | Abi Akindele | @Created: 2020-11-30 | @Updated: 2020-11-30
// @Company: mConnect.biz | @License: MIT
// @Description: go: mConnect Test Package

package mctest

import (
	"encoding/json"
	"fmt"
)

// ***** types *****
type TestFunction = func()

type OptionValue struct {
	name     string
	testFunc TestFunction
	before   string
	after    string
}

// ***** variables *****
var (
	unitTestPassed = 0
	unitTestFailed = 0
	passedTest     = 0
	failedTest     = 0
)

// ***** functions *****
// assert equals
func AssertEquals(expr interface{}, result interface{}, message string) string {
	if expr == result {
		fmt.Println("Passed")
		unitTestPassed += 1
		passedTest += 1
		return "Passed"
	} else {
		fmt.Printf("\nFailed: %v => Expected %v, Got %v", message, result, expr)
		fmt.Printf("\n")
		unitTestFailed += 1
		failedTest += 1
		return fmt.Sprintf("Failed: %v => Expected %v, Got %v", message, result, expr)
	}
}

// assert not equals
func AssertNotEquals(expr interface{}, result interface{}, message string) string {
	if expr != result {
		fmt.Println("Passed")
		unitTestPassed += 1
		passedTest += 1
		return "Passed"
	} else {
		fmt.Printf("\nFailed: %v => Expected %v and %v not to be equals", message, result, expr)
		fmt.Printf("\n")
		unitTestFailed += 1
		failedTest += 1
		return fmt.Sprintf("\nFailed: %v => Expected %v and %v not to be equals", message, result, expr)
	}
}

// assert not strict equals => deep equality check through stringified values
func AssertStrictEquals(expr interface{}, result interface{}, message string) string {
	// stringify expr and result for strict equals comparison
	jsonExpr, _ := json.Marshal(expr)
	jsonResult, _ := json.Marshal(result)

	if string(jsonExpr) == string(jsonResult) {
		fmt.Println("Passed")
		unitTestPassed += 1
		passedTest += 1
		return "Passed"
	} else {
		fmt.Printf("\nFailed: %v => Expected %v, Got %v", message, string(jsonResult), string(jsonExpr))
		fmt.Printf("\n")
		unitTestFailed += 1
		failedTest += 1
		return fmt.Sprintf("Failed: %v => Expected %v, Got %v", message, string(jsonResult), string(jsonExpr))
	}
}

// assert strict equals => deep equality check through stringified values
func AssertNotStrictEquals(expr interface{}, result interface{}, message string) string {
	// stringify expr and result for strict equals comparison
	jsonExpr, _ := json.Marshal(expr)
	jsonResult, _ := json.Marshal(result)

	if string(jsonExpr) != string(jsonResult) {
		fmt.Println("Passed")
		unitTestPassed += 1
		passedTest += 1
		return "Passed"
	} else {
		fmt.Printf("\nFailed: %v => Expected %v and %v not to be equals", message, string(jsonResult), string(jsonExpr))
		fmt.Printf("\n")
		unitTestFailed += 1
		failedTest += 1
		return fmt.Sprintf("Failed: %v => Expected %v and %v not to be equals", message, string(jsonResult), string(jsonExpr))
	}
}

func McTest(options OptionValue) {
	var (
		testName string
		testFunc TestFunction
	)
	if options.name != "" {
		testName = options.name
	} else {
		testName = "Unknown"
	}

	if options.testFunc != nil {
		testFunc = options.testFunc
	} else {
		testFunc = nil
	}
	fmt.Println("Running Test: ", testName)
	fmt.Println("================================================")
	if testFunc != nil {
		testFunc()
	} else {
		fmt.Printf("\n No test task/function specified - Test skipped!!!")
		fmt.Printf("\n")
	}
	// Test report
	fmt.Println("Summary for Test ", testName, ":")
	fmt.Println("Test Passed: ", unitTestPassed)
	fmt.Println("Test Failed: ", unitTestFailed)
	fmt.Println("Total Test: ", unitTestPassed+unitTestFailed)
	// Reset unit test counts
	unitTestPassed = 0
	unitTestFailed = 0
}

func PostTestResult() {
	fmt.Println("============================")
	fmt.Println("All Tests Summary Stats:")
	fmt.Println("============================")
	fmt.Println("Test Passed: ", passedTest)
	fmt.Println("Test Failed: ", failedTest)
	fmt.Println("Total Test: ", passedTest+failedTest)
	// reset test counts
	passedTest = 0
	failedTest = 0
	fmt.Println("***** Test Completed *****")
}