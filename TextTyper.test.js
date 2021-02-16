import { Window } from "happy-dom";
import TextTyper from "./TextTyper.js";

const window = new Window();
const document = window.document;
document.body.innerHTML = '<div class="container"></div>';

window.customElements.define("text-typer", TextTyper);

const text = `テスト<span style="color: red;">用</span>の日本語です。`;
const typer = document.createElement("TEXT-TYPER");
typer.setAttribute("data-text", text);
document.querySelector(".container").appendChild(typer);

test("adds 1 + 2 to equal 3", () => {
  const event = new KeyboardEvent("keydown", { code: "KeyA" });
  document.querySelector("#typer-input").dispatchEvent(event);
  expect(typer.check(event)).toBe("a");
});
