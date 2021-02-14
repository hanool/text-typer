const testText = document.querySelector(".test-text");
const textHeight = testText.clientHeight;
const textLength = testText.innerText.length;

// Adjust height of input area by test-text
const testInput = document.querySelector("#test-input");
testInput.style.height = `${textHeight}px`;

// set maxlength of input area by test-text length
var maxLengthAttr = document.createAttribute("maxlength");
maxLengthAttr.value = `${textLength + 3}`;
testInput.setAttributeNode(maxLengthAttr);

// make input area's max input
document.querySelectorAll("div[role='textbox']").forEach((elem) => {
  elem.addEventListener("keydown", function (event) {
    //Just for info, you can remove this line
    const currentText = event.target.innerText;
    const currentLength = Number(currentText.length);
    const maxLength = Number(event.target.getAttribute("maxlength"));

    console.log(currentLength);
    console.log(event.code !== "Delete");
    //You can add delete key event code as well over here for windows users.
    if (
      currentLength >= maxLength &&
      event.code !== "Delete" &&
      event.code !== "Backspace"
    ) {
      console.log(currentText);
      event.preventDefault();
      event.target.innerText = currentText.substring(0, currentLength);
    }
  });
});
