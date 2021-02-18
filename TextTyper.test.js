import { checkResult } from "./TextTyper";
import TextTyper from "./TextTyper.js";

const typer = new TextTyper();

/**
 * Test Strategy for getStringComparison(origin, target)
 *    - partitions of input:
 *      1. origin.len = 0, 1, n
 *      2. target.len = 0, 1, n
 *      3. origin.len >, =, < than target.len
 *      4. when target is completely same with origin
 *      5. when target is partially same with origin
 *      6. when target is completely different from origin
 *
 *    - test cases
 *      1. (origin.len = 0, target.len = 0) => []
 *      2. (origin.len = 1, target.len = n) and when target === origin => [SAME]
 *      3. (origin.len = n, target.len = 1) and when target !== origin => [DIFF, NONE, NONE...]
 *      4. (origin.len = n, target.len = n) and when target is partially diff from origin => [variant checkResults]
 */
describe("getStringComparisonTest", () => {
  test("test case (origin.len, target.len) = (0, 0)", () => {
    const result = typer.getStringComparison("", "");
    expect(result.length).toBe(0);
  });

  test(`test case (origin.len, target.len) = (1, more) and when target === origin`, () => {
    const result = typer.getStringComparison("a", "abbb");
    expect(result).toMatchObject([checkResult.SAME]);
  });

  test(`test case (origin.len = n, target.len = 1) and when target !== origin`, () => {
    const result = typer.getStringComparison("abcde", "b");
    const expected = [
      checkResult.DIFF,
      checkResult.NONE,
      checkResult.NONE,
      checkResult.NONE,
      checkResult.NONE,
    ];
    expect(result).toMatchObject(expected);
  });

  test(`test case (origin.len = n, target.len = n) and when target is partially diff from origin`, () => {
    const result = typer.getStringComparison(
      "abcd123asdf999 ",
      "aecdkk3asdfew"
    );
    const expected = [
      checkResult.SAME,
      checkResult.DIFF,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.DIFF,
      checkResult.DIFF,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.DIFF,
      checkResult.DIFF,
      checkResult.NONE,
      checkResult.NONE,
    ];
    expect(result).toMatchObject(expected);
  });
});
