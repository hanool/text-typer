import TextTyper from "./TextTyper.js";

window.customElements.define("text-typer", TextTyper);

const text = `テスト用の日本語です。`;
const newTyper = document.createElement("text-typer");
document.querySelector(".container").appendChild(newTyper);
newTyper.setAttribute("data-text", text);

const textList = [
  `テスト用の日本語です。`,
  `한국어 테스트용 데이터 입니다.`,
  `Slow and steady wins the game.`,
  `「あの選手ちょっと面白いな」と、野球を知らない人に感じてもらうのも目標の1つでした`,
  `どんなに苦しい時でも諦めようとする自分がいなかった`,
  `センター前ヒットなら、いつでも打てる`,
];
let textIndex = 1;

newTyper.addEventListener("typingFinished", () => {
  newTyper.setAttribute("data-text", textList[textIndex]);
  textIndex++;
});
