import { checkResult } from "./TextTyper";
import TextTyper from "./TextTyper.js";

const typer = new TextTyper();

/**
 * Test Strategy for getTextInputComparison(origin, target)
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
describe("getTextInputComparisonTest", () => {
  test("test case (origin.len, target.len) = (0, 0)", () => {
    const result = typer.getTextInputComparison("", "");
    expect(result.length).toBe(0);
  });

  test(`test case (origin.len, target.len) = (1, more) and when target === origin`, () => {
    const result = typer.getTextInputComparison("a", "abbb");
    expect(result).toMatchObject([checkResult.SAME]);
  });

  test(`test case (origin.len = n, target.len = 1) and when target !== origin`, () => {
    const result = typer.getTextInputComparison("abcde", "b");
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
    const result = typer.getTextInputComparison(
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

/**
 * Test Strategy for getStyledTyperText(plainText, textInputComparison)
 *    - partitions of input:
 *      1. plainText.len = 0, 1, n
 *      2. plainText.len ==, != textInputComparison.len
 *      3. when textInputComparison contains checkResult.SAME
 *      4. when textInputComparison contains checkResult.DIFF
 *      5. when textInputComparison contains checkResult.NONE
 *
 *    - test cases
 *      1. (plainText.len = 0, checkResult.len = 0) => ""
 *      2. (plainText.len = 1, checkResult.len = 2) => Err: "ComparisonLengthUnmatch"
 *      3. plainText.len = n and when textInputComparison contains checkResult.SAME .DIFF .NONE => styledText
 */
describe("getStyledTyperTextTest", () => {
  test("test case length 0", () => {
    const emptyComparison = new Array();
    const result = typer.getStyledTyperText("", emptyComparison);
    expect(result.length).toBe(0);
  });
  test("test case length unmatch", () => {
    try {
      const result = typer.getStyledTyperText("a", [
        checkResult.SAME,
        checkResult.DIFF,
      ]);
    } catch (e) {
      expect(e.message).toBe("ComparisonLengthUnmatch");
    }
  });
  test("plainText.len = n and when textInputComparison contains checkResult.SAME .DIFF .NONE", () => {
    const result = typer.getStyledTyperText("abcdef", [
      checkResult.SAME,
      checkResult.DIFF,
      checkResult.DIFF,
      checkResult.SAME,
      checkResult.SAME,
      checkResult.NONE,
    ]);
    expect(result).toBe(
      "<span style='color: green;'>a</span><span style='color: red;'>bc</span><span style='color: green;'>de</span>f"
    );
  });
});
