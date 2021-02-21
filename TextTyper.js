const template = `
  <style>
    * {
      box-sizing: border-box;
    }
    :host {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

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
    }
    
    #typer-input:focus {
      border-bottom: 5px solid #ffbb6a;
    }
  </style>
    <div id="typer-text"></div>
    <div id="typer-input" contenteditable></div>
`;

export const checkResult = {
  NONE: "0",
  SAME: "1",
  DIFF: "2",
};

class TextTyper extends HTMLElement {
  static get observedAttributes() {
    return ["data-text"];
  }

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = template;

    this.text;
    this.input;
    this.composing;

    this.initStyle = this.initStyle.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
  }

  connectedCallback() {
    this.initStyle();

    const typerInput = this.root.querySelector("#typer-input");
    typerInput.addEventListener("keyup", this.keyupHandler);
    typerInput.addEventListener("compositionstart", () => {
      this.composing = true;
    });
    typerInput.addEventListener("compositionend", () => {
      this.composing = false;
    });
  }

  attributeChangedCallback() {
    this.initStyle();
  }

  initStyle() {
    const typerText = this.root.querySelector("#typer-text");
    const typerInput = this.root.querySelector("#typer-input");

    // Show initial text
    this.text = this.getAttribute("data-text");
    typerText.innerHTML = this.text;

    // Adjust height of input area to be same as typer-text
    const typerTextHeight = typerText.clientHeight;
    const typerTextStyle = window.getComputedStyle(typerText, null);
    const typerTextPadding = Number(
      typerTextStyle.getPropertyValue("Padding").match(/\d+/)[0]
    );
    typerInput.style.height = `${typerTextHeight}px`;

    // Set input area max-width (not to overflow)
    typerInput.style.maxWidth = `${this.clientWidth}px`;

    // set input text empty, cursor to start position
    typerInput.innerText = "";
    typerInput.selectionStart;
  }

  keyupHandler(event) {
    const inputText = this.root.querySelector("#typer-input").innerText;

    // check if typing finished
    if (this.text.length + 1 <= inputText.length) {
      if (!this.composing) {
        var finishEvent = new CustomEvent("typingFinished", {
          msg: "typing finished",
        });
        this.dispatchEvent(finishEvent);
        return false;
      }
    }

    // style text
    const comparison = this.getTextInputComparison(this.text, inputText);
    const newStyledText = this.getStyledTyperText(this.text, comparison);
    this.root.querySelector("#typer-text").innerHTML = newStyledText;
  }

  /**
   * Compares 2 String origin and target.
   * @param string origin original String to compare
   * @param string target   target String to be campared by original String
   * @returns an Array of checkResult which has size of origin String.length
   * @see checkResult
   */
  getTextInputComparison(origin, target) {
    if (origin.length === 0) return [];

    let comparisonResult = new Array();
    for (let i = 0; i < origin.length; i++) {
      if (target.length >= i + 1) {
        if (target[i] === origin[i]) {
          comparisonResult.push(checkResult.SAME);
        } else {
          comparisonResult.push(checkResult.DIFF);
        }
      } else {
        comparisonResult.push(checkResult.NONE);
      }
    }
    return comparisonResult;
  }

  /**
   * Create styled typer text based on input comparison.
   * when text.char == input.char : green, != : red, none: plain.
   * @param {*} plainText plain text to be styled
   * @param {*} textInputComparison comparison result
   */
  getStyledTyperText(plainText, textInputComparison) {
    if (plainText.length !== textInputComparison.length) {
      throw new Error("ComparisonLengthUnmatch");
    }
    let styledText = "";
    for (let i = 0; i < plainText.length; i++) {
      let styledChar = "";
      if (textInputComparison[i] === checkResult.SAME) {
        styledChar = `<span style="color: green;">${plainText[i]}</span>`;
      } else if (textInputComparison[i] === checkResult.DIFF) {
        styledChar = `<span style="color: red;">${plainText[i]}</span>`;
      } else if (textInputComparison[i] === checkResult.NONE) {
        styledChar = `${plainText[i]}`;
      }
      styledText = styledText + styledChar;
    }
    return styledText;
  }
}

export default TextTyper;
