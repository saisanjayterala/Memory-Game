const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let score = 0;
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');

function flipCard() {
    if (this === firstCard) return;  // Prevent double-click
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
        scoreDisplay.textContent = score;
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
    score = 0;
    scoreDisplay.textContent = score;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}

cards.forEach(card => card.addEventListener('click', flipCard));
restartBtn.addEventListener('click', restartGame);
