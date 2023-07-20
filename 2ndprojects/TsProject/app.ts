// Represents the card state
interface Card {
    id: number;
    value: string;
    flipped: boolean;
  }
  
  // Create an array of card values (pairs of letters)
  const cardValues: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  
  // Function to shuffle an array randomly
  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  // Function to create the memory puzzle cards
  function createPuzzleCards(container: HTMLElement): Card[] {
    const shuffledValues = shuffleArray([...cardValues, ...cardValues]);
    const cards: Card[] = shuffledValues.map((value, index) => ({
      id: index,
      value,
      flipped: false,
    }));
  
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.textContent = card.flipped ? card.value : "";
      cardElement.setAttribute("data-id", String(card.id));
      cardElement.addEventListener("click", () => handleCardClick(card, cardElement));
      container.appendChild(cardElement);
    });
  
    return cards;
  }
  
  let cards: Card[] = [];
  let moves = 0;
  let timerInterval: number;
  let timer = 0;
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      updateTimerDisplay();
    }, 1000);
  }
  
  // Function to update the timer display
  function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    if (timerElement) {
      timerElement.textContent = `Time: ${timer} seconds`;
    }
  }
  
  // Function to stop the timer
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  // Function to handle the card click event
  function handleCardClick(card: Card, cardElement: HTMLElement): void {
    if (!card.flipped) {
      card.flipped = true;
      cardElement.textContent = card.value;
      const flippedCards = cards.filter((c) => c.flipped);
      if (flippedCards.length === 2) {
        moves++;
        updateMoveCounter();
        setTimeout(() => checkMatchingCards(flippedCards), 1000);
      }
    }
  }
  
  // Function to update the move counter display
  function updateMoveCounter() {
    const moveCounterElement = document.getElementById("move-counter");
    if (moveCounterElement) {
      moveCounterElement.textContent = `Moves: ${moves}`;
    }
  }
  
  // Function to check if the flipped cards match
  function checkMatchingCards(flippedCards: Card[]): void {
    if (flippedCards[0].value === flippedCards[1].value) {
      flippedCards.forEach((card) => {
        const cardElement = document.querySelector(`[data-id="${card.id}"]`);
        if (cardElement) {
          cardElement.classList.add("matched");
        }
      });
    } else {
      flippedCards.forEach((card) => {
        card.flipped = false;
        const cardElement = document.querySelector(`[data-id="${card.id}"]`);
        if (cardElement) {
          cardElement.textContent = "";
        }
      });
    }
  
    const allMatched = cards.every((card) => card.flipped);
    if (allMatched) {
      stopTimer();
      setTimeout(() => {
        alert(`Congratulations! You solved the puzzle in ${timer} seconds with ${moves} moves!`);
        resetGame();
      }, 500);
    }
  }
  
  // Function to reset the game
  function resetGame() {
    cards.forEach((card) => {
      card.flipped = false;
      const cardElement = document.querySelector(`[data-id="${card.id}"]`);
      if (cardElement) {
        cardElement.textContent = "";
        cardElement.classList.remove("matched");
      }
    });
  
    moves = 0;
    timer = 0;
    updateMoveCounter();
    updateTimerDisplay();
    startTimer();
  }
  
  // Function to initialize the game
  function initGame() {
    const container = document.getElementById("puzzle-container");
    const moveCounterElement = document.getElementById("move-counter");
    const timerElement = document.getElementById("timer");
  
    if (container && moveCounterElement && timerElement) {
      cards = createPuzzleCards(container);
      moves = 0;
      timer = 0;
      updateMoveCounter();
      updateTimerDisplay();
      startTimer();
    }
  }
  
  // Entry point of the application
  document.addEventListener("DOMContentLoaded", initGame);