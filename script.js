const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let score = 0;
let flippedPairs = 0;
let timer = 0;
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart');
const winMessage = document.getElementById('winMessage');
const popupMessage = document.getElementById('popupMessage');
let gameInterval;

function startTimer() {
    gameInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(gameInterval);
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function flipCard() {
    if (!gameInterval) startTimer();

    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        score++;
        flippedPairs++;
        scoreDisplay.textContent = score;
        showPopupMessage(`You scored! Total score: ${score}`);
        if (flippedPairs === cards.length / 2) {
            winGame();
        }
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, firstCard, secondCard] = [false, null, null];
}

function restartGame() {
    stopTimer();
    timer = 0;
    flippedPairs = 0;
    score = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    winMessage.style.display = 'none';
    popupMessage.style.display = 'none';
    document.body.style.backgroundColor = '#1d1f27';
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffleCards();
}

function winGame() {
    stopTimer();
    winMessage.style.display = 'block';
    showPopupMessage("Congratulations! You've won the game!");
}

function showPopupMessage(message) {
    popupMessage.textContent = message;
    popupMessage.style.display = 'block';
    setTimeout(() => {
        popupMessage.style.display = 'none';
    }, 3000);
}

cards.forEach(card => card.addEventListener('click', flipCard));
restartBtn.addEventListener('click', restartGame);

shuffleCards();
