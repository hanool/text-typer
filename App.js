import TextTyper from "./TextTyper.js";

window.customElements.define("text-typer", TextTyper);

const newTyper = document.createElement("text-typer");
document.querySelector(".container").appendChild(newTyper);

const maxDataPerFetch = 100;
const maxLength = 60;

let quotes;
let quoteIndex = 0;
getData(maxDataPerFetch, maxLength)
  .then((res) => res.json())
  .then((jsonData) => {
    quotes = shuffle(jsonData.results);
    newTyper.setAttribute("data-text", quotes[quoteIndex].content);
  });

newTyper.addEventListener("typingFinished", () => {
  if (quoteIndex + 1 >= maxDataPerFetch) {
    quoteIndex = 0;
    getData(maxDataPerFetch, maxLength)
      .then((res) => res.json())
      .then((jsonData) => {
        quotes = shuffle(jsonData.results);
        newTyper.setAttribute("data-text", quotes[quoteIndex].content);
      });
    newTyper.setAttribute("data-text", quotes[quoteIndex].content);
  } else {
    quoteIndex++;
    newTyper.setAttribute("data-text", quotes[quoteIndex].content);
  }
});

function getData(maxDataPerFetch, maxLength) {
  return fetch(
    `https://api.quotable.io/quotes?limit=${maxDataPerFetch}&maxLength=${maxLength}`
  );
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
