const container = document.getElementById("quote-container");
const text = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitBtn = document.getElementById("twitter");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  container.hidden = true;
}

function complete() {
  container.hidden = false;
  loader.hidden = true;
}
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //  FOR UNKNOWN AUTHOR NAME
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  text.textContent = quote.text;
  complete();
}

async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    newQuote();
  } catch (error) {}
}
function tweetQuote() {
  const twitterUrl = `https://twitter.com/tweet?text=${text.textContent} -${authorText.textContent} `;
  window.open(twitterUrl, "_blank");
}

newQuotebtn.addEventListener("click", newQuote);
twitBtn.addEventListener("click", tweetQuote);

getQuote();

// for using a local array
// newQuotes();
