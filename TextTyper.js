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

export const checkResult = {
  NONE: "0",
  SAME: "1",
  DIFF: "2",
};

class TextTyper extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = template;

    this.text;
    this.input;

    this.getStringComparison = this.getStringComparison.bind(this);
  }

  connectedCallback() {
    this.text = this.getAttribute("data-text");

    const typerText = this.root.querySelector("#typer-text");
    typerText.innerHTML = this.text;
    const typerTextLength = typerText.innerText.length;

    // Adjust height of input area to be same as typer-text
    const typerTextHeight = typerText.clientHeight;
    const typerTextStyle = window.getComputedStyle(typerText, null);
    const typerTextPadding = Number(
      typerTextStyle.getPropertyValue("padding").match(/\d+/)[0]
    );

    const typerInput = this.root.querySelector("#typer-input");
    typerInput.setAttribute("data-max-length", typerTextLength);
    typerInput.style.height = `${typerTextHeight - 2 * typerTextPadding}px`;

    typerInput.addEventListener("keydown", this.check);
  }

  /**
   * Compares 2 String origin and target.
   * @param {*} origin original String to compare
   * @param {*} target   target String to be campared by original String
   * @returns an Array of checkResult which has size of origin String.length
   * @see checkResult
   */
  getStringComparison(origin, target) {
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
}

export default TextTyper;
