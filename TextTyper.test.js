import { checkResult } from "./TextTyper";
import TextTyper from "./TextTyper.js";

const typer = new TextTyper();

/**
 * Test Strategy for getStringComparison(origin, target)
 *    - partitions of input:
 *      1. origin.len = 0, 1, more
 *      2. target.len = 0, 1, more
 *      3. origin.len >, =, < than target.len
 *      4. when target is completely same with origin
 *      5. when target is partially same with origin
 *      6. when target is completely different from origin
 *
 *    - test cases
 *      1. (origin.len = 0, target.len = 0) => []
 *      2. (origin.len = 1, target.len = more) and when target is completely same with origin => [checkResult.SAME]
 */
describe("getStringComparisonTest", () => {
  test("test case (origin.len, target.len) = (0, 0)", () => {
    const result = typer.getStringComparison("", "");
    expect(result.length).toBe(0);
  });
  test(`test case (origin.len, target.len) = (1, more) and when target is completely same with origin`, () => {
    const result = typer.getStringComparison("a", "abbb");
    expect(result).toMatchObject([checkResult.SAME]);
  });
});
