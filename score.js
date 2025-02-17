export let score = 0;
export let lines = 0;
export let level = 1;
export let dropSpeed = 1000;
export let highScore = localStorage.getItem('tetris-high-score') || 0;

export function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        if (row.every(index => squares[index].classList.contains('taken'))) {
            score += 10;
            lines += 1;
            scoreDisplay.innerHTML = score;
            linesDisplay.innerHTML = lines;
            playClearRow();
            row.forEach(index => {
                squares[index].classList.remove('taken');
                squares[index].classList.remove('tetromino');
            });
            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }
    if (lines > level * 10) {
        level++;
        levelDisplay.innerHTML = level;
        dropSpeed = 1000 / level + 200;
    }
}

export function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end';
        clearInterval(timerId);
        playGameOver();
        updateHighScore(score);
    }
}

export function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = highScore;
        localStorage.setItem('tetris-high-score', highScore);
    }
}