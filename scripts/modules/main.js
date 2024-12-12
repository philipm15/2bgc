import {GameLoop} from "../game-objects/game.js";
import {CANVAS} from "./global.js";
import {Pacman} from "../game-objects/pacman.js";
import {Wall} from "../game-objects/wall.js";

// create walls around the canvas 1 = wall, 0 = empty space
const wallMap = [
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
]

function setupGame() {
    const coordsElement = document.getElementById('coords');
    const gameLoop = new GameLoop(CANVAS);
    const pacman = new Pacman(200, 100);

    pacman.updateCallback = () => {
        coordsElement.innerText = `${Math.round(pacman.x)}, ${Math.round(pacman.y)}`;
    }

    gameLoop.addCharacters([pacman]);

    wallMap.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                const wall = new Wall(colIndex * 50, rowIndex * 50, Math.round(CANVAS.width / row.length), CANVAS.width / wallMap.length);
                gameLoop.addArea2DNodes([wall]);
            }
        })
    })

    gameLoop.start();
}

setupGame();