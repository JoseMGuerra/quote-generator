const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQouoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  // Pick a Random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author is Null replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknwon";
  } else {
    authorText.textContent = `- ${quote.author}`;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 110) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide loader
  quoteText.textContent = quote.text;
  complete();
}

function twitterQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Get Quotes From Api
async function getQuotes() {
  loading();
  const apiUrl = "https://josemguerra.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// Add Event Listeners
newQouoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", twitterQuote);

// On Load
getQuotes();
