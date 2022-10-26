"use strict";

// getting an element from the DOM
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const speechSynth = speechSynthesis;

// random quotes from api
function getQuote() {
  quoteBtn.classList.add("loading"); // adding loading class to button
  quoteBtn.innerText = "Loading..."; // changing button text
  fetch("https://api.quotable.io/random")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading"); // removing loading class from button
      quoteBtn.innerText = "New Quote"; // changing button text
    });
}

// btn event listener
quoteBtn.addEventListener("click", getQuote);

// speech function
speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let voice = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    speechSynth.speak(voice);

    setInterval(() => {
      !speechSynth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

// copy function
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

// twitter function
twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} by ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
});
