const clearRowSound = document.getElementById('clear-row');
const gameOverSound = document.getElementById('game-over');
const moveSound = document.getElementById('move');
const rotateSound = document.getElementById('rotate');

export function playClearRow() {
    clearRowSound.play();
}

export function playGameOver() {
    gameOverSound.play();
}

export function playMove() {
    moveSound.play();
}

export function playRotate() {
    rotateSound.play();
}
