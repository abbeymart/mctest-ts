// @Author: abbeymart | Abi Akindele | @Created: 2020-11-30 | @Updated: 2020-11-30
// @Company: mConnect.biz | @License: MIT
// @Description: go: mConnect

package mctest

import "testing"

// test-data
var (
	result1 = 100
	result2 = 200
	result3 = map[string]string{"name": "Abi"}
	result4 = map[string]string{"location": "Abi"}
)

func Expr1() int { return 100 }
func Expr2() int { return 200 }
func Expr3() map[string]string {return result3}
func Expr4() map[string]string {return result4}
func TestSetCache(t *testing.T) {
	McTest(OptionValue{
		name: "Test Series 100",
		testFunc: func(){
			AssertEquals(Expr1(), result1, "Expected outcome: 100")
			AssertEquals(Expr2(), result2, "Expected outcome: 200")
			AssertNotEquals(Expr1(), result2, "Expected expr and result not equals")
			AssertNotEquals(Expr2(), result1, "Expected expr and result not equals")
			AssertStrictEquals(Expr3(), result3, "Expected outcome: strictly equals")
			AssertStrictEquals(Expr4(), result4, "Expected outcome: strictly equals")
		},
	})
	McTest(OptionValue{
		name: "Test Series 200",
		testFunc: func(){
			AssertEquals(Expr1(), result1, "Expected outcome: 100")
			AssertEquals(Expr2(), result2, "Expected outcome: 200")
			AssertNotEquals(Expr1(), result2, "Expected expr and result not equals")
			AssertNotEquals(Expr2(), result1, "Expected expr and result not equals")
			AssertNotStrictEquals(Expr3(), result4, "Expected outcome: not strictly equals")
			AssertNotStrictEquals(Expr4(), result3, "Expected outcome: not strictly equals")
		},
	})

	PostTestResult()
}