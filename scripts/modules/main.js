import {GameLoop} from "../game-objects/game.js";
import {CANVAS} from "./global.js";
import {Pacman} from "../game-objects/pacman.js";
import {Wall} from "../game-objects/wall.js";
import {Candy} from "../game-objects/candy.js";

// create walls around the canvas 1 = wall, 0 = empty space
const wallMap = [
    [1, 3, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 0, 0, 3, 0, 0, 0, 3, 0, 1],
    [1, 1, 3, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 3, 1, 1, 1, 1, 3, 0, 3],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 3, 0, 0, 1, 1, 3, 0, 0, 1],
    [0, 0, 1, 3, 1, 1, 0, 1, 3, 0],
    [1, 1, 1, 0, 1, 1, 3, 1, 1, 1],
    [1, 3, 0, 3, 0, 3, 0, 3, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1]
];

function setupGame() {
    const coordsElement = document.getElementById('coords');
    const scoreElement = document.getElementById('score');
    const gameLoop = new GameLoop(CANVAS);
    const pacman = new Pacman(250, 50);

    let score = 0;

    pacman.updateCallback = () => {
        coordsElement.innerText = `${Math.round(pacman.x)}, ${Math.round(pacman.y)}`;
    }

    gameLoop.addCharacters([pacman]);

    wallMap.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = colIndex * 50;
            const y = rowIndex * 50;
            if (cell === 1) {
                const wall = new Wall(
                    x,
                    y,
                    Math.round(CANVAS.width / row.length),
                    CANVAS.width / wallMap.length
                );

                wall.addOnCollisionCallback(pacman._resetToLastFrame.bind(pacman));
                gameLoop.addArea2DNodes([wall]);
            }

            if(cell === 3) {
                const candy = new Candy(x, y);
                candy.onDestroyed = () => {
                    score += 1;
                    scoreElement.innerText = score;
                }
                gameLoop.addArea2DNodes([candy]);
            }
        })
    })

    gameLoop.start();
}

setupGame();
