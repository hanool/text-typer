import TextTyper from "./TextTyper.js";

test("adds 1 + 2 to equal 3", () => {
  const typer = new TextTyper();
  expect(typer.sum(1, 2)).toBe(3);
});
