//const template = document.createElement("template");

const template = `
  <style>
    #typer-text {
      max-width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
    }
    
    #typer-input {
      max-width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: none;
      border-bottom: 5px solid bisque;
      outline: none;
      resize: none;
      margin-bottom: 1rem;
    }
    
    #typer-input:focus {
      border-bottom: 5px solid #ffbb6a;
    }
  </style>

  <div id="typer-text"></div>
  <div id="typer-input" contenteditable></div>
`;

class TextTyper extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = template;
  }

  connectedCallback() {
    const typerText = this.root.querySelector("#typer-text");
    typerText.innerText = this.getAttribute("data-text");
    const typerTextLength = typerText.innerText.length;

    // Adjust height of input area to be same as typer-text
    const typerTextHeight = typerText.clientHeight;
    const typerTextPadding = Number(
      window
        .getComputedStyle(typerText, null)
        .getPropertyValue("padding")
        .match(/\d+/)[0]
    );

    const typerInput = this.root.querySelector("#typer-input");
    typerInput.setAttribute("data-max-length", typerTextLength);
    typerInput.style.height = `${typerTextHeight - 2 * typerTextPadding}px`;

    typerInput.addEventListener("keydown", handleMaxLength);
    typerInput.addEventListener("keyup", handleMaxLength);
  }
}

const handleMaxLength = (event) => {
  const currentText = event.target.innerText;
  const currentLength = Number(currentText.length);
  const maxLength = Number(event.target.getAttribute("data-max-length"));
  if (
    currentLength > maxLength &&
    event.code !== "Delete" &&
    event.code !== "Backspace"
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
};

window.customElements.define("text-typer", TextTyper);

const text = "テスト用の日本語です。";
const newTyper = document.createElement("text-typer");
newTyper.setAttribute("data-text", text);
document.querySelector(".container").appendChild(newTyper);
