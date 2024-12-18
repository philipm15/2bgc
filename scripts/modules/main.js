import {GameLoop} from "../game-objects/game.js";
import {CANVAS} from "./global.js";
import {Pacman} from "../game-objects/pacman.js";
import {Wall} from "../game-objects/wall.js";
import {Candy} from "../game-objects/candy.js";

// create walls around the canvas 1 = wall, 0 = empty space
const map = [
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1]
];

let gameLoopInstance;

function setupGame() {
    gameLoopInstance = undefined;
    const coordsElement = document.getElementById('coords');
    const scoreElement = document.getElementById('score');
    const gameLoop = new GameLoop(CANVAS);
    const pacman = new Pacman(250, 50);
    const numberOfCandies = map.flat().filter(cell => cell === 3).length;

    gameLoopInstance = gameLoop
    let score = 0;

    pacman.updateCallback = () => {
        coordsElement.innerText = `${Math.round(pacman.x)}, ${Math.round(pacman.y)}`;
    }

    gameLoop.addCharacters([pacman]);

    map.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = colIndex * 50;
            const y = rowIndex * 50;
            if (cell === 1) {
                const wall = new Wall(
                    x,
                    y,
                    Math.round(CANVAS.width / row.length),
                    CANVAS.width / map.length
                );
                gameLoop.addAreaNodes([wall]);
            }

            if (cell === 3) {
                const candy = new Candy(x, y);
                candy.onDestroyed = () => {
                    score += 1;
                    scoreElement.innerText = score;

                    if(score === numberOfCandies) {
                        stopGame();
                    }
                }
                gameLoop.addAreaNodes([candy]);
            }
        })
    })
    gameLoop.drawLoadingScreen();
    setTimeout(() => {
        gameLoop.start();
    }, 1000);
}

function stopGame() {
    console.log("Stop game");
    gameLoopInstance.stop();
    gameLoopInstance.drawWinningScreen();
}

setupGame();

// window.addEventListener('keyup', (event) => {
//   if(event.code === 'Space') {
//       setupGame();
//   }
// })
