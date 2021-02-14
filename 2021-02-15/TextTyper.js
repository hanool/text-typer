const template = document.createElement("template");

template.innerHTML = `
  <style>
    #typer-text {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
    }
    
    #typer-input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: none;
      border-bottom: 5px solid bisque;
      outline: none;
      resize: none;
    }
    
    #typer-input:focus {
      border-bottom: 5px solid #ffbb6a;
    }
  </style>

  <div id="typer-text">
    テスト用の日本語です。テスト用の日本語。テスト用の日本語です。
  </div>
  <div id="typer-input" role="textbox" contenteditable>
  </div>
`;

class TextTyper extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const typerText = this.root.querySelector("#typer-text");

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
    typerInput.style.height = `${typerTextHeight - 2 * typerTextPadding}px`;

    typerInput.addEventListener("keydown", function (event) {
      const currentText = event.target.innerText;
      const currentLength = Number(currentText.length);
      console.log(currentLength);
      console.log(event.code !== "Delete");
      if (
        currentLength > typerTextLength &&
        event.code !== "Delete" &&
        event.code !== "Backspace"
      ) {
        event.preventDefault();
      }
    });
  }
}

window.customElements.define("text-typer", TextTyper);
