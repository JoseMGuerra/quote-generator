const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQouoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function getNewQuote() {
  showLoadingSpinner();
  // Pick a Random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author is Null replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknwon";
  } else {
    authorText.textContent = `- ${quote.author}`;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

function twitterQuote() {
  const author = authorText.textContent;
  const text = quoteText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text} ${author}`;
  window.open(twitterUrl, "_blank");
}

async function getQuoteFromApi() {
  showLoadingSpinner();
  const apiUrl = "https://josemguerra.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getNewQuote();
  } catch (error) {
    // Catch Error Here
    console.log("Opps no Quotes", error);
    getNewQuote();
  }
}

// Add Event Listeners
newQouoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", twitterQuote);

// On Load
getQuoteFromApi();
