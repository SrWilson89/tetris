import { draw, undraw, moveDown, freeze, moveLeft, moveRight, rotate, checkRotatedPosition } from './tetromino.js';
import { addScore, gameOver, updateHighScore } from './score.js';
import { playClearRow, playGameOver, playMove, playRotate } from './sounds.js';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const linesDisplay = document.getElementById('lines');
    const levelDisplay = document.getElementById('level');
    const highScoreDisplay = document.getElementById('high-score');
    const startPauseButton = document.getElementById('start-pause');
    const moveLeftButton = document.getElementById('move-left');
    const rotateButton = document.getElementById('rotate');
    const moveRightButton = document.getElementById('move-right');
    const moveDownButton = document.getElementById('move-down');
    const width = 10;
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let nextRandom = 0;
    let timerId;
    let score = 0;
    let lines = 0;
    let level = 1;
    let dropSpeed = 1000;
    let lastTime = 0;
    let highScore = localStorage.getItem('tetris-high-score') || 0;
    highScoreDisplay.innerHTML = highScore;

    const theTetrominoes = [
        [
            [1, width+1, width*2+1, 2],
            [width, width+1, width+2, width*2+2],
            [1, width+1, width*2+1, width*2],
            [width, width*2, width*2+1, width*2+2]
        ],
        [
            [0, width, width+1, width*2+1],
            [width+1, width+2, width*2, width*2+1],
            [1, width, width+1, width*2],
            [width, width*2, width*2+1, width*2+2]
        ],
        [
            [1, width, width+1, width*2],
            [0, 1, width+1, width*2+1],
            [1, width, width+1, width*2],
            [width, width+1, width*2+1, width*2+2]
        ],
        [
            [1, width+1, width*2+1, width*3+1],
            [width, width+1, width+2, width+3]
        ],
        [
            [0, 1, width, width+1],
            [1, width, width+1, width*2+1],
            [width, width+1, width*2, width*2+1],
            [1, width+1, width*2+1, width*2+2]
        ],
        [
            [1, width+1, width*2+1, width*2+2],
            [width, width+1, width+2, width*2+2],
            [1, 2, width+1, width*2+1],
            [0, width, width+1, width+2]
        ],
        [
            [1, width+1, width*2+1, width*2+2],
            [0, 1, width+1, width*2+1],
            [width, width+1, width*2+1, width*2+2],
            [1, width+1, width*2+1, width*2+2]
        ]
    ];

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
            playMove();
        } else if (e.keyCode === 38) {
            rotate();
            playRotate();
        } else if (e.keyCode === 39) {
            moveRight();
            playMove();
        } else if (e.keyCode === 40) {
            moveDown();
            playMove();
        }
    }
    document.addEventListener('keyup', control);

    moveLeftButton.addEventListener('click', () => {
        moveLeft();
        playMove();
    });

    rotateButton.addEventListener('click', () => {
        rotate();
        playRotate();
    });

    moveRightButton.addEventListener('click', () => {
        moveRight();
        playMove();
    });

    moveDownButton.addEventListener('click', () => {
        moveDown();
        playMove();
    });

    startPauseButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, dropSpeed);
            drop();
        }
    });

    function drop() {
        const now = Date.now();
        const delta = now - lastTime;
        if (delta > dropSpeed) {
            moveDown();
            lastTime = now;
        }
        requestAnimationFrame(drop);
    }

    function isAtRightEdge(x) {
        return (x % width === width - 1);
    }

    function isAtLeftEdge(x) {
        return (x % width === 0);
    }

    function moveLeft() {
        undraw();
        const isAtEdge = current.some(index => isAtLeftEdge(currentPosition + index));
        if (!isAtEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtEdge = current.some(index => isAtRightEdge(currentPosition + index));
        if (!isAtEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation = (currentRotation + 1) % 4;
        current = theTetrominoes[random][currentRotation];
        if (checkRotatedPosition(current)) {
            currentRotation = (currentRotation - 1) % 4;
            current = theTetrominoes[random][currentRotation];
        }
        draw();
    }
});