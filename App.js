import TextTyper from "./TextTyper.js";

window.customElements.define("text-typer", TextTyper);

const text = `テスト用の日本語です。`;
const newTyper = document.createElement("text-typer");
newTyper.setAttribute("data-text", text);
document.querySelector(".container").appendChild(newTyper);
