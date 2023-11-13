const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  btn = document.querySelector(".btn"),
  synth = speechSynthesis;

function displayQoute() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  const randomIndex = Math.floor(Math.random() * qoutes.length);
  const qoute = qoutes[randomIndex];
  quoteText.innerText = qoute;
  quoteBtn.classList.remove("loading");
  quoteBtn.innerText = "New Quote";
  // qouteContainer.innerHTML = `<p id="tex">${qoute}</p>`
}
// const time = setInterval(displayQoute, 2000)
// window.onload = time;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});
quoteBtn.addEventListener("click", randomQuote);
// quoteBtn.addEventListener("click", displayQoute);

const slideshow = document.getElementById("slideshow");
const downloadBtn = document.getElementById("downloadBtn");
const slides = slideshow.getElementsByTagName("img");
let currentSlide = 0;
// const slides = slideshow.getElementsByTagName("img");
// const slideInterval = setInterval(nextSlide, 1000); // Change slide every 2 seconds

// Event listener for download button click
downloadBtn.addEventListener("click", () => {
  const currentImage = slides[currentSlide];
  const downloadLink = document.createElement("a");
  downloadLink.href = currentImage.src;
  downloadLink.download = currentImage.alt;
  downloadLink.click();
});

function slideShow() {
  setTimeout(slideShow, 8000);
  let x;
  for (x = 0; x < slides.length; x++) {
    slides[x].style.display = "none";
  }
  currentSlide++;
  if (currentSlide > slides.length) {
    currentSlide = 1;
  }
  slides[currentSlide - 1].style.display = "block";
}

slideShow();

function img() {
  document.querySelector(".content").style.display = "none";
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".image_div").style.display = "block";
  btn.style.display = "none";
}
btn.addEventListener("click", img);
function text() {
  document.querySelector(".content").style.display = "block";
  document.querySelector(".buttons").style.display = "block";
  document.querySelector(".image_div").style.display = "none";
  btn.style.display = "block";
}

// notification
document.addEventListener("DOMContentLoaded", function () {
  // Request permission for notifications
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

function sendNotification() {
  // Check if notifications are supported and permission is granted
  if ("Notification" in window && Notification.permission === "granted") {
    // Create a notification
    var notification = new Notification("My Web App", {
      body: "Hello! This is a notification from my web app.",
      icon: "icon.png", // Specify the path to your icon image
    });

    // Automatically close the notification after 5 seconds
    setTimeout(function () {
      notification.close();
    }, 5000);
  } else {
    // If notifications are not supported or permission is denied, show a pop-up instead
    alert("Hello! This is a pop-up from my web app.");
  }
}
