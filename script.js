let grandma = document.getElementById("grandma");
let moveGrandmaButton = document.getElementById("move-grandma");
let nextButton = document.getElementById("next");
let startGameButton = document.getElementById("start-game");
let nameInput = document.getElementById("name");

let grandma2 = document.getElementById("grandma-2");
let moveGrandmaButton2 = document.getElementById("move-grandma-2");
let nextButton2 = document.getElementById("next-2");

let gameScreen = document.getElementById("game-screen");
let nameEntryContainer = document.getElementById("name-entry-container");

let arrowNextSlide = document.getElementById("arrow-next-slide");
let arrowNextSlide2 = document.getElementById("arrow-next-slide-2");

// Current slide tracking
let currentSlide = 1;

// Function to start the game after name entry
startGameButton.addEventListener("click", () => {
  let name = nameInput.value.trim();
  if (name) {
    nameEntryContainer.style.display = "none"; // Hide the name entry screen
    gameScreen.style.display = "flex"; // Show the game screen
    alert(`Welcome, ${name}! Let's play the game.`);
    showSlide(1); // Show the first slide
  } else {
    alert("Please enter your name.");
  }
});

function showSlide(slideNumber) {
  // Hide all slides
  let slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // Show the selected slide
  let currentSlideElement = document.getElementById(`slide-${slideNumber}`);
  currentSlideElement.style.display = "block";

  // Show the next slide arrow for the current slide
  if (slideNumber === 1) {
    arrowNextSlide.style.display = "block";
    arrowNextSlide2.style.display = "none";
  } else {
    arrowNextSlide.style.display = "none";
    arrowNextSlide2.style.display = "block";
  }

  // Position the arrow dynamically to the target location (top-left image)
  let targetImage = document.getElementById(`top-left${slideNumber === 1 ? '' : '-2'}`);
  let rect = targetImage.getBoundingClientRect();
  arrowNextSlide.style.left = `${rect.left + window.scrollX}px`;
  arrowNextSlide.style.top = `${rect.top + window.scrollY}px`;
}

function moveGrandma(slideNumber) {
  let targetPosition = { x: 150, y: 150 }; // Target position (top-left corner)

  let grandmaToMove = slideNumber === 1 ? grandma : grandma2;
  grandmaToMove.style.transition = "all 1s ease"; // Smooth transition
  grandmaToMove.style.left = `${targetPosition.x}px`;
  grandmaToMove.style.top = `${targetPosition.y}px`;
}

// Move Grandma in the first slide
moveGrandmaButton.addEventListener("click", () => {
  moveGrandma(1);
});

// Move Grandma in the second slide
moveGrandmaButton2.addEventListener("click", () => {
  moveGrandma(2);
});

// Next button logic for slide 1
nextButton.addEventListener("click", () => {
  currentSlide = 2;
  showSlide(currentSlide); // Show slide 2
  moveGrandma(2); // Move grandma in slide 2
});

// Next button logic for slide 2
nextButton2.addEventListener("click", () => {
  alert("Game Over!");
  // Optionally, you can restart the game or show a final message
});
