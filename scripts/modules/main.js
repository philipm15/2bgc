import { GameLoop } from "../game-objects/game.js";
import { CANVAS } from "./global.js";
import { PacmanNode } from "../game-objects/pacman.js";
import { Wall } from "../game-objects/wall.js";

const coordsElement = document.getElementById('coords');

const gameLoop = new GameLoop(CANVAS);
const pacman = new PacmanNode(100, 300);

pacman.updateCallback = () => {
    coordsElement.innerText = `${Math.round(pacman.x)}, ${Math.round(pacman.y)}`;
}
gameLoop.addCharacters([pacman]);

// create walls around the canvas
const walls = CANVAS.width / 50;
for (let i = 0; i < walls; i++) {
    for(let j = 0; j < walls; j++) {
        if ((i === 0 || i === walls - 1 || j === 0 || j === walls - 1) && j !== 1) {
            const wall = new Wall(i * 50, j * 50, 50, 50);
            gameLoop.addArea2DNodes([wall]);
        }
    }
}
gameLoop.start();