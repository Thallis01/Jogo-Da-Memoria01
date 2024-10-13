const emojis = ['😊', '😂', '😍', '😢', '😡', '😱', '😴', '🤔'];
let cards = [...emojis, ...emojis];
cards = shuffle(cards);

const gameBoard = document.getElementById('gameBoard');
const clickSound = document.getElementById('clickSound'); // Referência ao som de clique
const errorSound = document.getElementById('errorSound'); // Referência ao som de erro
const successSound = document.getElementById('successSound'); // Referência ao som de sucesso
const celebrationSound = document.getElementById('celebrationSound'); // Referência ao som de comemoração
const backgroundMusic = document.getElementById('backgroundMusic'); // Referência à música de fundo
const congratulations = document.getElementById('congratulations');
const motivationalMessage = document.getElementById('motivationalMessage');
const muteButton = document.getElementById('muteButton');
const volumeButton = document.getElementById('volumeButton');
const menuButton = document.getElementById('menuButton');
const soundMenu = document.getElementById('soundMenu');
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;

const motivationalMessages = [
    "Você é incrível!",
    "Continue assim!",
    "Nada é impossível!",
    "Acredite em você!",
    "Você pode tudo!",
    "Cada dia é uma nova chance!",
    "Você está fazendo um ótimo trabalho!",
    "Nunca desista dos seus sonhos!"
];

cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front');
    const backFace = document.createElement('div');
    backFace.classList.add('back');
    backFace.textContent = emoji;

    card.appendChild(frontFace);
    card.appendChild(backFace);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

window.addEventListener('load', () => {
    backgroundMusic.play(); // Inicia a música de fundo quando a página carregar
});

muteButton.addEventListener('click', () => {
    toggleMute(true);
});

volumeButton.addEventListener('click', () => {
    toggleMute(false);
});

menuButton.addEventListener('click', () => {
    soundMenu.classList.toggle('hidden');
});

document.querySelectorAll('.muteSound').forEach(button => {
    button.addEventListener('click', () => {
        const sound = document.getElementById(button.dataset.sound);
        sound.muted = true;
        button.classList.add('hidden');
        button.nextElementSibling.classList.remove('hidden');
    });
});

document.querySelectorAll('.volumeSound').forEach(button => {
    button.addEventListener('click', () => {
        const sound = document.getElementById(button.dataset.sound);
        sound.muted = false;
        button.classList.add('hidden');
        button.previousElementSibling.classList.remove('hidden');
    });
});

function toggleMute(mute) {
    backgroundMusic.muted = mute;
    clickSound.muted = mute;
    errorSound.muted = mute;
    successSound.muted = mute;
    celebrationSound.muted = mute;

    if (mute) {
        muteButton.classList.add('hidden');
        volumeButton.classList.remove('hidden');
        document.querySelectorAll('.muteSound').forEach(button => {
            button.classList.add('hidden');
            button.nextElementSibling.classList.remove('hidden');
        });
    } else {
        muteButton.classList.remove('hidden');
        volumeButton.classList.add('hidden');
        document.querySelectorAll('.volumeSound').forEach(button => {
            button.classList.add('hidden');
            button.previousElementSibling.classList.remove('hidden');
        });
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    clickSound.play(); // Coloque o som aqui!

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    successSound.play(); // Coloque o som aqui!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches++;
    if (matches === emojis.length) {
        endGame();
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    errorSound.play(); // Coloque o som aqui!

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function endGame() {
    backgroundMusic.pause(); // Para a música de fundo
    celebrationSound.play(); // Coloque o som aqui!
    congratulations.classList.remove('hidden');
    motivationalMessage.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}
