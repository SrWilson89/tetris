export let squares;
export let currentPosition;
export let currentRotation;
export let current;
export let width = 10;
export let random;
export let nextRandom;
export let theTetrominoes;

export function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
    });
}

export function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
    });
}

export function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
}

export function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        addScore();
        gameOver();
    }
}

export function checkRotatedPosition(P) {
    return P.some(pos => squares[currentPosition + pos].classList.contains('taken'));
}