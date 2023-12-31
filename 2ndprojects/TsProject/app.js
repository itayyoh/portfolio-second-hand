var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cardValues = ["1", "2", "3", "4", "5", "6", "7", "8"];

function shuffleArray(array) {
    var _a;
    var shuffledArray = __spreadArray([], array, true);
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffledArray[j], shuffledArray[i]], shuffledArray[i] = _a[0], shuffledArray[j] = _a[1];
    }
    return shuffledArray;
}
function createPuzzleCards(container) {
    var shuffledValues = shuffleArray(__spreadArray(__spreadArray([], cardValues, true), cardValues, true));
    var cards = shuffledValues.map(function (value, index) { return ({
        id: index,
        value: value,
        flipped: false,
    }); });
    cards.forEach(function (card) {
        var cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.textContent = card.flipped ? card.value : "";
        cardElement.setAttribute("data-id", String(card.id));
        cardElement.addEventListener("click", function () { return handleCardClick(card, cardElement); });
        container.appendChild(cardElement);
    });
    return cards;
}
var cards = [];
var moves = 0;
var timerInterval;
var timer = 0;

function startTimer() {
    timerInterval = setInterval(function () {
        timer++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    var timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.textContent = "Time: ".concat(timer, " seconds");
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function handleCardClick(card, cardElement) {
    if (!card.flipped) {
        card.flipped = true;
        cardElement.textContent = card.value;
        var flippedCards_1 = cards.filter(function (c) { return c.flipped; });
        if (flippedCards_1.length === 2) {
            moves++;
            updateMoveCounter();
            setTimeout(function () { return checkMatchingCards(flippedCards_1); }, 1000);
        }
    }
}

function updateMoveCounter() {
    var moveCounterElement = document.getElementById("move-counter");
    if (moveCounterElement) {
        moveCounterElement.textContent = "Moves: ".concat(moves);
    }
}

function checkMatchingCards(flippedCards) {
    if (flippedCards[0].value === flippedCards[1].value) {
        flippedCards.forEach(function (card) {
            var cardElement = document.querySelector("[data-id=\"".concat(card.id, "\"]"));
            if (cardElement) {
                cardElement.classList.add("matched");
            }
        });
    }
    else {
        flippedCards.forEach(function (card) {
            card.flipped = false;
            var cardElement = document.querySelector("[data-id=\"".concat(card.id, "\"]"));
            if (cardElement) {
                cardElement.textContent = "";
            }
        });
    }
    var allMatched = cards.every(function (card) { return card.flipped; });
    if (allMatched) {
        stopTimer();
        setTimeout(function () {
            alert("Congratulations! You solved the puzzle in ".concat(timer, " seconds with ").concat(moves, " moves!"));
            resetGame();
        }, 500);
    }
}

function resetGame() {
    cards.forEach(function (card) {
        card.flipped = false;
        var cardElement = document.querySelector("[data-id=\"".concat(card.id, "\"]"));
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
function initGame() {
    var container = document.getElementById("puzzle-container");
    var moveCounterElement = document.getElementById("move-counter");
    var timerElement = document.getElementById("timer");
    if (container && moveCounterElement && timerElement) {
        cards = createPuzzleCards(container);
        moves = 0;
        timer = 0;
        updateMoveCounter();
        updateTimerDisplay();
        startTimer();
    }
}

document.addEventListener("DOMContentLoaded", initGame);
